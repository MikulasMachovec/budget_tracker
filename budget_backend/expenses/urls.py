from django.urls import path
from .views import ExpenseViewSet, CategoryViewSet

#PATH => api/expenses/

urlpatterns = [
    path('expenses/', ExpenseViewSet.as_view({'get': 'list','post': 'create'}), name='create_expense'),
    path('categories/', CategoryViewSet.as_view({'get': 'list', 'post': 'create'}), name='category-list-create')

]
