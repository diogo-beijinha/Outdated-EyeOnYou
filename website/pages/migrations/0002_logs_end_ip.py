# Generated by Django 4.0.3 on 2022-06-30 20:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='logs',
            name='end_ip',
            field=models.CharField(default=None, max_length=20),
            preserve_default=False,
        ),
    ]
