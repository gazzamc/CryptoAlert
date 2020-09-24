from django.contrib import admin
from .models import Alert, AlertType

admin.site.register(Alert)
admin.site.register(AlertType)
