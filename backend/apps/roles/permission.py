from rest_framework.permissions import BasePermission
from .models import RolePermissions, Module


class HasModulePermission(BasePermission):
    
    def has_permission(self, request, view):
        
        role = request.user.role

        if not role:
            return False
    
    
        module_name = getattr(view, "module_name", None)
        
        module = Module.objects.filter(
            name = module_name
        ).first()
        
        if not module:
            return False
        
        permission = RolePermissions.objects.filter(
            role=role,
            module=module
        ).first()

        if not permission:
            return False
        
        if request.method == "GET":
            return permission.can_view

        if request.method == "POST":
            return permission.can_create

        if request.method in ["PUT", "PATCH"]:
            return permission.can_update

        if request.method == "DELETE":
            return permission.can_delete
                
        return False
    
    
        