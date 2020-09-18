from rest_framework import routers
from .api import AlertViewSet

router = routers.DefaultRouter()
router.register('api/alerts', AlertViewSet, 'alerts')

urlpatterns = router.urls
