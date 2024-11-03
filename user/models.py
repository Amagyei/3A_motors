from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db.models.signals import post_save

from shortuuid.django_fields import ShortUUIDField

# Constants
GENDER = (
    ("1", "Male"),
    ("2", "Female"),
)

USER_TYPE_CHOICES = [
    ("client", "Client"),
    ("employee", "Employee"),
    ("administrator", "Administrator"),
]

def user_dir_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (instance.user.id, filename)
    return "user_{0}/{1}".format(instance.user.id, filename)

# Custom user manager
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from shortuuid.django_fields import ShortUUIDField

# Custom user manager to handle email-based login and user creation
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)

# Custom User model
class User(AbstractUser):
    uid = ShortUUIDField(
        length=8,
        max_length=25,
        unique=True,
        primary_key=True,
        alphabet='abcdefghijklmnopqrstuvwxyz1234567890'
    )
    full_name = models.CharField(max_length=156, null=True, blank=True)
    username = models.CharField(max_length=156, unique=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=16, null=True, blank=True, unique=True)
    gender = models.CharField(
        max_length=20,
        choices=[("1", "Male"), ("2", "Female")],
        default="1"
    )
    otp = models.CharField(max_length=100, null=True, blank=True)
    user_type = models.CharField(
        max_length=20,
        choices=[
            ("client", "Client"),
            ("employee", "Employee"),
            ("administrator", "Administrator")
        ],
        default="client"
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name="custom_user_groups",
        blank=True,
        help_text="The groups this user belongs to."
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name="custom_user_permissions",
        blank=True,
        help_text="Specific permissions for this user."
    )

    objects = UserManager()

    USERNAME_FIELD = 'username'
    # REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

# Profile Model
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.FileField(upload_to=user_dir_path, default="default.jpg", null=True, blank=True)
    full_name = models.CharField(max_length=156, null=True, blank=True)
    phone = models.CharField(max_length=16, null=True, blank=True, unique=True)
    gender = models.CharField(max_length=20, choices=GENDER, default="other")
    residential_address = models.CharField(max_length=256, null=True, blank=True)
    mailing_address = models.CharField(max_length=156, null=True, blank=True)
    parents_name = models.CharField(max_length=156, null=True, blank=True)
    parents_number = models.CharField(max_length=156, null=True, blank=True)
    verified = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)
    wallet = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.user.uid} - {self.user.full_name or self.user.username}"

# Signal Handlers for Profile Creation
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)