from rest_framework import serializers
from client_portal.models import ServiceRecord
from user.models import User

class ServiceRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRecord
        fields = '__all__'
        read_only_fields = ['status', 'cost_estimate', 'date_completed']
    
    def create(self, validated_data):
        return ServiceRecord.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.cost_estimate = validated_data.get('cost_estimate', instance.cost_estimate)
        instance.date_completed = validated_data.get('date_completed', instance.date_completed)
        instance.save()
        return instance
    

    
    