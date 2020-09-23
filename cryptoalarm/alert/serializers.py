from rest_framework import serializers
from .models import Alert


class AlertSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user_id.username')
    crypto_name = serializers.CharField(source='crypto_id.name')
    fiat_name = serializers.CharField(source='fiat_id.name')
    alert_type_name = serializers.CharField(source='alert_type.name')

    class Meta:
        model = Alert
        fields = ('id', 'username', 'fiat_name',
                  'crypto_name', 'alert_type_name', 'desired_price',
                  'perc_change', 'is_above', 'date_created')
