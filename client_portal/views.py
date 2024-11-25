import requests
from django.conf import settings
from django.shortcuts import render, redirect
from django.views.generic import TemplateView, ListView
from django.http import JsonResponse


from client_portal.paystack_service import initialize_paystack_payment
from .forms import PaymentForm
from .models import ServiceRecord, Invoice, Payment, Notification
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
        invoice_id = request.POST.get("invoice_id")
        invoice = Invoice.objects.get(id=invoice_id)
        user = request.user

        # Generate a unique reference
        reference = f"invoice_{invoice.id}_{user.uid}"

        # Initialize Paystack payment
        callback_url = "https://your_redirect_url.com/"  # Replace with your callback URL
        response = initialize_paystack_payment(
            amount=invoice.amount,
            email=user.email,
            reference=reference,
            callback_url=callback_url
        )

        if response.get("status"):
            # Redirect to the Paystack payment page
            return redirect(response["data"]["authorization_url"])
        else:
            # Handle error
            return render(request, self.template_name, {"error": "Payment initialization failed."})


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
        


def verify_paystack_payment(request):
    reference = request.GET.get("reference")
    headers = {
        "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"
    }
    response = requests.get(
        f"https://api.paystack.co/transaction/verify/{reference}", headers=headers
    )
    data = response.json()
    if data["status"]:
        # Update the payment record
        payment = Payment.objects.get(transaction_id=reference)
        payment.status = "Successful" if data["data"]["status"] == "success" else "Failed"
        payment.save()
        return JsonResponse({"message": "Payment verified successfully."})
    else:
        return JsonResponse({"message": "Payment verification failed."}, status=400)
    

