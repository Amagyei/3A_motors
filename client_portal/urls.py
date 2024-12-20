from django.urls import path
from .views import *
app_name = 'client_portal'

urlpatterns = [
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('services/', ServiceRecordListView.as_view(), name='service_records'),
    path('invoices/', InvoiceListView.as_view(), name='invoices'),
    path('notifications/', NotificationListView.as_view(), name='notifications'),
    path("verify-payment/", verify_paystack_payment, name="verify_paystack_payment"),

]