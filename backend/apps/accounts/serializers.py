from rest_framework import serializers
from .models import CustomUser


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "email",
            "employee_id",
            "phone_number",
        ]
        
        
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "email",
            "employee_id",
            "phone_number",
            "password",
        ]
        
    def create(self, validated_data):
        password = validated_data.pop("password")
        
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        
        return user
    
    
class ChangePasswordSerializer(serializers.Serializer):
    
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)
    
    

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    
    
    
class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "email",
            "employee_id",
            "phone_number",
        ]