from django.contrib.auth import get_user_model
from .serializers import RegisterUserSerializer, UserSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer
    permission_classes = [AllowAny]