from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .models import Expense, Category, Income, get_uncategorized_spending
from .serializers import  CategorySerializer, ExpenseSerializer, IncomeSerializer
from django.contrib.auth import get_user_model
from accounts.models import User
User = get_user_model()

# Create Expense
class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Expense.objects.filter(
            category__user=self.request.user
        )
    
    def perform_create(self, serializer):
       print('validated data',serializer.validated_data)
       category = serializer.validated_data.get('category_id')
       
       if category.user != self.request.user:
           raise PermissionDenied("Not your category")

       serializer.save()

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class IncomeViewSet(viewsets.ModelViewSet):
    serializer_class = IncomeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Income.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)