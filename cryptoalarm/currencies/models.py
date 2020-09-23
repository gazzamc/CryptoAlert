from django.db import models


class Fiat(models.Model):
    name = models.CharField(max_length=10, unique=True)


class Crypto(models.Model):
    name = models.CharField(max_length=10, unique=True)


class Exchange(models.Model):
    name = models.CharField(max_length=10, unique=True)
    fiat_id = models.ForeignKey(Fiat, on_delete=models.CASCADE)
    crypto_id = models.ForeignKey(Crypto, on_delete=models.CASCADE)
    rate = models.FloatField(null=False)
    date_modified = models.DateTimeField(auto_now_add=True)


class CoinHistory(models.Model):
    fiat_id = models.ForeignKey(Fiat, on_delete=models.CASCADE)
    crypto_id = models.ForeignKey(Crypto, on_delete=models.CASCADE)
    value = models.FloatField(null=False)
    date_added = models.DateTimeField(auto_now_add=True)
