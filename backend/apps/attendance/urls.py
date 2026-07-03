from django.urls import path
from .views import AttendanceListCreateView, AttendanceDetailView, CheckInView, CheckOutView

urlpatterns = [
    path("", AttendanceListCreateView.as_view(), name="attendance-list"),
    path("<int:pk>/", AttendanceDetailView.as_view(), name="attendance-detail"),
    path("check-in/", CheckInView.as_view(), name="check-in"),
    path("check-out/", CheckOutView.as_view(), name='check-out'),
]