# Crypto Alarm

Simple cryptocurrency application that monitors the current rates of various fiat currencies. It allows users to create alerts for any changes in price or percentage over time.

This website is built using `Django`, `Django REST Framework`, `Python`, `ReactJS` and `Bootstrap`.

## Demo

You can try the live version of the Website [Here](https://cryptoalarms.herokuapp.com/)<br><br>

## Scripts

In order for the rates to be retrieved you must run the following script:

```
python manage.py runscript update_rates
```

In order for users to be notified about any alerts you must run the following script:

```
python manage.py runscript check_alerts
```
