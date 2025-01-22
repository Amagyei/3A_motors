from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings

# Create your views here.


def index(request):
    return render(request, 'frontend/index.html')

def get_syncfusion_license_key(request):
    return JsonResponse({"license_key": settings.SYNCFUSION_LICENSE})