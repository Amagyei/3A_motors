from django.contrib import admin
from .models import Vehicle

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('user', 'make', 'model', 'year', 'registration_number', 'status')
    list_filter = ('status', 'make')
    search_fields = ('registration_number', 'vin', 'user__username')