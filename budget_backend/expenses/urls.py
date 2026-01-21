from django.urls import path
from .views import CreateExpenseView, CreateCategoryView

#PATH => api/expenses/

urlpatterns = [
    path('create_expense/', CreateExpenseView.as_view(), name='create_expense'),
    path('create_category/', CreateCategoryView.as_view(), name='create_category'),
]
