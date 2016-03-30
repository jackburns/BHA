from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Volunteer


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')

class VolunteerSerializer(serializers.Serializer):
	class Meta:
		model = Volunteer
		fields = ('user', 'first_name', 'last_name', 'middle_name','birthday',
                  'sex', 'role', 'volunteer_level', 'created_at', 'deleted_at',
                  'notes', 'inactive', 'availability', 'contact', 'hours')