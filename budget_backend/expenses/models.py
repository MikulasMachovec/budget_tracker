from django.db import models
from django.db.models import Sum
from decimal import Decimal
from django.utils import timezone
from django.db.models import Q

from accounts.models import User

#Previous named Budget

class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories')
    category_name = models.CharField(max_length=100)
    month = models.DateField(default=timezone.now)
    alocated_amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_uncategorized = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-month']
        constraints = [
            # Ensure unique category (example: not to have 2 categories named food)
            models.UniqueConstraint(
                fields=['user', 'month', 'category_name'],
                name='unique_category_per_month'
            ),
            models.UniqueConstraint(
                fields=['user', 'month'],
                condition=Q(is_uncategorized=True), 
                name='unique_uncategorized_category_per_month'
            )
        ]

    def save(self, *args, **kwargs):
        if self.month:
            self.month = self.month.replace(day=1)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.category_name} - {self.month.strftime('%B %Y')}"

    @property
    def spent_amout(self) -> Decimal:
        return self.expense.aggregate(
            total=Sum('amount')
        )['total'] or Decimal(0.00)
    
    @property
    def remaining_amount(self) -> Decimal:
        return self.alocated_amount - self.spent_amout
    
    @property
    def is_over_spent(self) -> bool:
        return self.remaining_amount < 0

def get_uncategorized_spending(user, date):
    month_start = date.replace(day=1)

    category, _ = Category.objects.get_or_create(
        user=user,
        month=month_start,
        is_uncategorized=True,
        defaults={
            "category_name": "Uncategorized",
            "alocated_amount": 0
        }
    )
    return category


class Expense(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='expenses')
    expense_name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.expense_name} - {self.amount} ({self.date})"