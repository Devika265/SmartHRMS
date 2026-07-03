from rest_framework import serializers
from .models import Payroll


class PayrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payroll
        fields = "__all__"


class PayrollReadSerializer(serializers.ModelSerializer):
    employee = serializers.CharField(source="employee.first_name", read_only=True)
    designation = serializers.CharField(source="employee.designation.name", read_only=True)
    department = serializers.CharField(source="employee.department.name", read_only=True)

    class Meta:
        model = Payroll
        fields = "__all__"
        
