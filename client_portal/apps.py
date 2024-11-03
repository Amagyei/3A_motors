from django.apps import AppConfig


class ClientPortalConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'client_portal'

    def ready(self):
        import client_portal.signals