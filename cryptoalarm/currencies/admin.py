from django.contrib import admin
from .models import Fiat, Crypto, Exchange, CoinHistory

admin.site.register(Fiat)
admin.site.register(Crypto)
admin.site.register(Exchange)
admin.site.register(CoinHistory)
