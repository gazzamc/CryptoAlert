from rest_framework import serializers
from .models import Alert, AlertType


class AlertTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = AlertType
        fields = ('pk', 'name')


class AlertSerializer(serializers.ModelSerializer):
    # This makes reading relevant foreign keys data a bit easier
    username = serializers.CharField(source='user_id.username', read_only=True)
    crypto_name = serializers.CharField(
        source='crypto_id.name', read_only=True)
    fiat_name = serializers.CharField(source='fiat_id.name', read_only=True)
    alert_type_name = serializers.CharField(
        source='alert_type.name', read_only=True)

    class Meta:
        model = Alert
        fields = ('pk', 'username', 'user_id', 'fiat_name',
                  'fiat_id', 'fiat_name', 'crypto_name', 'crypto_id',
                  'alert_type_name', 'alert_type', 'price',
                  'perc_change', 'is_above', 'interval', 'date_created',
                  'date_modified')

        # hide foreign keys from api response
        extra_kwargs = {
            'user_id': {'write_only': True},
            'fiat_id': {'write_only': True},
            'crypto_id': {'write_only': True},
            'alert_type': {'write_only': True}}
