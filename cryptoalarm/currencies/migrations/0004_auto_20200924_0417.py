# Generated by Django 3.1.1 on 2020-09-24 03:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('currencies', '0003_coinhistory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exchange',
            name='date_modified',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
