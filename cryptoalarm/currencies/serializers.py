from rest_framework import serializers
from .models import Fiat, Crypto, Exchange, CoinHistory


class FiatSerializer(serializers.ModelSerializer):
    name = serializers.CharField()

    class Meta:
        model = Fiat
        fields = ('pk', 'name')


class CryptoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crypto
        fields = ('pk', 'name')


class ExchangeSerializer(serializers.ModelSerializer):
    crypto_name = serializers.CharField(source='crypto_id.name')
    fiat_name = serializers.CharField(source='fiat_id.name')

    class Meta:
        model = Exchange
        fields = ('pk', 'name', 'crypto_name',
                  'fiat_name', 'rate', 'date_modified')


class CoinHistorySerializer(serializers.ModelSerializer):
    crypto_name = serializers.CharField(source='crypto_id.name')
    fiat_name = serializers.CharField(source='fiat_id.name')

    class Meta:
        model = CoinHistory
        fields = ('pk', 'crypto_name',
                  'fiat_name', 'rate', 'date_added')
