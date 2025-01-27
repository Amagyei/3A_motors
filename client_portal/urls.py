from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter


app_name = 'client_portal'


router = DefaultRouter()
router.register(r'service-records', ServiceRecordViewSet)

urlpatterns = [
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('services/', ServiceRecordListView.as_view(), name='service_records'),
    path('invoices/', InvoiceListView.as_view(), name='invoices'),
    path('notifications/', NotificationListView.as_view(), name='notifications'),
    path("verify-payment/", verify_paystack_payment, name="verify_paystack_payment"),
    path('initialize-payment/<int:invoice_id>/', initialize_invoice_payment, name='initialize_invoice_payment'),
    path('payment-success/<int:invoice_id>/', payment_success, name='payment_success'),
    path('api/v1/', include(router.urls)),
    path('api/v1/service-types/', get_service_types, name='get_service_types'),
    path('api/v1/vehicles/', get_vehicles, name='get_vehicles'),
    path('api/v1/employees/', EmployeeListView.as_view(), name='get_employees'),
    path('api/v1/invoices/', get_invoices, name='get_invoices'),
    path('api/v1/notifications/', get_notifications, name='get_notifications'),
    path('api/v1/payments/', get_payments, name='get_payments'),

]