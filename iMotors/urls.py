"""
URL configuration for iMotors project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from user.views import register_view, login_view, logout_view, profile_update_view

urlpatterns = [
    path("admin/", admin.site.urls),
    # 
    # remember to change this bs line
    # 
    path("", register_view, name="home"),
    path("user/", include("user.urls", namespace="user")),  
    path("client_portal/", include("client_portal.urls", namespace="client_portal")),
    path('employee/', include('employee_portal.urls', namespace='employee_portal')),
    # path('vehicle/', include('vehicle.urls', namespace='vehicle')),
]