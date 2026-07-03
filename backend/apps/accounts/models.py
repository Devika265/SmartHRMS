from django.db import models
from django.contrib.auth.models import AbstractUser
from apps.roles.models import Role


# Create your models here.
class CustomUser(AbstractUser):
    employee_id = models.CharField( max_length=20, unique=True)
    phone_number = models.CharField(max_length=15, blank=True)
    
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True, related_name="users")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.username
    
    