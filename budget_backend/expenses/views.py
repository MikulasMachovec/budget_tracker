from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Expense, Category
from .serializers import  CategorySerializer, ExpenseSerializer
from django.contrib.auth import get_user_model
from accounts.models import User
User = get_user_model()

# Create Expense
class CreateExpenseView(generics.CreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [AllowAny]

class CreateCategoryView(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    def perform_create(self, serializer):
        user = User.objects.get(id=8)  # 👈 hard-coded test user
        serializer.save(user=user)