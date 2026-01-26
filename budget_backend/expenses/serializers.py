from django.utils import timezone
from rest_framework import serializers
from .models import Category, Expense, get_uncategorized_spending



class CategorySerializer(serializers.ModelSerializer):
    spent_amount = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        read_only=True
    )
    remaining_amount = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        read_only=True
    )
    is_over_spent = serializers.BooleanField(read_only=True)

    class Meta:
        model = Category
        fields = [
            'id',
            'category_name',
            'month',
            'allocated_amount',
            'spent_amount',
            'remaining_amount',
            'is_over_spent',
        ]


class ExpenseSerializer(serializers.ModelSerializer):
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        required=False,
        allow_null=True,
        write_only=True
    )

    class Meta:
        model = Expense
        fields = ['expense_name', 'amount', 'date', 'category_id']

    def create(self, validated_data):
        user = self.context['request'].user
        category = validated_data.pop('category_id', None)
        date = validated_data.get('date', timezone.now().date())

        if category is None:
            category = get_uncategorized_spending(user, date)

        print('serializer validated data',category, validated_data)
        return Expense.objects.create(
            category=category,
            **validated_data
        )
