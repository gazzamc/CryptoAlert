from rest_framework import viewsets
from .models import Fiat, Crypto, Exchange
from .serializers import FiatSerializer, CryptoSerializer, ExchangeSerializer
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


class ExchangeViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminOrReadOnly,)
    serializer_class = ExchangeSerializer

    def get_queryset(self):
        return Exchange.objects.all()
