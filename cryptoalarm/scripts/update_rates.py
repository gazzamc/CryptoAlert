from .call_api import CallApi
from currencies.models import Fiat, Crypto, Exchange, CoinHistory
from django.db.models.functions import Now

api = CallApi()


# get coin rates for all fiat in db
def get_coin_rates(coin):
    api.end_point = 'exchangerate'
    api.query = coin
    response = api.connect()

    if response == 200:
        return response.data
    else:
        return response


def get_list_of_fiat():
    res = []

    for fiat in Fiat.objects.all():
        res.append(fiat.name)

    return res


def get_list_of_coins():
    res = []

    for coin in Crypto.objects.all():
        res.append(coin.name)
    return res


def update_coins(coin):
    fiat_currs = get_list_of_fiat()
    rate_dict = {}
    rates = get_coin_rates(coin)

    # put rates in to dictionary with corresponding coin
    rate_dict[coin] = {}
    for coin_keys in rates['rates']:
        for fiat in fiat_currs:
            if coin_keys['asset_id_quote'] == fiat:
                rate_dict[coin][fiat] = coin_keys['rate']

    # Update records
    for coin in rate_dict:
        for fiat in rate_dict[coin]:
            Exchange.objects.filter(name="{0}_{1}".format(
                coin, fiat)).update(rate='{:.2f}'.format(rate_dict[coin][fiat]), date_modified=Now())

    # Add new records to coin history
    # Get id for coin
    coin_id = Crypto.objects.get(name=coin)

    for coin in rate_dict:
        for fiat in rate_dict[coin]:
            # Get id for fiat
            fiat_id = Fiat.objects.get(name=fiat)
            rate = '{:.2f}'.format(rate_dict[coin][fiat])
            CoinHistory.objects.create(
                fiat_id=fiat_id, crypto_id=coin_id,  rate=rate, date_added=Now())


def run():
    coins = get_list_of_coins()
    for coin in coins:
        update_coins(coin)
