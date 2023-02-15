import re
import pytest

from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework.test import APIClient

from .models import Skill


@pytest.mark.django_db
def test_user_create():
    User.objects.create_user(  # type: ignore
        "john", "lennon@thebeatles.com", "johnpassword"
    )

    assert User.objects.count() == 1


@pytest.mark.django_db
def test_create_user_without_password(api_client: APIClient):
    url = reverse("user-list")
    data = {
        "username": "foo",
        "email": "foo@example.com",
        "first_name": "foo",
        "last_name": "bar",
    }
    response = api_client.post(url, data)

    assert response.status_code == 201
    assert data["username"] == response.data.get("username")


@pytest.mark.django_db
def test_get_a_user(api_client: APIClient, create_user):
    user: User = create_user(username="foo")
    url = reverse("user-detail", kwargs={"pk": user.pk})
    response = api_client.get(url)

    assert response.status_code == 200


@pytest.mark.django_db
def test_update_user_details(api_client: APIClient, create_user):
    username = "foo"
    user: User = create_user(username=username)
    url = reverse("user-detail", kwargs={"pk": user.pk})
    response = api_client.get(url)

    assert response.status_code == 200
    assert response.data["email"] == username + "@example.com"

    email = "bar@example.com"
    response = api_client.put(url, {"email": email}, format="json")

    assert response.data["email"] == email


@pytest.mark.django_db
def test_delete_a_user(api_client: APIClient, create_user):
    username = "foo"
    user: User = create_user(username=username)
    for _ in range(3):
        create_user()

    assert User.objects.all().count() == 4

    url = reverse("user-detail", kwargs={"pk": user.pk})
    response = api_client.delete(url)

    assert response.status_code == 204
    assert User.objects.all().count() == 3


@pytest.mark.django_db
def test_add_a_skill_to_user(api_client: APIClient, create_user):
    user: User = create_user(username="foo")
    url = reverse("user-detail", kwargs={"pk": user.pk})
    data = {
        "skills": [
            "python",
        ]
    }
    response = api_client.put(url, data, format="json")

    assert response.status_code == 200
    assert response.data["skills"] == data["skills"]


@pytest.mark.django_db
def test_remove_a_skill_from_user(api_client: APIClient, create_user):
    user: User = create_user(username="foo")
    url = reverse("user-detail", kwargs={"pk": user.pk})
    data = {"skills": ["python", "java"]}
    response = api_client.put(url, data, format="json")

    response.data["skills"].sort()
    data["skills"].sort()

    assert response.status_code == 200
    assert response.data["skills"] == data["skills"]

    # Remove the skill "java"
    data = {
        "skills": [
            "python",
        ]
    }
    response = api_client.put(url, data, format="json")

    assert response.status_code == 200
    assert response.data["skills"] == data["skills"]


@pytest.mark.django_db
def test_can_not_add_duplicate_skill_to_a_user(api_client: APIClient, create_user):
    assert Skill.objects.all().count() == 0

    user: User = create_user(username="foo")
    url = reverse("user-detail", kwargs={"pk": user.pk})
    data1 = {"skills": ["python", "java"]}
    response = api_client.put(url, data1, format="json")

    response.data["skills"].sort()
    data1["skills"].sort()

    assert response.status_code == 200
    assert response.data["skills"] == data1["skills"]
    assert Skill.objects.all().count() == len(data1["skills"])

    # add duplicate skill "python"
    data2 = {"skills": ["python", "java", "python"]}
    response = api_client.put(url, data2, format="json")

    response.data["skills"].sort()
    data2["skills"].sort()

    assert response.status_code == 200
    assert response.data["skills"] != data2["skills"]
    assert response.data["skills"] == data1["skills"]
    assert Skill.objects.all().count() != len(data2["skills"])
    assert Skill.objects.all().count() == len(data1["skills"])


@pytest.mark.django_db
def test_get_all_users(api_client: APIClient, create_user):
    user_names = ["foo", "bar", "baz", "django"]
    for i in user_names:
        create_user(username=i)
    url = reverse("user-list")
    response = api_client.get(url)

    assert response.status_code == 200
    assert len(response.data) == len(user_names)
    assert response.data[0]["username"] in user_names


@pytest.mark.django_db
def test_get_all_users_by_username(api_client: APIClient, create_user):
    user_names = ["foo", "bar", "baz", "django"]
    for i in user_names:
        create_user(username=i)
    url = reverse("user-list")
    search_query = "ba"
    response = api_client.get(url + "?username=" + search_query)
    filter_user_names = [
        name for name in user_names if re.search(search_query, name, re.IGNORECASE)
    ]

    assert response.status_code == 200
    assert len(response.data) == len(filter_user_names)
    assert response.data[0].get("username") in filter_user_names


@pytest.mark.django_db
def test_get_all_users_by_firstname(api_client: APIClient, create_user):
    user_names = ["foo", "bar", "baz", "django"]
    for i in user_names:
        create_user(username=i)
    url = reverse("user-list")
    search_query = "ba"
    response = api_client.get(url + "?firstname=" + search_query)
    filter_first_names = [
        name + "_first"
        for name in user_names
        if re.search(search_query, name + "_first", re.IGNORECASE)
    ]

    assert response.status_code == 200
    assert len(response.data) == len(filter_first_names)
    assert response.data[0].get("first_name") in filter_first_names


@pytest.mark.django_db
def test_get_all_users_by_email(api_client: APIClient, create_user):
    user_names = ["foo", "bar", "baz", "django"]
    for i in user_names:
        create_user(username=i)
    url = reverse("user-list")
    search_query = "ba"
    response = api_client.get(url + "?email=" + search_query)
    filter_email = [
        name + "@example.com"
        for name in user_names
        if re.search(search_query, name + "_first", re.IGNORECASE)
    ]

    assert response.status_code == 200
    assert len(response.data) == len(filter_email)
    assert response.data[0].get("email") in filter_email


@pytest.mark.django_db
def test_get_all_users_by_skill(api_client: APIClient, create_user):
    user_names = ["foo", "bar", "baz", "django"]
    for i in user_names:
        create_user(username=i)
    url = reverse("user-list")
    search_query = "ba"
    response = api_client.get(url + "?skill=" + search_query)

    assert response.status_code == 200
    assert len(response.data) == 0

    # Add skill to users
    users = api_client.get(url)

    url = reverse("user-detail", kwargs={"pk": users.data[0].get("id")})
    data = {"skills": ["python", "typescript"]}
    response = api_client.put(url, data, format="json")

    url = reverse("user-detail", kwargs={"pk": users.data[1].get("id")})
    data = {"skills": ["python"]}
    response = api_client.put(url, data, format="json")

    url = reverse("user-detail", kwargs={"pk": users.data[2].get("id")})
    data = {"skills": ["typescript", "javascript"]}
    response = api_client.put(url, data, format="json")

    # Get users by skill
    url = reverse("user-list")
    search_query = "python"
    response = api_client.get(url + "?skill=" + search_query)

    assert response.status_code == 200
    assert len(response.data) == 2

    url = reverse("user-list")
    search_query = "java"
    response = api_client.get(url + "?skill=" + search_query)

    assert response.status_code == 200
    assert len(response.data) == 1
