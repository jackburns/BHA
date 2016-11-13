from contextlib import contextmanager

from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient

default_username = 'foo@bar.com'
default_password = 'password'

class ApiEndpointsTests(TestCase):
    def setUp(self):
        self.c = APIClient()
        self.user = self.signup(default_username, default_password)
        self.auth_token = self.login(default_username, default_password)
        self.c.credentials(HTTP_AUTHORIZATION='Token ' + self.auth_token)

    def get_user_signup_form_data(self, username, password, **kwargs):
        return dict({
            'password': password,
            'first_name': 'Foo',
            'last_name': 'Barman',
            'middle_name': 'Qux',
            'organization': 'Northeastern',
            'age': '22',
            'contact': {
                'street': '12 Washington St.',
                'city': 'Boston',
                'state': 'MA',
                'zip': '02115',
                'email': username,
                'phone_number': '8824567732',
                'carrier': '2',
                'preferred_contact': '0'
            },
            'languages': [{
                'can_written_translate': False,
                'language_name': 'da'
            }],
            'bha_app_res': False,
            'availability': [{
                'day': 0,
                'start_time': '09:30:00',
                'end_time': '12:30:00'
            }],
            'notes': ""
        }, **kwargs)

    def signup(self, username, password, **kwargs):
        singup_json = self.get_user_signup_form_data(username, password, **kwargs)
        signup_response = self.c.post('/api/volunteers/', singup_json, format='json')
        self.assertEqual(signup_response.status_code, 201)
        return User.objects.get(username=username)

    def login(self, username, password):
        login_response = self.c.post('/api/auth/login/', {
            'username': username,
            'password': password
        })
        self.assertEqual(login_response.status_code, 200)
        return login_response.data['key']

    def test_update_volunteer(self):
        self.assertEqual(self.user.volunteer.age, 22)
        patch = dict(self.get_user_signup_form_data(self.user.username, self.user.password))
        patch['age'] = 24
        response = self.c.patch('/api/volunteers/%d/' % self.user.id, patch, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.c.get('/api/volunteers/me/')
        self.assertEqual(response.data['age'], 24)

    def test_get_empty_volunteers(self):
        response = self.c.get('/api/volunteers/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['count'], 1)
        self.assertIn('first_name', response.json()['results'][0])

    def test_get_volunteers(self):
        self.signup('bar@baz.com', 'password', first_name='Bar', last_name='Quxdale')
        response = self.c.get('/api/volunteers/').json()
        self.assertEqual(response['count'], 2)
        self.assertIn('bar@baz.com', str(response['results']))
        self.assertIn(default_username, str(response['results']))

    def test_filter_volunteers(self):
        self.signup(
            'bar@baz.com', 'password',
            first_name='Bar', last_name='Quxdale',
            languages=[{
                'can_written_translate': True,
                'language_name': 'en'
            }]
        )
        # Filter on first name
        resp = self.c.get('/api/volunteers/', data={
            'first_name': 'Bar'
        }).json()
        self.assertEqual(resp['count'], 1)
        self.assertIn('bar@baz.com', str(resp['results'][0]))
        # Filter on language
        resp = self.c.get('/api/volunteers/', data={
            'can_write': True
        }).json()
        self.assertEqual(resp['count'], 1)
        self.assertIn('bar@baz.com', str(resp['results'][0]))
        resp = self.c.get('/api/volunteers/', data={
            'can_write': False
        }).json()
        self.assertEqual(resp['count'], 1)
        self.assertIn(default_username, str(resp['results'][0]))

    def test_get_empty_assignments(self):
        response = self.c.get('/api/volunteers/me/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['assignments'], [])

    def test_admin(self):
        response = self.c.get('/admin/login/')
        self.assertEqual(response.status_code, 200)

    # Behaviour Expected:
    # Ignores invalid input, keeps current valid input
    def test_state_restriction_states_invalid_state(self):
        patch1 = dict(self.get_user_signup_form_data(self.user.username, self.user.password))
        patch1['contact'] = {
            'street': '12 Washington St.',
            'city': 'Boston',
            'state': 'MQ',
            'zip': '02115',
            'email': self.user.username,
            'phone_number': '8824567732',
            'carrier': '2',
            'preferred_contact': '0'
        }
        response = self.c.patch('/api/volunteers/%d/' % self.user.id, patch1, format='json')
        response = self.c.get('/api/volunteers/me/')
        self.assertEqual(self.user.volunteer.contact.state, 'MA')

    # Behaviour Expected:
    # Ignores invalid length input, keeps current valid input
    def test_state_restriction_states_invalid_length(self):
        patch1 = dict(self.get_user_signup_form_data(self.user.username, self.user.password))
        patch1['contact'] = {
            'street': '12 Washington St.',
            'city': 'Boston',
            'state': 'KYZ',
            'zip': '02115',
            'email': self.user.username,
            'phone_number': '8824567732',
            'carrier': '2',
            'preferred_contact': '0'
        }
        response = self.c.patch('/api/volunteers/%d/' % self.user.id, patch1, format='json')
        response = self.c.get('/api/volunteers/me/')
        self.assertEqual(self.user.volunteer.contact.state, 'MA')

    # Behaviour Expected:
    # Keeps old zip if length of 5 exceeded
    def test_zip_invalid_length_too_long(self):
        patch1 = dict(self.get_user_signup_form_data(self.user.username, self.user.password))
        patch1['contact'] = {
            'street': '12 Washington St.',
            'city': 'Boston',
            'state': 'MA',
            'zip': '021135',
            'email': self.user.username,
            'phone_number': '8824567732',
            'carrier': '2',
            'preferred_contact': '0'
        }
        response = self.c.patch('/api/volunteers/%d/' % self.user.id, patch1, format='json')
        response = self.c.get('/api/volunteers/me/')
        self.assertEqual(self.user.volunteer.contact.zip, '02115')
