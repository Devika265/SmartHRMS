from rest_framework import serializers
from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Employee
        fields = "__all__"
        
        
class EmployeeReadSerializer(serializers.ModelSerializer):
    designation = serializers.CharField(source="designation.name", read_only=True)
    department = serializers.CharField(source="department.name", read_only=True)

    class Meta:
        model = Employee
        fields = "__all__"
        
        