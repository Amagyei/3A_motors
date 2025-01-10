from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, Profile


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user."""
    class Meta:
        model = User
        fields = ['uid', 'email', 'username', 'user_type']


class ProfileSerializer(serializers.ModelSerializer):
    """Serializer for the profile."""
    class Meta:
        model = Profile
        fields = ['image', 'full_name', 'phone']


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2', 'user_type']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user


class ChangePasswordSerializer(serializers.Serializer):
    """Serializer for password change."""
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])