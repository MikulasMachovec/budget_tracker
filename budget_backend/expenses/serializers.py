from django.utils import timezone
from rest_framework import serializers
from .models import Budget, Expense, get_unbudgeted_budget

class BudgetSerializer(serializers.ModelSerializer):
    spent_amount = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        read_only=True
    )
    remaining_budget = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        read_only=True
    )
    is_over_budget = serializers.BooleanField(read_only=True)

    class Meta:
        model = Budget
        fields = [
            'id',
            'budget_name',
            'month',
            'total_budget',
            'spent_amount',
            'remaining_budget',
            'is_over_budget',
        ]


class ExpenseCreateSerializer(serializers.ModelSerializer):
    budget_id = serializers.PrimaryKeyRelatedField(
        queryset=Budget.objects.all(),
        required=False,
        allow_null=True,
        write_only=True
    )

    class Meta:
        model = Expense
        fields = ['expense_name', 'amount', 'date', 'budget_id']

    def create(self, validated_data):
        user = self.context['request'].user
        budget = validated_data.pop('budget_id', None)
        date = validated_data.get('date', timezone.now().date())

        if budget is None:
            budget = get_unbudgeted_budget(user, date)

        return Expense.objects.create(
            budget=budget,
            **validated_data
        )
