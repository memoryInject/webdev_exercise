import factory

from factory.django import DjangoModelFactory
from django.contrib.auth.models import User
from .models import Skill


# Defining a factory
class UserFactory(DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ("username",)

    username = factory.Faker("first_name")
    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    email = factory.Faker("email")
    password = factory.PostGenerationMethodCall("set_password", "password1234")


class SkillFactory(DjangoModelFactory):
    class Meta:
        model = Skill
        django_get_or_create = ("skill_name",)

    skill_name = factory.Faker("job")

    @factory.post_generation
    def users(self, create, extracted, **kwargs):
        if not create or not extracted:
            # Simple build, or nothing to add, do nothing.
            return

        # Add the iterable of users using bulk addition
        self.users.add(*extracted)  # type: ignore
