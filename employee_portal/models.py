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
        related_name="vehicle_owner",
        help_text="The owner of the vehicle",
        default="N/A"
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


class JobQueue(models.Model):
    queue_id = ShortUUIDField(
        length=8,
        max_length=25,
        unique=True,
        primary_key=True,
        alphabet='abcdefghijklmnopqrstuvwxyz1234567890'
    )
    name = models.CharField(max_length=50, help_text="Name of the queue")
    description = models.CharField(max_length=300, blank=True, null=True, help_text="Description of the queue")
    vehicles = models.ManyToManyField(
        Vehicle, 
        through='QueueVehicle', 
        related_name="vehicle_queue", 
        help_text="Vehicles in this queue"
    )
    created_at = models.DateTimeField(auto_now_add=True, help_text="When the queue was created")
    updated_at = models.DateTimeField(auto_now=True, help_text="When the queue was last updated")

    def __str__(self):
        return self.name


# Through Model for Many-to-Many Relationship between JobQueue and Vehicle
class QueueVehicle(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    queue = models.ForeignKey(JobQueue, on_delete=models.CASCADE)
    position = models.PositiveIntegerField(default=0, help_text="Position of the vehicle in the queue")
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['position']
        unique_together = ('vehicle', 'queue')

    def __str__(self):
        return f"{self.vehicle} in {self.queue.name} at position {self.position}"


# Job Model
class Job(models.Model):
    job_id = ShortUUIDField(
        length=8,
        max_length=25,
        unique=True,
        primary_key=True,
        alphabet='abcdefghijklmnopqrstuvwxyz1234567890'
    )
    vehicle = models.ForeignKey(
        Vehicle, 
        on_delete=models.CASCADE, 
        related_name="job_vehicles", 
        help_text="Vehicle associated with this job"
    )
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name="job_assignee", 
        help_text="Employee assigned to this job"
    )
    status = models.CharField(
        max_length=20,
        choices=[
            ('Pending', 'Pending'),
            ('In Progress', 'In Progress'),
            ('Completed', 'Completed')
        ],
        default='Pending',
        help_text="Current status of the job"
    )
    queue = models.ForeignKey(
        JobQueue, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name="queue", 
        help_text="Queue associated with this job"
    )
    priority = models.PositiveIntegerField(default=1, help_text="Priority of the job (higher is more urgent)")
    deadline = models.DateTimeField(blank=True, null=True, help_text="Deadline for completing the job")
    comments = models.TextField(blank=True, null=True, help_text="Additional comments about the job")
    created_on = models.DateTimeField(auto_now_add=True, help_text="When the job was created")

    def __str__(self):
        return f"Job {self.job_id} for {self.vehicle}"
