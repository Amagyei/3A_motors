from django.db import models
from django.conf import settings
from shortuuid.django_fields import ShortUUIDField
from user.models import User

# Vehicle Model
class Vehicle(models.Model):
    QUEUE_STATUS_CHOICES = [
        ('Waiting for Service', 'Waiting for Service'),
        ('Next Job', 'Next Job'),
        ('Being Serviced', 'Being Serviced'),
        ('Job Stoppage', 'Job Stoppage'),
        ('Waiting for Approval', 'Waiting for Approval'),
        ('Waiting for Parts', 'Waiting for Parts'),
        ('Waiting for Settlement', 'Waiting for Settlement'),
        ('Waiting for Car Wash', 'Waiting for Car Wash'),
        ('Waiting for Invoicing', 'Waiting for Invoicing'),
    ]
    vehicle_id = ShortUUIDField(
        length=8,
        max_length=25,
        unique=True,
        primary_key=True,
        alphabet='abcdefghijklmnopqrstuvwxyz1234567890'
    )
    owner = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name="vehicles",
        help_text="The owner of the vehicle"
    )
    make = models.CharField(max_length=50, default='Toyota', help_text="Vehicle make (e.g., Toyota)")
    model = models.CharField(max_length=50, help_text="Vehicle model (e.g., Corolla)")
    year = models.PositiveIntegerField(help_text="Year of manufacture")
    registration_number = models.CharField(
        max_length=20, 
        unique=True, 
        blank=True, 
        null=True, 
        help_text="Registration number (optional)"
    )
    color = models.CharField(max_length=20, blank=True, null=True, help_text="Vehicle color (optional)")
    vin = models.CharField(
        max_length=17, 
        unique=True, 
        blank=True, 
        null=True, 
        help_text="Vehicle Identification Number (optional)"
    )
    status = models.CharField(
        choices=QUEUE_STATUS_CHOICES,
        default='Active',
        help_text="Current status of the vehicle"
    )
    queue_position = models.PositiveIntegerField(blank=True, null=True, help_text="Position in the queue (if applicable)")

    def __str__(self):
        return f"{self.make} {self.model} - {self.registration_number or 'No Reg'}"

