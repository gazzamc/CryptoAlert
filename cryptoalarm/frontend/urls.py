from django.urls import path
from . import views

# Needed to configure routes in django as it was overriding react router.
# React router handles the data which is why django points to the same view/html
urlpatterns = [
    path('', views.index),
    path('login', views.index),
    path('register', views.index),
    path('alert', views.index),
]
