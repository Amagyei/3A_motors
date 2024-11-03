import requests
from django.conf import settings
from django.shortcuts import render, redirect
from .models import ServiceRecord, Invoice, Payment, Notification
from .forms import PaymentForm
from django.views.generic import TemplateView, ListView
from .mixins import ClientRequiredMixin


class DashboardView(ClientRequiredMixin, TemplateView):
    template_name = "client_portal/dashboard.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = self.request.user
        context['active_services'] = ServiceRecord.objects.filter(user=user, status='In Progress')
        context['pending_invoices'] = Invoice.objects.filter(user=user, status='Unpaid')
        context['recent_notifications'] = Notification.objects.filter(user=user, read=False)[:5]
        return context

class ServiceRecordListView(ClientRequiredMixin, ListView):
    model = ServiceRecord
    template_name = "client_portal/service_records.html"
    context_object_name = "service_records"

    def get_queryset(self):
        return ServiceRecord.objects.filter(user=self.request.user)


class NotificationListView(ClientRequiredMixin, ListView):
    model = Notification
    template_name = "client_portal/notifications.html"
    context_object_name = "notifications"

    def get_queryset(self):
        notifications = Notification.objects.filter(user=self.request.user).order_by('-created_at')
        # Mark unread notifications as read
        notifications.filter(read=False).update(read=True)
        return notifications


class InvoiceListView(ClientRequiredMixin, ListView):
    model = Invoice
    template_name = "client_portal/invoices.html"
    context_object_name = "invoices"

    def get_queryset(self):
        return Invoice.objects.filter(user=self.request.user)

    def post(self, request, *args, **kwargs):
        form = PaymentForm(request.POST)
        if form.is_valid():
            invoice_id = request.POST.get("invoice_id")
            invoice = get_object_or_404(Invoice, id=invoice_id, user=request.user)
            amount = form.cleaned_data['amount']
            gateway = form.cleaned_data['gateway']

            if gateway == "flutterwave":
                return self.handle_flutterwave_payment(invoice, amount)
            elif gateway == "paystack":
                return self.handle_paystack_payment(invoice, amount)
        return render(request, self.template_name, {"form": form, "error": "Invalid payment form data."})

    def handle_flutterwave_payment(self, invoice, amount):
        # Prepare payment data for Flutterwave
        payment_data = {
            "tx_ref": f"invoice_{invoice.id}_{self.request.user.uid}",
            "amount": amount,
            "currency": "GHS",
            "redirect_url": "https://your_redirect_url.com/",
            "customer": {
                "email": self.request.user.email,
                "name": self.request.user.full_name,
            },
            "customizations": {
                "title": "3A Motors Payment",
                "description": f"Payment for Invoice {invoice.id}",
            },
        }

        try:
            response = requests.post(
                "https://api.flutterwave.com/v3/payments",
                json=payment_data,
                headers={"Authorization": f"Bearer {settings.FLUTTERWAVE_SECRET_KEY}"}
            )
            if response.status_code == 200 and response.json().get("status") == "success":
                return redirect(response.json()['data']['link'])
            else:
                return render(self.request, self.template_name, {"error": "Flutterwave payment initiation failed."})
        except requests.RequestException:
            return render(self.request, self.template_name, {"error": "Payment service is temporarily unavailable."})

    def handle_paystack_payment(self, invoice, amount):
        # Prepare payment data for Paystack
        payment_data = {
            "email": self.request.user.email,
            "amount": int(amount * 100),  # Paystack expects amount in kobo (or cents)
            "reference": f"invoice_{invoice.id}_{self.request.user.uid}",
            "callback_url": "https://your_redirect_url.com/",
        }

        try:
            response = requests.post(
                "https://api.paystack.co/transaction/initialize",
                json=payment_data,
                headers={"Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"}
            )
            if response.status_code == 200 and response.json().get("status") == "success":
                return redirect(response.json()['data']['authorization_url'])
            else:
                return render(self.request, self.template_name, {"error": "Paystack payment initiation failed."})
        except requests.RequestException:
            return render(self.request, self.template_name, {"error": "Payment service is temporarily unavailable."})