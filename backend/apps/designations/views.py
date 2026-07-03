from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from apps.roles.permission import HasModulePermission
from .models import Designation
from .serializers import DesignationSerializer


# Create your views here.
class DesignationListCreateView(generics.ListCreateAPIView):
    queryset = Designation.objects.all()
    serializer_class = DesignationSerializer
    permission_classes = [IsAuthenticated, HasModulePermission]
    module_name = "designations"
    
    
class DesignationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Designation.objects.all()
    serializer_class = DesignationSerializer
    permission_classes = [IsAuthenticated, HasModulePermission]
    module_name = "designations"
    
    