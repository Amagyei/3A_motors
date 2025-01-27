# vehicles/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Vehicle
from .serializers import VehicleSerializer

@api_view(['GET'])
def fetch_vehicles(request):
    try:
        vehicles = Vehicle.objects.all()
        serializer = VehicleSerializer(vehicles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {"error": f"Failed to fetch vehicles: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )