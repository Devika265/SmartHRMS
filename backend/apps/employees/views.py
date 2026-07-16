from django.shortcuts import render
from .serializers import EmployeeSerializer, EmployeeReadSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, filters
from .models import Employee
from django_filters.rest_framework import DjangoFilterBackend


# Create your views here.
class EmployeeListCreateView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == "GET":
            return EmployeeReadSerializer
        return EmployeeSerializer
    
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]
        
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    
    search_fields = [
        "first_name",
        "last_name",
        "email",
        "designation__name",
        "department__name",
    ]
    
    filterset_fields = [
        "department",
        "is_active",
        "designation",
    ]
    
    ordering_fields = [
        "first_name",
        "salary",
        "joining_date",
    ]
    
class EmployeeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    
    def get_serializer_class(self):
        if self.request.method == "GET":
            return EmployeeReadSerializer
        return EmployeeSerializer
    
    permission_classes = [IsAuthenticated]
    
        
    