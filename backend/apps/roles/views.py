from django.shortcuts import render
from .models import Role, Module, RolePermissions
from .serializers import (
    RoleSerializer,
    ModuleSerializer,
    RolePermissionSerializer, 
)

from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .permission import HasModulePermission


# ---------------- Role ----------------

class RoleListCreateView(generics.ListCreateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAuthenticated, HasModulePermission]
    module_name = "roles"


class RoleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAuthenticated, HasModulePermission]
    module_name = "roles"


# ---------------- Module ----------------

class ModuleListCreateView(generics.ListCreateAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    permission_classes = [IsAuthenticated, HasModulePermission]
    module_name = "roles"


class ModuleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    permission_classes = [IsAuthenticated, HasModulePermission]
    module_name = "roles"


# ---------------- Role Permission ----------------

class RolePermissionListCreateView(generics.ListCreateAPIView):
    queryset = RolePermissions.objects.all()
    serializer_class = RolePermissionSerializer
    permission_classes = [IsAuthenticated, HasModulePermission]
    module_name = "roles"


class RolePermissionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = RolePermissions.objects.all()
    serializer_class = RolePermissionSerializer
    permission_classes = [IsAuthenticated, HasModulePermission]
    module_name = "roles"
    
    
    
class RolePermissionByRoleView(APIView):
    permission_classes = [IsAuthenticated, HasModulePermission]
    module_name = "roles"
    
    def get(self, request, role_id):
        
        role = get_object_or_404(Role, id = role_id)
        
        modules = Module.objects.all()
        
        response = []
        
        for module in modules:
            permission = RolePermissions.objects.filter(
                role = role,
                module = module
            ).first()
            
            if permission:
                
                response.append({
                    "module":module.name,
                    "can_view":permission.can_view,
                    "can_create": permission.can_create,
                    "can_update": permission.can_update,
                    "can_delete": permission.can_delete,
                })
        
            else:
                
                response.append({
                    "module": module.name,
                    "can_view": False,
                    "can_create": False,
                    "can_update": False,
                    "can_delete": False,
                })
                
        return Response({
            "role":role.name,
            "permissions":response
        })
        
        
        
        
        
class AssignRolePermissionView(APIView):
    permission_classes = [IsAuthenticated, HasModulePermission]
    module_name = "roles"
    
    def post(self, request, role_id):
        
        role = get_object_or_404(Role, id=role_id)

        permissions = request.data
        
        for permission in permissions:
            
            module = get_object_or_404(
                Module,
                id=permission["module"]
            )
            
            RolePermissions.objects.update_or_create(
                role=role,
                module=module,
                defaults= {
                    "can_view": permission["can_view"],
                    "can_create": permission["can_create"],
                    "can_update": permission["can_update"],
                    "can_delete": permission["can_delete"],
                }
            )
            
        return Response(
            {
                "message": "Permissions assigned successfully"
            },
            status=status.HTTP_200_OK
        )
        
        
        