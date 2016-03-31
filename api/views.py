from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets #, status
from .models import Volunteer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import VolunteerSerializer, UserSerializer

# from rest_framework.decorators import api_view
# from rest_framework.response import Response

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class VolunteerViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    queryset = Volunteer.objects.all()

    model = Volunteer
    serializer_class = VolunteerSerializer

    def list(self, request):
        queryset = Volunteer.objects.all()
        serializer = VolunteerSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        if request.user and pk == 'me':
            print(vars(request.user))
            volunteer = Volunteer.objects.get(request.user.id)
            Response(VolunteerSerializer(volunteer).data)
        return super(VolunteerViewSet, self).retrieve(request, pk)


# @api_view(['GET', 'POST'])
# def volunteer_list(request, format=None):
	# if request.method == 'GET':
		# volunteers = Volunteer.objects.all()
		# serializer = VolunteerSerializer(volunteers, many=True)
		# return Response(serializer.data)

	# elif request.method == 'POST':
		# serializer = VolunteerSerializer(data=request.data)
		# if serializer.is_valid():
			# serializer.save()
			# return Response(serializer.data, status=status.HTTP_201_CREATED)
		# return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET', 'PUT', 'DELETE'])
# def volunteer_detail(request, pk, format=None):
    # """
    # Retrieve, update or delete a volunteer instance.
    # """
    # try:
        # volunteer = Volunteer.objects.get(pk=pk)
    # except Volunteer.DoesNotExist:
        # return Response(status=status.HTTP_404_NOT_FOUND)

    # if request.method == 'GET':
        # serializer = VolunteerSerializer(volunteer)
        # return Response(serializer.data)

    # elif request.method == 'PUT':
        # serializer = VolunteerSerializer(volunteer, data=request.data)
        # if serializer.is_valid():
            # serializer.save()
            # return Response(serializer.data)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # elif request.method == 'DELETE':
        # volunteer.delete()
        # return Response(status=status.HTTP_204_NO_CONTENT)
