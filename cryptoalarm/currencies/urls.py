from rest_framework import routers
from .api import FiatViewSet, CryptoViewSet, ExchangeViewSet, CoinHistoryViewSet

router = routers.DefaultRouter()
router.register('api/exchange', ExchangeViewSet, 'exchange')
router.register('api/history', CoinHistoryViewSet, 'history')
router.register('api/fiat', FiatViewSet, 'fiat')
router.register('api/crypto', CryptoViewSet, 'crypto')

urlpatterns = router.urls
