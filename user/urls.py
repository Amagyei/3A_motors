from django.urls import path
from .views import register_view, login_view, logout_view, profile_update_view

app_name = "user"

urlpatterns = [
    path("register/", register_view, name="register"),
    path("login/", login_view, name="login"),
    path("logout/", logout_view, name="logout"),
    path("profile/", profile_update_view, name="profile"),
]