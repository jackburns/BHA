from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from rest_framework.decorators import detail_route, list_route
from rest_framework import viewsets #, status
from .models import Volunteer, Assignment, VolunteersInAssignment
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from .serializers import VolunteerSerializer, UserSerializer, AdminVolunteerSerializer


class VolunteerViewSet(viewsets.ModelViewSet):
    queryset = Volunteer.objects.all()

    @list_route(permission_classes=[IsAuthenticated])
    def me(self, request, *args, **kwargs):
        self.object = get_object_or_404(Volunteer, user_id=request.user.id)
        serializer = self.get_serializer(self.object, context={'request': request})
        return Response(serializer.data)

    def get_permissions(self):
        # allow non-authenticated user to create via POST
        return (AllowAny() if self.request.method == 'POST'
                else IsAuthenticated()),

    def get_serializer_class(self):
        if (self.request.user.is_staff):
            return AdminVolunteerSerializer
        return VolunteerSerializer

class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignments.objects.all()

    def get_serializer_class(self):
        if (self.request.user.is_staff):
            return AdminAssignmentSerializer
        return AssignmentSerializer

    @detail_route(methods=['post'])
    def add_volunteer(self, request, pk=None):
        assignment = get_object_or_404(Assignment, id=pk)
        volunteer = get_object_or_404(Volunteer, id=request.data.volunteer_id)
        assignment.volunteers.add(volunteer)
        assignment.save()

        return({'response': 'volunteer added to assignment'})


    @detail_route(methods=['post'])
    def remove_volunteer(self, request, pk=None):
        assignment = get_object_or_404(Assignment, id=pk)
        volunteer = get_object_or_404(Volunteer, id=request.data.volunteer_id)
        assignment.volunteers.delete(volunteer)
        assignment.save()

        return({'response': 'volunteer removed from assignment'})
