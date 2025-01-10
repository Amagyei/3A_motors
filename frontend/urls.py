from .views import index
from django.urls import path, re_path

app_name = 'frontend'

urlpatterns = [
    path('', index, name='index'),
    path('login/', index, name='login'),
    path('home/', index, name='home'),
    # re_path(r'^.*$', index),
]