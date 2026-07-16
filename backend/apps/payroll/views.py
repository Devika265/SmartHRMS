from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend


from .models import Payroll
from .serializers import PayrollSerializer, PayrollReadSerializer


class PayrollListCreateView(generics.ListCreateAPIView):
    queryset = Payroll.objects.all().order_by("-created_at")
    permission_classes = [IsAuthenticated]
    
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = [
        "employee",
        "month",
        "year",
    ]

    search_fields = [
        "employee__first_name",
        "employee__last_name",
    ]

    ordering_fields = [
        "month",
        "year",
        "basic_salary",
        "net_salary",
        "created_at",
    ]

    def get_serializer_class(self):
        if self.request.method == "GET":
            return PayrollReadSerializer
        return PayrollSerializer


class PayrollDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Payroll.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == "GET":
            return PayrollReadSerializer
        return PayrollSerializer