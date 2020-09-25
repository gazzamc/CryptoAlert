from rest_framework import serializers
from .models import Alert, AlertType


class AlertTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = AlertType
        fields = ('pk', 'name')


class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = ('pk', 'user_id', 'fiat_id', 'crypto_id', 'alert_type', 'price',
                  'perc_change', 'is_above', 'date_created', 'date_modified')
