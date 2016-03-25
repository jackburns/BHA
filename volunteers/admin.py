from django.contrib import admin
from .models import Volunteer

# Register your models here.
class VolunteerAdmin(admin.ModelAdmin):
    pass
admin.site.register(Volunteer, VolunteerAdmin)
