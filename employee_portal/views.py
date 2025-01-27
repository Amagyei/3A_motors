# employee_portal/views.py
from django.views.generic import ListView, UpdateView
from client_portal.models import ServiceRecord
from client_portal.mixins import EmployeeRequiredMixin
from django.urls import reverse_lazy
from rest_framework.views import APIView, Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from django.contrib.auth import get_user_model
from user.models import User


class ServiceRecordListView(EmployeeRequiredMixin, ListView):
    model = ServiceRecord
    fields = ['status', 'cost_estimate', 'date_completed']
    template_name = 'employee_portal/service_record_form.html'
    success_url = reverse_lazy('employee_portal:service_record_list')

    def get_queryset(self):
        return ServiceRecord.objects.filter(status__in=['Pending', 'In Progress'])
    

class ServiceRecordCreateView(EmployeeRequiredMixin, UpdateView):
    model = ServiceRecord
    fields = ['status', 'cost_estimate', 'date_completed']
    template_name = 'employee_portal/service_record_form.html'
    success_url = reverse_lazy('employee_portal:service_record_list')



from user.serializers import UserSerializer

@method_decorator(csrf_exempt, name='dispatch')
class EmployeeListView(APIView):
    permission_classes = [IsAuthenticated]  # Or [AllowAny] if you want no auth check

    def get(self, request):
        # Filter all users who have usertype="employee"
        employees = User.objects.filter(usertype="employee")
        print(employees)
        serializer = UserSerializer(employees, many=True)
        return Response(serializer.data, status=200)