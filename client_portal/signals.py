# client_portal/signals.py
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import ServiceRecord, Invoice, Payment, Notification

@receiver(post_save, sender=ServiceRecord)
def service_record_status_update(sender, instance, created, **kwargs):
    if not created:
        # Assuming 'status' is updated
        message = f"Your service for {instance.vehicle} is now '{instance.status}'."
        Notification.objects.create(
            user=instance.user,
            message=message,
            notification_type='service_update'
        )

@receiver(post_save, sender=Invoice)
def invoice_created(sender, instance, created, **kwargs):
    if created:
        message = f"An invoice #{instance.id} has been generated for your service."
        Notification.objects.create(
            user=instance.user,
            message=message,
            notification_type='payment_reminder'
        )

@receiver(post_save, sender=Payment)
def payment_status_update(sender, instance, created, **kwargs):
    if not created:
        message = f"Your payment for invoice #{instance.invoice.id} is now '{instance.status}'."
        Notification.objects.create(
            user=instance.invoice.user,
            message=message,
            notification_type='payment_update'
        )