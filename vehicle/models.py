from django.db import models
from django.conf import settings

class Vehicle(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    make = models.CharField(max_length=50, default='Toyota')
    model = models.CharField(max_length=50, )
    year = models.IntegerField()
    registration_number = models.CharField(max_length=20, unique=True, blank=True, null=True)
    color = models.CharField(max_length=20, blank=True, null=True)
    vin = models.CharField(max_length=17, unique=True, blank=True, null=True)
    status = models.CharField(
        max_length=20,
        choices=[('Active', 'Active'), ('In Service', 'In Service'), ('Completed', 'Completed')],
        default='Active'
    )

    def __str__(self):
        return f"{self.make} {self.model} - {self.registration_number}"