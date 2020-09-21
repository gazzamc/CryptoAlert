from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('', include('alert.urls')),
    path('', include('accounts.urls')),
    path('', include('currencies.urls'))
]
