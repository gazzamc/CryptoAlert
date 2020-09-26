from rest_framework import routers
from .api import AlertViewSet

router = routers.DefaultRouter()
router.register('api/alert', AlertViewSet, 'alert')
router.register('api/alert/edit', AlertViewSet, 'edit')
urlpatterns = router.urls
