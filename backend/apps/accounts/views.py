from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import LoginSerializer, ProfileSerializer, RegisterSerializer, ChangePasswordSerializer, LogoutSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework import generics
from .serializers import UserListSerializer
from .models import CustomUser
from apps.roles.permission import HasModulePermission
from apps.roles.models import RolePermissions

# Create your views here.
class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            
            user = authenticate(username=username, password=password)
            
    
            if user:
                
                refresh = RefreshToken.for_user(user)
                
                permissions = []
                
                if user.role:
                    role_permissions = RolePermissions.objects.filter(role=user.role)
                    
                    for permission in role_permissions:
                        permissions.append({
                            "module": permission.module.name,
                            "can_view": permission.can_view,
                            "can_create": permission.can_create,
                            "can_update": permission.can_update,
                            "can_delete": permission.can_delete,
                        })
                        
                
                
                return Response(
                    {
                        "message":"Login Successful",
                        "access":str(refresh.access_token),
                        "refresh":str(refresh),
                        "user":{
                            "id":user.id,
                            "username":user.username,
                            "email":user.email,
                            "employee_id": user.employee_id,
                            "phone_number": user.phone_number,
                            "role":user.role.name if user.role else None,
                            "permissions":permissions,
                        }
                        
                        
                    }, status=status.HTTP_200_OK,
                )
                
            return Response(
                {
                    "error":"Invalid username or password"
                }, 
                status = status.HTTP_401_UNAUTHORIZED,
            )
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    

class ProfileView(APIView):
    permission_classes = [IsAuthenticated, HasModulePermission]
    module_name = "accounts"
    
    
    def get(self, request):
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data)
    
    
    
    
class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            
            return Response(
                {
                    "message":"User registered successfully"
                },
                status = status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated, HasModulePermission]
    module_name = "accounts"
    
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        
        if serializer.is_valid():
            old_password = serializer.validated_data["old_password"]
            new_password = serializer.validated_data["new_password"]
            
            if not request.user.check_password(old_password):
                return Response(
                    {
                        "error":"Old password is incorrect"
                    },
                    status = status.HTTP_400_BAD_REQUEST,
                )
            
            request.user.set_password(new_password)
            request.user.save()
            
            return Response(
                {
                    "messsage":"Password changed successfully"
                }, status = status.HTTP_200_OK,
            )
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = LogoutSerializer(data = request.data)
        
        if serializer.is_valid():
            try:
                refresh_token = serializer.validated_data["refresh"]
                
                token = RefreshToken(refresh_token)
                token.blacklist()
                
                return Response(
                    {
                        "message":"Logout Successfully"
                    }, status=status.HTTP_200_OK
                )
                
            except Exception:
                return Response( 
                                {
                     "error":"Invalid refresh token"
                }, status=status.HTTP_400_BAD_REQUEST
                   
                )
                
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
    

class TokenRefreshView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        refresh_token = request.data.get("refresh")
        
        try:
            refresh = RefreshToken(refresh_token)
            
            return Response(
                {
                    "access":str(refresh.access_token)
                }
            )
            
        except Exception:
            return Response(
                {
                    "error":"Invalid refresh token"
                }, status = status.HTTP_400_BAD_REQUEST
            )
            
            
class UserListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, HasModulePermission]
    queryset = CustomUser.objects.all()
    serializer_class = UserListSerializer
    module_name = "accounts"
    
    