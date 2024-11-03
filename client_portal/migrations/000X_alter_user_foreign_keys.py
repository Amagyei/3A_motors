# client_portal/migrations/000X_alter_user_foreign_keys.py

from django.db import migrations, models
import django.db.models.deletion
from django.conf import settings

class Migration(migrations.Migration):

    dependencies = [
        ('client_portal', 'previous_migration_name'),
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='servicerecord',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='servicerecord',
            name='assigned_to',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.SET_NULL,
                null=True,
                blank=True,
                related_name='assigned_services',
                to=settings.AUTH_USER_MODEL,
                limit_choices_to={'user_type': 'employee'}
            ),
        ),
        ]
    