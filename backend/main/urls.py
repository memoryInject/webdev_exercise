from django.urls import path
from django.shortcuts import render
from rest_framework.urlpatterns import format_suffix_patterns
from .views import user_detail, user_list


def render_api_doc(request):
    return render(request, "index.html")


urlpatterns = [
    path("users/", user_list, name="user-list"),
    path("users/<int:pk>/", user_detail, name="user-detail"),
    path("docs/", render_api_doc),
]

urlpatterns = format_suffix_patterns(urlpatterns)
