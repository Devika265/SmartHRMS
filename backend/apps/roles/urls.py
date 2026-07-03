from django.urls import path
from .views import (
    RoleListCreateView,
    RoleDetailView,
    ModuleListCreateView,
    ModuleDetailView,
    RolePermissionListCreateView,
    RolePermissionDetailView,
    RolePermissionByRoleView, AssignRolePermissionView
)


urlpatterns = [
    # Role
    path("roles/", RoleListCreateView.as_view(), name="role-list"),
    path("roles/<int:pk>/", RoleDetailView.as_view(), name="role-detail"),

    # Module
    path("modules/", ModuleListCreateView.as_view(), name="module-list"),
    path("modules/<int:pk>/", ModuleDetailView.as_view(), name="module-detail"),

    # Role Permission
    path(
        "role-permissions/",
        RolePermissionListCreateView.as_view(),
        name="role-permission-list",
    ),
    path(
        "role-permissions/<int:pk>/",
        RolePermissionDetailView.as_view(),
        name="role-permission-detail",
    ),
    path(
    "roles/<int:role_id>/permissions/",
    RolePermissionByRoleView.as_view(),
    name="role-permissions-by-role",
    ),
    path(
    "roles/<int:role_id>/assign-permissions/",
    AssignRolePermissionView.as_view(),
    name="assign-role-permissions",
),
]