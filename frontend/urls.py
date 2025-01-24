from django.urls import path, re_path
from .views import index

app_name = 'frontend'

urlpatterns = [
    # React-specific routes
    path('', index, name='index'),
    path('login/', index, name='login'),
    path('home/', index, name='home'),
    path('profile/', index, name='profile'),
    path('register/', index, name='register'),
    path('vehicles/', index, name='vehicles'),

    # React Dashboard routes
    re_path(r'^dashboard/.*$', index),  # Matches /dashboard and all sub-paths (e.g., /dashboard/orders)

    # Catch-all for React routes
    re_path(r'^.*$', index),
]