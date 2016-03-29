from .models import Volunteer

from rest_framework import serializers


class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = ('user', 'first_name', 'last_name', 'middle_name','birthday',
                  'sex', 'role', 'volunteer_level', 'created_at', 'deleted_at',
                  'notes', 'inactive', 'availability', 'contact', 'hours')