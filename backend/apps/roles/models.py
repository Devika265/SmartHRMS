from django.db import models


# Create your models here.
class Module(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name


class Role(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    
    
    def __str__(self):
        return self.name
    
    
class RolePermissions(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    
    
    can_view = models.BooleanField(default=False)
    can_create = models.BooleanField(default=False)
    can_update = models.BooleanField(default=False)
    can_delete = models.BooleanField(default=False)
    
    class Meta:
        unique_together = ("role", "module")
        
        
    def __str__(self):
        return f"{self.role.name} - {self.module.name}"


