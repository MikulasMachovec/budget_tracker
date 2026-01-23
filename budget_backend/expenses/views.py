from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .models import Expense, Category
from .serializers import  CategorySerializer, ExpenseSerializer
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
       category = serializer.validate_data.get('category')

       if category is None:
           category = Category.get_uncategorized_spending(
               user= self.request.user,
               date=serializer.validated_data.get('date')
           )

       if category.user != self.request.user:
           raise PermissionDenied("Not your category")
       
       serializer.save(category=category)

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)