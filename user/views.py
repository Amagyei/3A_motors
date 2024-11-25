from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import user_passes_test
from .forms import LoginForm, UserRegistrationForm, ProfileUpdateForm
from .models import Profile

def is_user(user):
    return user.is_authenticated

def is_employee(user):
    return user.is_authenticated and user.user_type == "employee"

def is_client(user):
    return user.is_authenticated and user.user_type == "admin"



def is_client(user):
    return user.is_authenticated and user.user_type == "client"


def register_view(request):
    """Handle user registration."""
    if request.user.is_authenticated:
        messages.success(request, "You are already registered and logged in.")
        return redirect("user:profile")

    form = UserRegistrationForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        form.save()
        messages.success(request, "Your account has been created. Please log in.")
        return redirect("user:login")

    return render(request, "userauth/sign-up.html", {"form": form})

def login_view(request):
    """Handle user login."""
    if request.user.is_authenticated:
        messages.warning(request, "You are already logged in.")
        return redirect("user:profile")

    form = LoginForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        username = form.cleaned_data["username"]
        password = form.cleaned_data["password"]
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            messages.success(request, "You are now logged in.")
            return redirect("user:profile")
        else:
            messages.error(request, "Invalid email or password.")
    
    return render(request, "userauth/sign-in.html", {"form": form})

def logout_view(request):
    """Log out user and redirect to login page."""
    logout(request)
    messages.success(request, "You have been logged out.")
    return redirect("user:login")

def profile_update_view(request):
    """Handle profile updates."""
    if not request.user.is_authenticated:
        messages.warning(request, "Please log in to access your profile.")
        return redirect("user:login")

    profile = request.user.profile
    form = ProfileUpdateForm(request.POST or None, request.FILES or None, instance=profile)
    if request.method == "POST" and form.is_valid():
        form.save()
        messages.success(request, "Your profile has been updated.")
        return redirect("user:profile")

    return render(request, "userauth/profile.html", {"form": form})