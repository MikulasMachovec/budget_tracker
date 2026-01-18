from django.db import models
from django.db.models import Sum
from decimal import Decimal
from django.utils import timezone

from budget_backend.accounts.models import User

class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='budgets')
    budget_name = models.CharField(max_length=100)
    month = models.DateField(default=timezone.now)
    total_budget = models.DecimalField(max_digits=10, decimal_places=2)
    is_unbudgeted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-month']
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'month', 'budget_name'],
                name='unique_budget_per_month'
            ),
            models.UniqueConstraint(
                fields=['user', 'month'],
                condition=Q(is_unbudgeted=True),
                name='unique_unbudgeted_budget_per_month'
            )
        ]

    def save(self, *args, **kwargs):
        if self.month:
            self.month = self.month.replace(day=1)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.budget_name} - {self.month.strftime('%B %Y')}"

    @property
    def spent_amout(self) -> Decimal:
        return self.expense.aggregate(
            total=Sum('amount')
        )['total'] or Decimal(0.00)
    
    @property
    def remaining_budget(self) -> Decimal:
        return self.total_budget - self.spent_amout
    
    @property
    def is_over_budget(self) -> bool:
        return self.remaining_budget < 0

def get_unbudgeted_budget(user, date):
    month_start = date.replace(day=1)

    budget, _ = Budget.objects.get_or_create(
        user=user,
        month=month_start,
        is_unbudgeted=True,
        defaults={
            "budget_name": "Unbudgeted",
            "total_budget": 0
        }
    )
    return budget


class Expense(models.Model):
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE, related_name='expenses')
    expense_name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.expense_name} - {self.amount} ({self.date})"