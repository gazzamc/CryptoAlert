# Generated by Django 3.1.1 on 2020-09-23 01:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('alert', '0003_auto_20200921_0302'),
    ]

    operations = [
        migrations.CreateModel(
            name='AlertType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name='alert',
            name='alert_type',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='alert.alerttype'),
            preserve_default=False,
        ),
    ]
