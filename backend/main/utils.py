from django.contrib.auth.models import User
from django.db.models import QuerySet
from django.http import QueryDict


def get_users_by_query_filter(query_params: QueryDict) -> QuerySet[User]:
    queries = {
        "username": query_params.get("username"),
        "first_name": query_params.get("firstname"),
        "email": query_params.get("email"),
        "skill": query_params.get("skill"),
    }

    match_criteria = "icontains" if not query_params.get("exact") else "iexact"

    # Get all users by defalult exclude admin users
    users = User.objects.all().exclude(is_superuser=True)

    # Filter users by queries
    for key, val in queries.items():
        if key == "skill" and val:
            users = users.filter(**{f"skills__skill_name__{match_criteria}": val})
        elif val:
            users = users.filter(**{f"{key}__{match_criteria}": f"{val}"})

    return users.distinct().order_by('id')
