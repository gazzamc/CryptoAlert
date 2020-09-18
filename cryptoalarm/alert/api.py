from alert.models import Alert
from rest_framework import viewsets, permissions
from .serializers import AlertSerializer

# Alert Viewset


class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = AlertSerializer
