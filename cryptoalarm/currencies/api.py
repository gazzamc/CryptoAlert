from rest_framework import viewsets
import django_filters
from django_filters import rest_framework as filters
from .models import Fiat, Crypto, Exchange, CoinHistory
from .serializers import (FiatSerializer, CryptoSerializer,
                          ExchangeSerializer, CoinHistorySerializer)
from .utils.permissions import IsAdminOrReadOnly


class FiatViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminOrReadOnly,)
    serializer_class = FiatSerializer

    def get_queryset(self):
        return Fiat.objects.all()


class CryptoViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminOrReadOnly,)
    serializer_class = CryptoSerializer

    def get_queryset(self):
        return Crypto.objects.all()


class ExchangeFilters(filters.FilterSet):
    crypto = django_filters.CharFilter(
        field_name="crypto_id__name", lookup_expr='iexact')

    fiat = django_filters.CharFilter(
        field_name="fiat_id__name", lookup_expr='iexact')

    ex_pair = django_filters.CharFilter(
        field_name="name", lookup_expr='iexact')

    date_time_range = django_filters.IsoDateTimeFromToRangeFilter(
        field_name="date_modified")

    class Meta:
        model = Exchange
        fields = ('id', 'crypto', 'fiat', 'ex_pair',
                  'date_time_range')


class ExchangeViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminOrReadOnly,)
    filterset_class = ExchangeFilters
    serializer_class = ExchangeSerializer

    def get_queryset(self):
        return Exchange.objects.all()


class CoinHistoryFilters(filters.FilterSet):
    crypto = django_filters.CharFilter(
        field_name="crypto_id__name", lookup_expr='iexact')

    fiat = django_filters.CharFilter(
        field_name="fiat_id__name", lookup_expr='iexact')

    date_time_range = django_filters.IsoDateTimeFromToRangeFilter(
        field_name="date_added")

    class Meta:
        model = CoinHistory
        fields = ('id', 'crypto', 'fiat',
                  'date_time_range')


class CoinHistoryViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminOrReadOnly,)
    filterset_class = CoinHistoryFilters
    serializer_class = CoinHistorySerializer

    def get_queryset(self):
        return CoinHistory.objects.all()
