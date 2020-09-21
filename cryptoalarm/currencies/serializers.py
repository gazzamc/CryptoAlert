from rest_framework import serializers
from .models import Fiat, Crypto, Exchange


class FiatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fiat
        fields = ('id', 'name')


class CryptoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crypto
        fields = ('id', 'name')


class ExchangeSerializer(serializers.ModelSerializer):
    crypto_name = serializers.CharField(source='crypto_id.name')
    fiat_name = serializers.CharField(source='fiat_id.name')

    class Meta:
        model = Exchange
        fields = ('id', 'name', 'crypto_name',
                  'fiat_name', 'rate', 'date_modified')
