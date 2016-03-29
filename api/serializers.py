from django.contrib.auth.models import User, Group
import volunteers
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')

class VolunteerSerializer(serializers.Serializer):
	class Meta:
		model = volunteers.models.Volunteer
		fields = ('user', 'first_name', 'last_name')