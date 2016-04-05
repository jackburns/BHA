from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from rest_framework.decorators import detail_route, list_route
from rest_framework import viewsets, filters #, status
from .models import Volunteer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from .serializers import VolunteerSerializer, UserSerializer, AdminVolunteerSerializer


class VolunteerViewSet(viewsets.ModelViewSet):
    queryset = Volunteer.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('first_name', 'last_name', 'languages__language_name', 'languages__can_written_translate')

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
