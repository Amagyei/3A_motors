# Generated by Django 5.1.2 on 2024-11-03 14:15

import django.db.models.deletion
import django.utils.timezone
import shortuuid.django_fields
import user.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('uid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefghijklmnopqrstuvwxyz1234567890', length=8, max_length=25, prefix='', primary_key=True, serialize=False, unique=True)),
                ('full_name', models.CharField(blank=True, max_length=156, null=True)),
                ('username', models.CharField(max_length=156, unique=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('phone', models.CharField(blank=True, max_length=16, null=True, unique=True)),
                ('gender', models.CharField(choices=[('1', 'Male'), ('2', 'Female')], default='1', max_length=20)),
                ('otp', models.CharField(blank=True, max_length=100, null=True)),
                ('user_type', models.CharField(choices=[('client', 'Client'), ('employee', 'Employee'), ('administrator', 'Administrator')], default='client', max_length=20)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to.', related_name='custom_user_groups', to='auth.group')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='custom_user_permissions', to='auth.permission')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.FileField(blank=True, default='default.jpg', null=True, upload_to=user.models.user_dir_path)),
                ('full_name', models.CharField(blank=True, max_length=156, null=True)),
                ('phone', models.CharField(blank=True, max_length=16, null=True, unique=True)),
                ('gender', models.CharField(choices=[('1', 'Male'), ('2', 'Female')], default='other', max_length=20)),
                ('residential_address', models.CharField(blank=True, max_length=256, null=True)),
                ('mailing_address', models.CharField(blank=True, max_length=156, null=True)),
                ('parents_name', models.CharField(blank=True, max_length=156, null=True)),
                ('parents_number', models.CharField(blank=True, max_length=156, null=True)),
                ('verified', models.BooleanField(default=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('wallet', models.DecimalField(decimal_places=2, default=0.0, max_digits=12)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-date'],
            },
        ),
    ]