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

# Create your views here.
from django.contrib.auth import authenticate, get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import LoginSerializer

User = get_user_model()


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]

            try:
                user_obj = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response(
                    {"error": "Invalid email or password"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            user = authenticate(
                username=user_obj.username,
                password=password
            )

            if user:
                refresh = RefreshToken.for_user(user)

                return Response(
                    {
                        "message": "Login Successful",
                        "access": str(refresh.access_token),
                        "refresh": str(refresh),
                        "user": {
                            "id": user.id,
                            "username": user.username,
                            "email": user.email,
                            "employee_id": user.employee_id,
                            "phone_number": user.phone_number,
                        },
                    },
                    status=status.HTTP_200_OK,
                )

            return Response(
                {"error": "Invalid email or password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    
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
    permission_classes = [IsAuthenticated]
    
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
    permission_classes = [IsAuthenticated]
    queryset = CustomUser.objects.all()
    serializer_class = UserListSerializer