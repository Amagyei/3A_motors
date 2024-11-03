# employee_portal/views.py
from django.views.generic import ListView, UpdateView
from client_portal.models import ServiceRecord
from client_portal.mixins import EmployeeRequiredMixin
from django.urls import reverse_lazy


class ServiceRecordListView(EmployeeRequiredMixin, ListView):
    model = ServiceRecord
    fields = ['status', 'cost_estimate', 'date_completed']
    template_name = 'employee_portal/service_record_form.html'
    success_url = reverse_lazy('employee_portal:service_record_list')

    def get_queryset(self):
        return ServiceRecord.objects.filter(status__in=['Pending', 'In Progress'])