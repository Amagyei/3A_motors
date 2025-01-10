from django.contrib import admin
from .models import Vehicle, JobQueue, QueueVehicle, Job
# Register your models here.

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('owner', 'make', 'model', 'year', 'registration_number', 'status')
    list_filter = ('status', 'make')
    search_fields = ('registration_number', 'vin', 'user__username')

@admin.register(JobQueue)
class JobQueueAdmin(admin.ModelAdmin):
    list_display = ('queue_id',  'name')
    list_filter = ('name',)
    search_fields = ('queue_id',)

@admin.register(QueueVehicle)
class QueueVehicleAdmin(admin.ModelAdmin):
    list_display = ('vehicle', 'queue', )
    list_filter = ('queue',)
    search_fields = ('vehicle', 'queue')

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('job_id', 'vehicle',  'assigned_to', 'priority', 'deadline')
    list_filter = ('status', 'priority')
    search_fields = ('job_id', 'vehicle')
