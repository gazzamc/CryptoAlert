import datetime
import dateutil.parser
import pytz
from django.db.models.functions import Now
from django.core.mail import send_mail
from currencies.models import Exchange
from alert.models import Alert
from cryptoalarm.settings import EMAIL_HOST_USER, EMAIL_HOST_PASSWORD

TITLE = "{0} is {1} {2} - Crypto Alarm"
MESSAGE_PRICE = "You created this alert at Crypto Alarm. Thanks for using our website :)"


def check_alerts():
    # Get all alerts
    alerts = list(Alert.objects.values(
        'pk', 'user_id__username', 'user_id__email', 'fiat_id__name',
        'crypto_id__name', 'alert_type__name',
        'price', 'is_above', 'perc_change', 'interval',
        'date_modified'))

    # Get current rates
    exchanges = list(Exchange.objects.values(
        'crypto_id__name', 'fiat_id__name', 'rate'))

    # check alerts
    for exchange in exchanges:
        for alert in alerts:
            if (exchange['crypto_id__name'] == alert['crypto_id__name'] and
                    exchange['fiat_id__name'] == alert['fiat_id__name']):
                if alert['alert_type__name'] == "price":
                    # determine if price is above or below then
                    # check
                    if alert['is_above']:
                        if alert['price'] >= exchange['rate']:
                            send_email(alert['user_id__email'],
                                       TITLE.format(exchange['crypto_id__name'],
                                                    "Above", "{0:0.2f} {1}".format(alert['price'], alert['fiat_id__name'])),
                                       MESSAGE_PRICE)
                    else:
                        if alert['price'] <= exchange['rate']:
                            send_email(alert['user_id__email'],
                                       TITLE.format(exchange['crypto_id__name'],
                                                    "Below", "{0:0.2f} {1}".format(alert['price'], alert['fiat_id__name'])),
                                       MESSAGE_PRICE)
                else:
                    # get current time and compare with date_modifed
                    # then check against interval
                    last_mod = dateutil.parser.parse(
                        str(alert['date_modified']))
                    difference = pytz.utc.localize(
                        datetime.datetime.utcnow()) - last_mod

                    # if less than interval update modified_date in db
                    # otherwise check percentage
                    if difference.seconds <= alert['interval'] * 3600:
                        # update
                        Alert.objects.filter(pk=alert['pk']).update(
                            date_modified=Now())
                    else:

                        # Check if price is not none type
                        if(alert['price'] is not None):
                            perc_change = (
                                (exchange['rate'] - alert['price']) / alert['price']) * 100

                            if perc_change >= alert['perc_change']:
                                send_email(alert['user_id__email'],
                                           TITLE.format(exchange['crypto_id__name'],
                                                        "Up", "{0:0.1f}%".format(perc_change)),
                                           MESSAGE_PRICE)
                        else:
                            # Update that record with current rate
                            Alert.objects.filter(pk=alert['pk']).update(
                                price=exchange['rate'])


def send_email(email, title, msg):
    subject = title
    message = msg
    recipient_list = [email]
    send_mail(subject, message, None, recipient_list,
              False, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)


def run():
    check_alerts()
