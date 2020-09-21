"""
    Code sourced from repo:
    https://gist.github.com/andreagrandi/14e07afd293fafaea770f69cf66cac14

"""

from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        else:
            return request.user.is_staff
