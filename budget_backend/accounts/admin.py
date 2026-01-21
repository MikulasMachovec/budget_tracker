from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    # The fields to be used in displaying the User model.
    # These help you see more info in the list view.
    list_display = ('id','email', 'username', 'first_name', 'last_name', 'is_staff', 'is_admin')
    
    # Fields to filter by in the right sidebar
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'is_admin')
    
    # Fields to search by
    search_fields = ('email', 'username')
    ordering = ('email',)

    readonly_fields = ('date_joined', 'last_login')

    # This controls how the "Edit User" page looks
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'username', 'profile_picture', 'provider')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'is_admin', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    # This controls the "Add User" form
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'first_name', 'last_name', 'password'),
        }),
    )

admin.site.register(User, CustomUserAdmin)