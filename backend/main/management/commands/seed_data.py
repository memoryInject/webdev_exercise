import random

from django.db import transaction
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

from main.models import Skill
from main.factories import UserFactory, SkillFactory


NUM_USERS = 10
NUM_SKILLS = 20
USERS_PER_SKILL = 2


class Command(BaseCommand):
    help = "Generates test data"

    @transaction.atomic
    def handle(self, *args, **kwargs):
        print("Data seeding started...")
        # Try to build a superuser
        try:
            # Create a superuser
            admin = User.objects.create_superuser(
                username="admin", email="admin@example.com"
            )
            admin.set_password("1234")
            admin.save()
        except Exception as e:
            print("Admin user already exists in the database!")

        # Create all the users
        people = []
        for _ in range(NUM_USERS):
            person = UserFactory()
            people.append(person)

        # Add some users to skill
        for _ in range(NUM_SKILLS):
            users = random.choices(people, k=USERS_PER_SKILL)
            SkillFactory.create(users=users)
        print("Data seeding completed.")
