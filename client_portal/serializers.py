from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from .models import ServiceRecord, ServiceType
from vehicle.models import Vehicle
from django.contrib.auth import get_user_model

User = get_user_model()

class ServiceRecordSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    vehicle = serializers.PrimaryKeyRelatedField(queryset=Vehicle.objects.all())
    service_type = serializers.PrimaryKeyRelatedField(queryset=ServiceType.objects.all())
    assigned_to = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(user_type='employee'),
        allow_null=True,
        required=False
    )

    # Display fields
    vehicle_display = serializers.SerializerMethodField()
    service_type_display = serializers.SerializerMethodField()
    assigned_to_display = serializers.SerializerMethodField()

    # Make the user field read-only
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = ServiceRecord
        fields = '__all__'

    def get_vehicle_display(self, obj):
        return str(obj.vehicle) if obj.vehicle else None

    def get_service_type_display(self, obj):
        return obj.service_type.name if obj.service_type else None

    def get_assigned_to_display(self, obj):
        return obj.assigned_to.full_name if obj.assigned_to else None

    def create(self, validated_data):
        user = self.context["request"].user  # Authenticated user
        validated_data["user"] = user
        return super().create(validated_data)
