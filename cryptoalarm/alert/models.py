from django.db import models
from django.contrib.auth.models import User


class Fiat(models.Model):
    name = models.CharField(max_length=10, unique=True)


class Crypto(models.Model):
    name = models.CharField(max_length=10, unique=True)


class Alert(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fiat_curr = models.ForeignKey(Fiat, on_delete=models.CASCADE)
    crypto_curr = models.ForeignKey(Crypto, on_delete=models.CASCADE)
    desired_price = models.FloatField(null=True)
    perc_change = models.FloatField(null=True)
    is_above = models.BooleanField()
    date_created = models.DateTimeField(auto_now_add=True)
