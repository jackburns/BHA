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
        fields = ('first_name', 'last_name', 'language', 'can_write', 'volunteer_level')

class AssignmentFilter(filters.FilterSet):
    unassigned = django_filters.MethodFilter()

    class Meta:
        model = Assignment
        fields = ('name', 'type', 'status', 'language_name', 'unassigned')

    def filter_unassigned(self, queryset, value):
        if value:
            return queryset.filter(volunteers=None)
        return queryset

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
        volunteer = get_object_or_404(Volunteer, user_id=request.user.id)
        serializer = self.get_serializer(volunteer, context={'request': request})
        return Response(serializer.data)

    @detail_route(methods=['get'])
    def assignments(self, request, *args, **kwargs):
        volunteer = get_object_or_404(Volunteer, id=int(kwargs['pk']))
        assignments = Assignment.objects.filter(volunteers=volunteer)
        serializer = AssignmentSerializer(assignments, context={'request': request}, many=True)
        return Response(serializer.data)

    def get_permissions(self):
        # allow non-authenticated user to create via POST
        return (AllowAny() if self.request.method == 'POST'
                else IsAuthenticated()),

    def get_serializer_class(self):
        if (self.request.user.is_superuser):
            return AdminVolunteerSerializer
        return VolunteerSerializer

class AssignmentViewSet(viewsets.ModelViewSet):
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = AssignmentFilter

    def get_queryset(self):
        me = get_object_or_404(Volunteer, user_id=self.request.user.id)
        # If volunteers are verified but not trained, only return training assignments
        if not self.request.user.is_superuser and me.volunteer_level < 2:
            return Assignment.objects.filter(type=2)
        else:
            return Assignment.objects.all()

    def get_permissions(self):
        return (IsAuthenticated()),

    def get_serializer_class(self):
        if (self.request.user.is_superuser):
            return AdminAssignmentSerializer
        return AssignmentSerializer

    @detail_route(methods=['post'])
    def add_volunteer(self, request, pk=None):
        assignment = get_object_or_404(Assignment, id=pk)
        volunteer = get_object_or_404(Volunteer, id=request.data['volunteer_id'])
        assignment.volunteers.add(volunteer)
        assignment.save()

        return Response({'success': 'volunteer added to assignment'})

    @detail_route(methods=['post'])
    def remove_volunteer(self, request, pk=None):
        assignment = get_object_or_404(Assignment, id=pk)
        volunteer = get_object_or_404(Volunteer, id=request.data['volunteer_id'])
        assignment.volunteers.remove(volunteer)
        assignment.save()

        return Response({'success': 'volunteer removed from assignment'})
