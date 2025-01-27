import requests
from django.conf import settings
from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import TemplateView, ListView, DetailView
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import serializers, viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.permissions import IsAuthenticated



from client_portal.paystack_service import initialize_paystack_payment, verify_payment
from .forms import PaymentForm
from .models import ServiceRecord, Invoice, Payment, Notification, ServiceType
from .mixins import ClientRequiredMixin
from .serializers import ServiceRecordSerializer
from vehicle.models import Vehicle

class DashboardView(ClientRequiredMixin, TemplateView):
    template_name = "client_portal/dashboard.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = self.request.user
        context['active_services'] = ServiceRecord.objects.filter(user=user, status='In Progress')
        context['pending_invoices'] = Invoice.objects.filter(user=user, status='Unpaid')
        context['recent_notifications'] = Notification.objects.filter(user=user, read=False)[:5]
        return context
User = get_user_model()

@api_view(['GET'])
def get_service_types(request):
    service_types = ServiceType.objects.all().values('id', 'name')
    return Response(service_types)

@api_view(['GET'])
def get_vehicles(request):
    vehicles = Vehicle.objects.all().values('id', 'name', 'license_plate')
    return Response(vehicles)

@api_view(['GET'])
def get_employees(request):
    employees = User.objects.filter(user_type='employee').values('uid', 'full_name')
    return Response(employees)

@api_view(['GET'])
def get_invoices(request):
    invoices = Invoice.objects.all().values(
        'id', 'amount', 'status', 'date_created', 'date_due', 'service_record__description'
    )
    return Response(invoices)

@api_view(['GET'])
def get_notifications(request):
    notifications = Notification.objects.filter(user=request.user).values(
        'id', 'message', 'created_at', 'read'
    )
    return Response(notifications)

@api_view(['GET'])
def get_payments(request):
    payments = Payment.objects.all().values(
        'transaction_id', 'invoice', 'amount', 'status', 'payment_date', 'payment_method'
    )
    return Response(payments)


class ServiceRecordViewSet(viewsets.ModelViewSet):
    queryset = ServiceRecord.objects.all()
    serializer_class = ServiceRecordSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        print("Incoming Data:", request.data)  # Log the payload
        serializer = self.get_serializer(data=request.data)
        
        if not serializer.is_valid():
            print("Validation Errors:", serializer.errors)  # Log validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        service_record = get_object_or_404(ServiceRecord, pk=pk)
        service_record.status = 'Completed'
        service_record.date_completed = timezone.now()
        service_record.save()
        return Response({'status': 'Service record marked as completed'})

    @action(detail=True, methods=['post'])
    def assign(self, request, pk=None):
        service_record = get_object_or_404(ServiceRecord, pk=pk)
        assigned_to_id = request.data.get('assigned_to')
        
        if not assigned_to_id:
            return Response({'error': 'No user specified'}, status=status.HTTP_400_BAD_REQUEST)

        assigned_to_user = User.objects.filter(pk=assigned_to_id, user_type='employee').first()
        if not assigned_to_user:
            return Response({'error': 'Invalid or unauthorized user specified'}, status=status.HTTP_400_BAD_REQUEST)

        service_record.assigned_to = assigned_to_user
        service_record.save()
        return Response({'status': f'Service record assigned to user {assigned_to_user.full_name}'})
    
      

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

class ServiceRecordListView(ClientRequiredMixin, ListView):
    model = ServiceRecord
    template_name = "client_portal/service_records.html"
    context_object_name = "service_records"

    def get_queryset(self):
        return ServiceRecord.objects.filter(user=self.request.user)

class PaymentListView(ClientRequiredMixin, ListView):
    model = Payment
    template_name = "client_portal/service_records.html"
    context_object_name = "service_records"

    def get_queryset(self):
        return ServiceRecord.objects.filter(user=self.request.user)

class ServiceRecordAPIView(APIView):
    def get(self, request):
        service_records = ServiceRecord.objects.all()
        serializer = ServiceRecordSerializer(service_records, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class NotificationListView(ClientRequiredMixin, ListView):
    model = Notification
    template_name = "client_portal/notifications.html"
    context_object_name = "notifications"

    def get_queryset(self):
        notifications = Notification.objects.filter(user=self.request.user).order_by('-created_at')
        # Mark unread notifications as read
        notifications.filter(read=False).update(read=True)
        return notifications



from django.http import JsonResponse
from django.core.paginator import Paginator
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from .models import Invoice
from django.contrib.auth.mixins import LoginRequiredMixin

@method_decorator(csrf_exempt, name="dispatch")
class InvoiceListView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        invoices = Invoice.objects.all()

        
        page = request.GET.get("page", 1)
        per_page = request.GET.get("per_page", 10) 
        paginator = Paginator(invoices, per_page)

        try:
            paginated_invoices = paginator.page(page)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

        invoices_data = [
            {
                "id": invoice.id,
                "amount": invoice.amount,
                "status": invoice.status,
                "date_created": invoice.date_created.isoformat(),
                "date_due": invoice.date_due.isoformat(),
                "service_record": invoice.service_record.id if invoice.service_record else None,
                "service_record_description": invoice.service_record.description if invoice.service_record else None,
            }
            for invoice in paginated_invoices
        ]

        return JsonResponse(
            {
                "invoices": invoices_data,
                "pagination": {
                    "current_page": paginated_invoices.number,
                    "total_pages": paginator.num_pages,
                    "total_items": paginator.count,
                    "per_page": per_page,
                },
            },
            safe=False,
        )

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

def initialize_invoice_payment(request, invoice_id):
    """Initialize Paystack payment for an invoice."""
    invoice = get_object_or_404(Invoice, id=invoice_id)
    callback_url = request.build_absolute_uri(reverse("payment_success", args=[invoice.id]))
    try:
        payment_url = initialize_payment(
            email=invoice.user.email,
            amount=invoice.amount,
            reference=str(invoice.success_id),
            callback_url=callback_url,
        )
        return JsonResponse({"payment_url": payment_url})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def payment_success(request, invoice_id):
    """Verify payment and update invoice and service record status."""
    reference = request.GET.get("reference")
    try:
        payment_data = verify_payment(reference)
        if payment_data["status"] == "success":
            invoice = Invoice.objects.get(id=invoice_id, success_id=reference)
            if invoice.payment_status != "Paid":
                invoice.payment_status = "Paid"
                invoice.save()

                # Update the related service record
                if invoice.service_record:
                    service_record = invoice.service_record
                    service_record.status = "Completed"
                    service_record.save()

                return render(request, "payment_success.html", {"invoice": invoice})
        else:
            return render(request, "payment_failed.html", {"error": "Payment verification failed."})
    except Exception as e:
        return render(request, "payment_failed.html", {"error": str(e)})
    
from user.serializers import UserSerializer

@method_decorator(csrf_exempt, name='dispatch')
class EmployeeListView(APIView):
    permission_classes = [IsAuthenticated]  # Or [AllowAny] if you want no auth check

    def get(self, request):
        # Filter all users who have usertype="employee"
        employees = User.objects.filter(user_type="employee")
        print(employees)
        serializer = UserSerializer(employees, many=True)
        return Response(serializer.data, status=200)
    
class PaymentListView(ClientRequiredMixin, ListView):
    model = Payment
    context_object_name = "payments"

    def get_queryset(self):
        return Payment.objects.all().values(
            "transaction_id",
            "invoice",
            "amount",
            "status",
            "payment_date",
            "payment_method"
        )