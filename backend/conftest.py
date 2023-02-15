import uuid
import pytest


@pytest.fixture
def api_client():
    from rest_framework.test import APIClient

    return APIClient()


@pytest.fixture
def create_user(db, django_user_model):
    def make_user(**kwargs):
        kwargs["password"] = "password123"
        if "username" not in kwargs:
            kwargs["username"] = str(uuid.uuid4())

        kwargs["first_name"] = f"{kwargs['username']}_first"
        kwargs["last_name"] = f"{kwargs['username']}_last"
        kwargs["email"] = f"{kwargs['username']}@example.com"
        return django_user_model.objects.create_user(**kwargs)

    return make_user
