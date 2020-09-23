from alert.models import Alert
from rest_framework import viewsets, permissions
from .serializers import AlertSerializer


class AlertViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = AlertSerializer

    def get_queryset(self):
        return Alert.objects.filter(user_id=self.request.user.id)
