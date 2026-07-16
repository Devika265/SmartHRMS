from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from .models import Attendance
from .serializers import AttendanceSerializer, AttendanceReadSerializer, CheckInSerializer, CheckOutSerializer
from rest_framework import generics, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.utils import timezone
from apps.employees.models import Employee
from django_filters.rest_framework import DjangoFilterBackend


# Create your views here.
class AttendanceListCreateView(generics.ListCreateAPIView):
    queryset = Attendance.objects.all()
    permission_classes = [IsAuthenticated]
        
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    
    filterset_fields = [
        "employee",
        "status",
        "date",
    ]

    
    search_fields =  [
        "employee__first_name",
        "employee__last_name",
    ]
    
    ordering_fields = [
        "date",
        "check_in",
        "check_out",
    ]
    
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return AttendanceReadSerializer
        return AttendanceSerializer
    
    
class AttendanceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Attendance.objects.all()
    permission_classes = [IsAuthenticated]
        
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return AttendanceReadSerializer
        return AttendanceSerializer
    
    
    
class CheckInView(APIView):
    permission_classes = [IsAuthenticated]
        
    def post(self, request):
        serializer = CheckInSerializer(data=request.data)
        
        if serializer.is_valid():
            employee_id = serializer.validated_data["employee"]
            employee = get_object_or_404(Employee, id=employee_id)
            
            today = timezone.localdate()
            
            attendance = Attendance.objects.filter(
                employee=employee,
                date=today
            ).first()
            
            
            if attendance:
                return Response(
                    {
                        "message":"Employee already checked in today."
                    }
                )
                
                
            attendance = Attendance.objects.create(
                employee = employee,
                date=today,
                status = "present",
            )
            
            
            return Response(
                AttendanceReadSerializer(attendance).data,
                status = status.HTTP_201_CREATED,
            )
            
        
        return Response(serializer.errors, status=status.HTTP_400)
    
    
    
class CheckOutView(APIView):
    permission_classes = [IsAuthenticated]
        
    def post(self, request):
        serializer = CheckOutSerializer(data=request.data)
        
        if serializer.is_valid():
            employee_id = serializer.validated_data['employee']
            
            employee = get_object_or_404(Employee, id=employee_id)
            
            today = timezone.localdate()
            
            attendance = Attendance.objects.filter(
                employee = employee,
                date = today
            ).first()
            
            if not attendance:
                return Response(
                    {'message':"Please check in first"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
                
            
            if attendance.check_out:
                return Response(
                    {"message":"Employee already checked out."},
                    status = status.HTTP_400_BAD_REQUEST,
                )
                
            
            attendance.check_out = timezone.localtime().time()
            attendance.save()
            
            return Response(
                AttendanceReadSerializer(attendance).data,
                status=status.HTTP_200_OK,
            )
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    