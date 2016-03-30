from django.contrib import admin
from .models import Volunteer, Availability, Contact, Language

# Register your models here.
class VolunteerAdmin(admin.ModelAdmin):
    pass
admin.site.register(Volunteer, VolunteerAdmin)

class AvailabilityAdmin(admin.ModelAdmin):
    pass
admin.site.register(Availability, AvailabilityAdmin)

class ContactAdmin(admin.ModelAdmin):
    pass
admin.site.register(Contact, ContactAdmin)

class LanguageAdmin(admin.ModelAdmin):
    pass
admin.site.register(Language, LanguageAdmin)
