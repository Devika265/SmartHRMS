from django.db import models
from apps.employees.models import Employee


class Payroll(models.Model):

    MONTH_CHOICES = [
        ("January", "January"),
        ("February", "February"),
        ("March", "March"),
        ("April", "April"),
        ("May", "May"),
        ("June", "June"),
        ("July", "July"),
        ("August", "August"),
        ("September", "September"),
        ("October", "October"),
        ("November", "November"),
        ("December", "December"),
    ]

    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name="payrolls"
    )

    month = models.CharField(max_length=20, choices=MONTH_CHOICES)
    year = models.IntegerField()

    basic_salary = models.DecimalField(max_digits=10, decimal_places=2)
    allowances = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    deductions = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    net_salary = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        editable=False
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["employee", "month", "year"],
                name="unique_employee_payroll"
            )
        ]

    def save(self, *args, **kwargs):
        self.net_salary = (
            self.basic_salary +
            self.allowances -
            self.deductions
        )
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.employee} - {self.month} {self.year}"