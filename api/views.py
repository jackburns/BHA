import django_filters
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from rest_framework.decorators import detail_route, list_route
from rest_framework import viewsets, views, filters #, status
from .models import Volunteer, Assignment
from .email import process_notification
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from .serializers import VolunteerSerializer, UserSerializer, AdminVolunteerSerializer, AdminAssignmentSerializer, AssignmentSerializer


class VolunteerFilter(filters.FilterSet):
    language = django_filters.CharFilter(name="languages__language_name")
    can_write = django_filters.CharFilter(name="languages__can_written_translate")

    class Meta:
	    model = Volunteer
	    fields = ('first_name', 'last_name', 'language', 'can_write')

class NotificationView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        subject = request.data.get("subject", "No subject")
        message = request.data.get("message", "No message")
        emailList = request.data.get("emails", [{"id":1,"email":"cs4500bha@gmail.com"},])
        textList = request.data.get("texts", [])
        process_notification(subject, message, emailList, textList)
        return Response({"success": True})

class VolunteerViewSet(viewsets.ModelViewSet):
    queryset = Volunteer.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VolunteerFilter

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
        # if (self.request.user.is_staff):
        #     return AdminVolunteerSerializer
        return VolunteerSerializer

class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()

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
