from .views import index
from django.urls import path, re_path

app_name = 'frontend'

urlpatterns = [
    path('', index, name='index'),
    path('login/', index, name='login'),
    path('home/', index, name='home'),
    path('dashboard/', index, name='dashboard'),
    path('profile/', index, name='profile'),
    path('register/', index, name='register'),
    path('vehicles/', index, name='vehicles'),
    path('vehicles/<int:id>/', index, name='vehicle'),
    path('vehicles/add/', index, name='add_vehicle'),
    path('vehicles/edit/<int:id>/', index, name='edit_vehicle'),
    path('vehicles/delete/<int:id>/', index, name='delete_vehicle'),
    path('vehicles/search/', index, name='search_vehicle'),
    path('vehicles/search/<str:search>/', index, name='search_vehicle'),
    path('vehicles/search/<str:search>/<str:filter>/', index, name='search_vehicle'),
    
    # re_path(r'^.*$', index),
]