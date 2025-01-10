from django.urls import path
from .views import *
app_name = 'client_portal'

urlpatterns = [
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('services/', ServiceRecordListView.as_view(), name='service_records'),
    path('invoices/', InvoiceListView.as_view(), name='invoices'),
    path('notifications/', NotificationListView.as_view(), name='notifications'),
    path("verify-payment/", verify_paystack_payment, name="verify_paystack_payment"),
    path('initialize-payment/<int:invoice_id>/', initialize_invoice_payment, name='initialize_invoice_payment'),
    path('payment-success/<int:invoice_id>/', payment_success, name='payment_success'),

]