from django.shortcuts import render
from django.contrib.auth.models import User
import volunteers
from rest_framework import viewsets
from api.serializers import UserSerializer, VolunteerSerializer

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
	
class VolunteerViewSet(viewsets.ModelViewSet):
    queryset = volunteers.models.Volunteer.objects.all()
    serializer_class = VolunteerSerializer
