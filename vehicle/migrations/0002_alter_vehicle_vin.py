# Generated by Django 5.1.5 on 2025-01-27 01:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vehicle', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vehicle',
            name='vin',
            field=models.CharField(blank=True, help_text='Vehicle Identification Number (optional)', max_length=100, null=True, unique=True),
        ),
    ]
