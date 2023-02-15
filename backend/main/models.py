from django.db import models
from django.contrib.auth.models import User


class Skill(models.Model):
    skill_name = models.CharField(max_length=200, unique=True)
    users = models.ManyToManyField(User, related_name="skills")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.skill_name
