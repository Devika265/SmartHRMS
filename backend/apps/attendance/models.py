from django.db import models
from apps.employees.models import Employee
from django.utils import timezone
from datetime import datetime

# Create your models here.

def current_time():
        return timezone.localtime().time()

class Attendance(models.Model):
    
    STATUS_CHOICES = [
        ("Present", "Present"),
        ("Absent", "Absent"),
        ("Leave", "Leave"),
    ]
    
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="attendances")
    
    date = models.DateField(default=timezone.localdate)
    check_in = models.TimeField(default=current_time)
    check_out = models.TimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["employee", "date"],
                name = "unique_employee_attendance"
            )
        ]
    
    def __str__(self):
        return f"{self.employee} - {self.date}"
