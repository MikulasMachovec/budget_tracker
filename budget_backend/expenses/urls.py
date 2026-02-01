from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ExpenseViewSet, CategoryViewSet, IncomeViewSet

#PATH => api/expenses/

router = DefaultRouter()

router.register(r'expenses', ExpenseViewSet, basename='expenses')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'incomes', IncomeViewSet, basename='income')

urlpatterns = router.urls
