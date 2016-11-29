import django_filters
from django.db.models import Sum, When, Case, IntegerField
from django.shortcuts import get_object_or_404
from django_filters import widgets
from rest_framework import viewsets, views, filters #, status
from rest_framework.decorators import detail_route, list_route
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

import api.email as mailer
from .models import Volunteer, Assignment
from .serializers import VolunteerSerializer, AdminVolunteerSerializer, AdminAssignmentSerializer, AssignmentSerializer


class VolunteerFilter(filters.FilterSet):
    language = django_filters.CharFilter(name="languages__language_name")
    can_write = django_filters.BooleanFilter(name="languages__can_written_translate")
    first_name = django_filters.CharFilter(name="first_name", lookup_type="icontains")
    last_name = django_filters.CharFilter(name="last_name", lookup_type="icontains")

    class Meta:
        model = Volunteer
        fields = ('first_name', 'last_name', 'language', 'can_write', 'volunteer_level')

class AssignmentFilter(filters.FilterSet):
    unassigned = django_filters.MethodFilter(widget=widgets.BooleanWidget())
    name = django_filters.CharFilter(name='name', lookup_type='icontains')
    start_date_starting_at = django_filters.DateTimeFilter(name="start_date", lookup_type=('gte'))
    start_date_ending_at = django_filters.DateTimeFilter(name="start_date", lookup_type=('lte'))

    class Meta:
        model = Assignment
        fields = ('name', 'type', 'status', 'language_name', 'start_date', 'unassigned')

    def filter_unassigned(self, queryset, value):
        if value:
            return queryset.filter(volunteers=None).distinct()
        return queryset.distinct()

class NotificationView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        subject = request.data.get("subject", "No subject")
        message = request.data.get("message", "No message")
        emailList = request.data.get("emails", [{"id":1,"email":"cs4500bha@gmail.com"},])
        textList = request.data.get("texts", [])
        for text in textList:
            mailer.send_text(text['carrier'], text['phoneNumber'], subject, message)
        for mail in emailList:
            mailer.send_email(mail['email'], subject, message)
        return Response({"success": True})

class VolunteerViewSet(viewsets.ModelViewSet):
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = VolunteerFilter

    def _extract_hour_summation_filters(self):
        sum_conditions = {'assignments__status': 2}
        if 'hours_starting_at' in self.request.query_params:
            sum_conditions['assignments__start_date__gte'] = self.request.query_params['hours_starting_at']
        if 'hours_ending_at' in self.request.query_params:
            sum_conditions['assignments__start_date__lte'] = self.request.query_params['hours_ending_at']
        if 'language' in self.request.query_params:
            sum_conditions['assignments__language_name'] = self.request.query_params['language']
        return sum_conditions

    def get_queryset(self):
        return Volunteer.objects.annotate(
            hours=Sum(Case(
                When(then='assignments__duration', **self._extract_hour_summation_filters()),
                default=0,
                output_field=IntegerField()
            ))
        ).distinct()

    @list_route(permission_classes=[IsAuthenticated])
    def me(self, request, *args, **kwargs):
        volunteer = get_object_or_404(self.get_queryset(), user_id=request.user.id)
        serializer = self.get_serializer(volunteer, context={'request': request})
        return Response(serializer.data)

    @detail_route(methods=['get'])
    def assignments(self, request, *args, **kwargs):
        volunteer = get_object_or_404(self.get_queryset(), id=int(kwargs['pk']))
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

        # Send confirmation email
        name = volunteer.first_name + " " + volunteer.last_name
        mailer.send_volunteer_added_assignment(volunteer.contact, name)

        return Response({'success': 'volunteer added to assignment'})

    @detail_route(methods=['post'])
    def remove_volunteer(self, request, pk=None):
        assignment = get_object_or_404(Assignment, id=pk)
        volunteer = get_object_or_404(Volunteer, id=request.data['volunteer_id'])
        assignment.volunteers.remove(volunteer)
        assignment.save()

        # Send confirmation email
        name = volunteer.first_name + " " + volunteer.last_name
        mailer.send_volunteer_removed_assignment(volunteer.contact, name)

        return Response({'success': 'volunteer removed from assignment'})

class ReferralViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def create(self, request):
        friend_email = request.data['friend']

        volunteer = get_object_or_404(Volunteer, user_id=request.user.id)
        full_name = "{} {}".format(volunteer.first_name, volunteer.last_name)
        user_email = request.user.email

        mailer.send_referral(friend_email,
                             full_name,
                             user_email,
                             "{}?referrer={}".format(request.build_absolute_uri("/login"),
                                                     user_email))

        return Response({'status': 'Referral Sent'})
