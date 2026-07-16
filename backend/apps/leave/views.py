from django.shortcuts import render
from .models import Leave
from .serializers import LeaveSerializer, LeaveReadSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.
class LeaveListCreateView(generics.ListCreateAPIView):
    queryset = Leave.objects.all().order_by("-created_at")
    permission_classes = [IsAuthenticated]
        
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    
    
    filterset_fields = [
        "employee",
        "leave_type",
        "status",
        "start_date",
        "end_date",
    ]
    
    search_fields = [
        "employee__first_name",
        "employee__last_name",
    ]
    
    ordering_fields = [
        "start_date",
        "end_date",
        "created_at"
    ]
    
    def get_serializer_class(self):
        if self.request.method == "GET":
            return LeaveReadSerializer
        return LeaveSerializer
    

class LeaveDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Leave.objects.all()
    permission_classes = [IsAuthenticated]
        
    def get_serializer_class(self):
        if self.request.method == "GET":
            return LeaveReadSerializer
        return LeaveSerializer
    
    
