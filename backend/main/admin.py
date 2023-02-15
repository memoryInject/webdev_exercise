from django.contrib import admin
from django.contrib.auth.models import User

from .models import Skill


class WebUser(User):
    class Meta:
        proxy = True
        verbose_name = "User"
        verbose_name_plural = "Users"


class WebSkill(Skill):
    class Meta:
        proxy = True
        verbose_name = "Skill"
        verbose_name_plural = "Skills"


class UserAdmin(admin.ModelAdmin):
    search_fields = ("username", "email", "first_name")


class SKillAdmin(admin.ModelAdmin):
    search_fields = ("skill_name",)


admin.site.register(WebUser, UserAdmin)
admin.site.register(WebSkill, SKillAdmin)
