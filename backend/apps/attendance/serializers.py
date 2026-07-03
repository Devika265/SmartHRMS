from rest_framework import serializers
from .models import Attendance


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = "__all__"
        
        
class AttendanceReadSerializer(serializers.ModelSerializer):
    employee = serializers.CharField(source="employee.first_name", read_only=True)
    designation = serializers.CharField(source="employee.designation.name", read_only=True)
    department = serializers.CharField(source="employee.department.name", read_only=True)

    
    class Meta:
        model = Attendance
        fields = "__all__"
        
        
        
class CheckInSerializer(serializers.Serializer):
    employee = serializers.IntegerField()
    
    
class CheckOutSerializer(serializers.Serializer):
    employee = serializers.IntegerField()
    
