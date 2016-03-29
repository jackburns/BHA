from django.contrib import admin
from .models import Volunteer, Availability

# Register your models here.
class VolunteerAdmin(admin.ModelAdmin):
    pass
admin.site.register(Volunteer, VolunteerAdmin)

class AvailabilityAdmin(admin.ModelAdmin):
    pass
admin.site.register(Availability, AvailabilityAdmin)