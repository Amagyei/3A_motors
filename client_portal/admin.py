from django.contrib import admin
from .models import ServiceType, ServiceRecord, Invoice, Payment, Notification

@admin.register(ServiceType)
class ServiceTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

@admin.register(ServiceRecord)
class ServiceRecordAdmin(admin.ModelAdmin):
    list_display = ('user', 'vehicle', 'service_type', 'status', 'date_initiated', 'date_completed')
    list_filter = ('status', 'service_type')
    search_fields = ('vehicle__registration_number', 'user__username')
    date_hierarchy = 'date_initiated'

@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('user', 'service_record', 'amount', 'status', 'due_date')
    list_filter = ('status',)
    search_fields = ('user__username',)

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('invoice', 'amount', 'status', 'payment_date', 'transaction_id')
    list_filter = ('status',)
    search_fields = ('transaction_id',)

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'message', 'created_at', 'read')
    list_filter = ('read',)
    search_fields = ('user__username',)