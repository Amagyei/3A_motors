from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

app_name = "user"

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),        
    path('login/', LoginView.as_view(), name='login'),                 
    path('profile/', ProfileView.as_view(), name='profile'),           
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),        # Token refresh API
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('get-csrf-token/', get_csrf_token, name='get_csrf_token'),    
]