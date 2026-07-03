from rest_framework import serializers
from .models import Leave

class LeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model=Leave
        fields = "__all__"
        
        
class LeaveReadSerializer(serializers.ModelSerializer):
    employee = serializers.CharField(source="employee.first_name", read_only=True)
    designation = serializers.CharField(source="employee.designation.name", read_only=True)
    department = serializers.CharField(source="employee.department.name", read_only=True)
    
    class Meta:
        model=Leave
        fields = "__all__"
        
