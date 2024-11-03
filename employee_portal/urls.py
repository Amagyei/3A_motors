# employee_portal/urls.py
from django.urls import path
from .views import ServiceRecordListView

app_name = 'employee_portal'

urlpatterns = [
    path('service-records/', ServiceRecordListView.as_view(), name='service_record_list'),
]