from django.db import models
from apps.departments.models import Department
from apps.designations.models import Designation

# Create your models here.
class Employee(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    
    designation = models.ForeignKey(Designation, on_delete=models.CASCADE, related_name="employees")
    
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="employees")
    
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    joining_date = models.DateField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    