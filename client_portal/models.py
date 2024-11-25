from django.db import models
from django.conf import settings

class ServiceType(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

class ServiceRecord(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    vehicle = models.ForeignKey('vehicle.Vehicle', on_delete=models.CASCADE)
    service_type = models.ForeignKey(ServiceType, on_delete=models.CASCADE)
    issue_description = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=[
            ('Pending', 'Pending'),
            ('In Progress', 'In Progress'),
            ('Completed', 'Completed')
        ],
        default='Pending'
    )
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_services',
        limit_choices_to={'user_type': 'employee'}
    )
    date_initiated = models.DateTimeField(auto_now_add=True)
    date_completed = models.DateTimeField(null=True, blank=True)
    cost_estimate = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"{self.vehicle} - {self.service_type} ({self.status})"

class Invoice(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    service_record = models.OneToOneField(ServiceRecord, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=20,
        choices=[
            ('Unpaid', 'Unpaid'),
            ('Paid', 'Paid'),
            ('Overdue', 'Overdue')
        ],
        default='Unpaid'
    )
    due_date = models.DateTimeField()

    def __str__(self):
        return f"Invoice {self.id} - {self.status}"

class Payment(models.Model):
    PAYMENT_METHODS = [
        ('paystack', 'Paystack'),
        ('cheque', 'Cheque'),
        ('cash', 'Cash'),
    ]

    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    payment_date = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=20,
        choices=[
            ('Successful', 'Successful'),
            ('Failed', 'Failed'),
            ('Pending', 'Pending')
        ],
        default='Pending'
    )
    transaction_id = models.CharField(max_length=100, unique=True)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS, default='paystack')
    paystack_reference = models.CharField(max_length=100, null=True, blank=True)


    def __str__(self):
        return f"Payment {self.transaction_id} - {self.status}"

class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ('service_update', 'Service Update'),
        ('payment_reminder', 'Payment Reminder'),
        ('general', 'General'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    message = models.TextField()
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES, default='general')
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.get_notification_type_display()} - {self.message[:20]}..."