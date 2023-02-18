from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from .serializers import UserSerializer
from .utils import get_users_by_query_filter
from .pagination import Pagination


@api_view(["GET", "POST"])
def user_list(request: Request, format=None) -> Response:
    """
    List all users with query filter or Create new user
    """
    if request.method == "GET":
        paginator = Pagination()
        users = get_users_by_query_filter(request.query_params)
        result_page = paginator.paginate_queryset(users, request)

        serializer = UserSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    if request.method == "POST":
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def user_detail(request: Request, pk: int, format=None) -> Response:
    """
    Retrieve user or Update user with skills
    """
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = UserSerializer(user)
        return Response(serializer.data)

    # Editing user with skills add/remove to them
    if request.method == "PUT":
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            # add skill_list for add/remove skills
            serializer.save(skill_list=request.data.get("skills"))
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response(status=status.HTTP_400_BAD_REQUEST)
