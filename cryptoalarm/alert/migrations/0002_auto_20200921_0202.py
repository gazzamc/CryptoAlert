# Generated by Django 3.1.1 on 2020-09-21 01:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('currencies', '0001_initial'),
        ('alert', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alert',
            name='crypto_curr',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='currencies.crypto'),
        ),
        migrations.AlterField(
            model_name='alert',
            name='fiat_curr',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='currencies.fiat'),
        ),
        migrations.AlterField(
            model_name='alert',
            name='is_above',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='alert',
            name='perc_change',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.DeleteModel(
            name='Crypto',
        ),
        migrations.DeleteModel(
            name='Fiat',
        ),
    ]
