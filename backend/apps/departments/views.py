from django.shortcuts import render
from rest_framework import generics
from .models import Department
from .serializers import DepartmentSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters

# Create your views here.
class DepartmentListCreateView(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated]
        
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "=code"]
    
    
class DepartmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated]
        