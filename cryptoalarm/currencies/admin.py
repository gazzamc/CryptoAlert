from django.contrib import admin
from .models import Fiat, Crypto, Exchange

admin.site.register(Fiat)
admin.site.register(Crypto)
admin.site.register(Exchange)
