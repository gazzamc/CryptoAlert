from rest_framework import serializers
from alert.models import Fiat, Crypto, Alert

# Alert Serializer


class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = '__all__'
