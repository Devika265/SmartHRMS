from django.urls import path
from .views import LoginView, ProfileView, RegisterView, ChangePasswordView, LogoutView, TokenRefreshView, UserListView

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("profile/", ProfileView.as_view(), name = "profile"),
    path("register/", RegisterView.as_view(), name = "register"),
    path("change-password/", ChangePasswordView.as_view(), name = "change-password" ),
    path("logout/", LogoutView.as_view(), name = "logout"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("users/", UserListView.as_view()),
]


