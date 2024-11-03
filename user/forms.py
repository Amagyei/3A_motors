from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.core.validators import EmailValidator
from .models import User, Profile

USER_TYPE_CHOICES = [
    ("client", "Client"),
    ("employee", "Employee"),
    ("administrator", "Administrator"),
]

class LoginForm(forms.Form):
    """Form for user login with email and password."""
    email = forms.EmailField(validators=[EmailValidator()], widget=forms.EmailInput(attrs={
        'placeholder': 'Enter your email',
        'class': 'form-control',
    }))
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder': 'Enter your password',
        'class': 'form-control',
    }))

class UserRegistrationForm(UserCreationForm):
    """Form for user registration with role selection."""
    user_type = forms.ChoiceField(choices=USER_TYPE_CHOICES, widget=forms.Select(attrs={
        'class': 'form-control',
    }))
    
    class Meta:
        model = User
        fields = ['full_name', 'username', 'email', 'phone', 'user_type', 'password1', 'password2']
        widgets = {
            'full_name': forms.TextInput(attrs={'placeholder': 'Full Name', 'class': 'form-control'}),
            'username': forms.TextInput(attrs={'placeholder': 'Username', 'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'placeholder': 'Email Address', 'class': 'form-control'}),
            'phone': forms.TextInput(attrs={'placeholder': 'Phone Number', 'class': 'form-control'}),
        }

    def save(self, commit=True):
        user = super().save(commit=False)
        user.user_type = self.cleaned_data["user_type"]
        if commit:
            user.save()
        return user

class ProfileUpdateForm(forms.ModelForm):
    """Form for updating user profile information."""
    class Meta:
        model = Profile
        fields = [
            'image', 'full_name', 'phone', 'residential_address', 'mailing_address', 
            'parents_name', 'parents_number', 'gender'
        ]
        widgets = {
            'image': forms.FileInput(attrs={'class': 'form-control'}),
            'full_name': forms.TextInput(attrs={'placeholder': 'Full Name', 'class': 'form-control'}),
            'phone': forms.TextInput(attrs={'placeholder': 'Phone Number', 'class': 'form-control'}),
            'residential_address': forms.TextInput(attrs={'placeholder': 'Residential Address', 'class': 'form-control'}),
            'mailing_address': forms.TextInput(attrs={'placeholder': 'Mailing Address', 'class': 'form-control'}),
            'parents_name': forms.TextInput(attrs={'placeholder': "Parent's Name", 'class': 'form-control'}),
            'parents_number': forms.TextInput(attrs={'placeholder': "Parent's Contact Number", 'class': 'form-control'}),
            'gender': forms.Select(attrs={'class': 'form-control'}),
        }