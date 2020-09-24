from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Alert, AlertType


class AlertTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = AlertType
        fields = ('pk', 'name')


class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = ('pk', 'user_id', 'fiat_id', 'crypto_id', 'alert_type', 'desired_price',
                  'perc_change', 'is_above', 'date_created', 'date_modified')
