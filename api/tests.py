from django.test import TestCase
from rest_framework.test import APIRequestFactory
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from django.test.client import Client
import json

# Using the standard RequestFactory API to create a form POST request
factory = APIRequestFactory()
request = factory.get('/api/volunteers/',  format='json')

class ApiEndpointsTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_superuser(username='username',
                                                  password='password',
                                                  email='example@example.com')
        self.user.save()
        self.c = Client()
        self.c.force_login(self.user)

    def test_get_empty_volunteers(self):
        response = self.c.get("/api/volunteers/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['count'], 0)
        self.assertEqual(response.json()['results'], [])

    def test_get_empty_assignments(self):
        response = self.c.get("/api/assignments/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['count'], 0)
        self.assertEqual(response.json()['results'], [])

    def test_admin(self):
        response = self.c.get("/admin/")
        self.assertEqual(response.status_code, 200)

"""
from .models import Volunteer
from django.utils import timezone
from django.core.urlresolvers import reverse

# models test
class WhateverTest(TestCase):

    def create_volunteer(self, title="only a test", body="yes, this is only a test"):
        return Volunteer.objects.create(first_name="John",
                                        last_name="Doe",
                                        sex=1,
                                        created_at=timezone.now())

    def test_whatever_creation(self):
        v = self.create_volunteer()
        self.assertTrue(isinstance(v, Volunteer))
        self.assertEqual(v.first_name, "John")
        response = self.client.get('/api/volunteers/')
        print(response)
        self.assertEqual(response.status_code, 200)
"""