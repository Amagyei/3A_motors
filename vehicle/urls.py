# vehicles/urls.py
from django.urls import path
from .views import fetch_vehicles

app_name = 'vehicle'

urlpatterns = [
    path('api/vehicles/', fetch_vehicles, name='fetch_vehicles'),
]