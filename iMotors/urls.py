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
from frontend.views import get_syncfusion_license_key
from django.urls import re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    # 
    # remember to change this bs line
    # 
    path("api/v1/user/", include("user.urls", namespace="user")),  

    # auth urls
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Login and get tokens
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh token
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),  # Verify token

    # app urls
    path("client_portal/", include("client_portal.urls", namespace="client_portal")),
    path('employee/', include('employee_portal.urls', namespace='employee_portal')),
    path('', include('frontend.urls', namespace='frontend')),
    # path('api', include('api.urls' , namespace="api")),
    path('vehicle/', include('vehicle.urls', namespace='vehicle')),

    # api keys
    path('api/syncfusion-license/', get_syncfusion_license_key, name='syncfusion-license'),

    

]
