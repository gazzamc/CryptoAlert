from rest_framework import routers
from .api import FiatViewSet, CryptoViewSet, ExchangeViewSet

router = routers.DefaultRouter()
router.register('api/exchange', ExchangeViewSet, 'exchange')
router.register('api/fiat', FiatViewSet, 'fiat')
router.register('api/crypto', CryptoViewSet, 'crypto')

urlpatterns = router.urls
