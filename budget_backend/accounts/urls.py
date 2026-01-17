from django.urls import path
from .views import RegisterView, UserDataView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# PATH => api/account/

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('user/', UserDataView.as_view(), name='user'),

    # Simple JWT token api
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
