# Generated by Django 3.1.1 on 2020-09-25 02:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('alert', '0009_auto_20200924_0417'),
    ]

    operations = [
        migrations.RenameField(
            model_name='alert',
            old_name='desired_price',
            new_name='price',
        ),
    ]