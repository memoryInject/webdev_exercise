import math

from typing import TypedDict

from django.db.models import QuerySet

from rest_framework import pagination
from rest_framework.response import Response
from rest_framework.exceptions import NotFound


class QueryParams(TypedDict):
    previous: str | None
    next: str | None


class Links(TypedDict):
    previous: str | None
    next: str | None


class Page(TypedDict):
    invalid: bool
    size: int | None
    total: int | None
    count: int
    current: int
    previous: int | None
    next: int | None


class PageInfo(TypedDict):
    count: int
    page: Page
    query_params: QueryParams
    links: Links


class Pagination(pagination.PageNumberPagination):
    def paginate_queryset(self, queryset: QuerySet, request, view=None):
        """
        !Polymorphic method, it does not raise exception, just return empty[].
        """

        try:
            self.invalid_page = False
            return super().paginate_queryset(queryset, request)
        except NotFound:
            page_size = self.get_page_size(request)
            if not page_size:
                return None

            paginator = self.django_paginator_class(queryset, page_size)

            self.page = paginator.page(1)
            self.request = request
            self.invalid_page = True
            return []

    def get_page_info(self) -> PageInfo:
        count = self.page.paginator.count  # type: ignore
        page_size = self.page_size
        invalid_page = self.invalid_page or False

        total_pages = None
        next_page_number = None
        previous_page_number = None

        if count and page_size:
            total_pages = math.ceil(count / page_size)

        if self.page.has_next():  # type: ignore
            next_page_number = self.page.next_page_number()  # type: ignore
        if self.page.has_previous():  # type: ignore
            previous_page_number = self.page.previous_page_number()  # type: ignore

        current_page = int(
            self.get_page_number(self.request, self.page.paginator)  # type: ignore
        )

        next_query_param = (
            self.get_next_link().split("/")[-1][1:] if self.get_next_link() else None  # type: ignore
        )
        previous_query_param = (
            self.get_previous_link().split("/")[-1][1:]  # type: ignore
            if self.get_previous_link()
            else None
        )

        page_info: PageInfo = {
            "count": count,
            "page": {
                "invalid": invalid_page,
                "size": page_size,
                "count": count,
                "total": total_pages,
                "current": current_page,
                "next": next_page_number,
                "previous": previous_page_number,
            },
            "query_params": {
                "next": next_query_param,
                "previous": previous_query_param,
            },
            "links": {
                "next": self.get_next_link(),
                "previous": self.get_previous_link(),
            },
        }

        return page_info

    def get_paginated_response(self, data):
        return Response(
            {
                "pagination": self.get_page_info(),
                "results": data,
            }
        )
