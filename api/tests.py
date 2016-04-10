from django.test import TestCase
from rest_framework.test import APIRequestFactory
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from django.test.client import Client
from .models import Volunteer, Contact
from django.utils import timezone
from .serializers import purgeList


volunteer_jean = {
            "contact": {
                "street": "X Mansion",
                "city": "Westchester",
                "state": "NY",
                "zip": "12345",
                "phone_number": "1234567890",
                "email": "timothywright11@gmail.com",
                "preferred_contact": 0
            },
            "availability": [
                {
                    "day": 0,
                    "start_time": "09:30:00",
                    "end_time": "12:30:00"
                }
            ],
            "languages": [
                {
                    "can_written_translate": False,
                    "language_name": "da"
                }
            ],
            "id": 1,
            "first_name": "Jean",
            "last_name": "Grey",
            "sex": 1,
            "volunteer_level": 0,
            "inactive": False,
            "hours": 0,
            "notes": "",
            "user": {
                "id": 2,
                "username": "example@example.com",
                "is_staff": True
            }
}

class ApiEndpointsTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_superuser(username='username',
                                                  password='password',
                                                  email='example@example.com')
        self.user.save()
        self.c = Client()
        self.c.force_login(self.user)

    def test_basic_api(self):
        response = self.c.get("")
        self.assertEqual(response.status_code, 200)

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

    def create_contact(self):
        return Contact.objects.create(email="example@example.com",
                                      preferred_contact=1)

    def create_volunteer(self):
        return Volunteer.objects.create(first_name="John",
                                        last_name="Doe",
                                        sex=1,
                                        volunteer_level=1,
                                        created_at=timezone.now(),
                                        contact=self.create_contact())

    def test_volunteer(self):
        con = self.create_contact()
        vol = self.create_volunteer()
        self.assertTrue(isinstance(con, Contact))
        self.assertEqual(con.email, "example@example.com")
        self.assertTrue(isinstance(vol, Volunteer))
        self.assertEqual(vol.first_name, "John")
        self.assertEqual(vol.last_name, "Doe")
        self.assertEqual(vol.sex, 1)

    def test_contact(self):
        con = self.create_contact()
        self.assertTrue(isinstance(con, Contact))
        self.assertEqual(con.preferred_contact, 1)
        self.assertEqual(con.email, "example@example.com")

    def test_post(self):
        response = self.c.post("/api/volunteers/", "volunteer_jean object")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['count'], 1)

    def test_delete(self):
        response1 = self.c.post("/api/volunteers/", "add a volunteer object")
        response2 = self.c.post("/api/volunteers/", "delete a volunteer objects")
        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response2.status_code, 200)
        self.assertEqual(response1.json()['count'], response2.json()['count']+1)

    def test_update_volunteers(self):
        response = self.c.post("/api/volunteers/", "data-for-updating-a-volunteer")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['whatever_field'], "updated value")

    def test_purgeList(self):
        new_array = {'id':[1,2,3]}
        old_array = [{'id': 3}, {'id':2}, {'id':1}]
        purgeList(self, old_array, new_array)
        print(old_array)
        print(new_array)
        self.assertTrue(False)

