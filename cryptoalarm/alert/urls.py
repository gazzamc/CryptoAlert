from rest_framework import routers
from .api import AlertViewSet

router = routers.DefaultRouter()
router.register('api/alert', AlertViewSet, 'alert')

urlpatterns = router.urls
