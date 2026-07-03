from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from apps.roles.permission import HasModulePermission

from apps.employees.models import Employee
from apps.departments.models import Department
from apps.accounts.models import CustomUser
from apps.roles.models import Role

# Create your views here.
class DashboardView(APIView):
    permission_classes = [IsAuthenticated, HasModulePermission]
    module_name = "dashboard"
    
    
    def get(self, request):
        
        total_employees = Employee.objects.count()
        
        active_employees = Employee.objects.filter(
            is_active = True
        ).count()
        
        inactive_employees = Employee.objects.filter(
            is_active = False
        ).count()
        
        total_departments = Department.objects.count()
        
        total_users = CustomUser.objects.count()
        
        total_roles = Role.objects.count()
        
        recent_employee_list = []
        
        recent_employees = Employee.objects.order_by("-created_at")[:5]
        
        for employee in recent_employees:
            recent_employee_list.append({
                "id":employee.id,
                "name":f"{employee.first_name} {employee.last_name}",
                "designation":employee.designation,
                "department":employee.department.name,
                "joining_date":employee.joining_date,
                "is_active":employee.is_active,
            })
            
            
        department_summary = []
        
        departments = Department.objects.all()
        
        for department in departments:
            department_summary.append({
                "department":department.name,
                "employee_count":department.employees.count()
            })
        
        
        return Response({
            "total_employees":total_employees,
            "active_employees":active_employees,
            "inactive_employees":inactive_employees,
            "total_departments":total_departments,
            "total_users":total_users,
            "total_roles":total_roles,
            "recent_employees":recent_employee_list,
            "department_summary":department_summary
        })