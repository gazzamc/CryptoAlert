from django.db import models
from django.contrib.auth.models import User
from currencies.models import Fiat, Crypto


class AlertType(models.Model):
    name = models.CharField(max_length=10, unique=True)


class Alert(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    fiat_id = models.ForeignKey(Fiat, on_delete=models.CASCADE)
    crypto_id = models.ForeignKey(Crypto, on_delete=models.CASCADE)
    alert_type = models.ForeignKey(AlertType, on_delete=models.CASCADE)
    desired_price = models.FloatField(null=True)
    perc_change = models.FloatField(null=True, blank=True)
    is_above = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)
