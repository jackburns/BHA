from contextlib import contextmanager

from django.contrib.auth.models import User
from django.test import TestCase, override_settings
from rest_framework.test import APIClient
from django.utils import timezone
from api.models import Volunteer
from django.db.models import Sum, Count
from django.core import mail
import pdb # Tracer
import api.email as mailer


default_username = 'foo@bar.com'
default_password = 'password'

# Override backend email server as to not send actual emails during tests
@override_settings(EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend')
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
        user = User.objects.get(username=username)
        if 'is_superuser' in kwargs:
            user.is_superuser = kwargs['is_superuser']
            user.save()
        return user

    def login(self, username, password):
        login_response = self.c.post('/api/auth/login/', {
            'username': username,
            'password': password
        })
        self.assertEqual(login_response.status_code, 200)
        return login_response.data['key']

    def get_assignment_form_data(self, data=None):
        return dict({
            "name": "Foo",
            "language_name": "az",
            "start_date": "2016-11-04T12:32:46.565Z",
            "type": "0",
            "notes": "",
            "admin_notes": "",
            "contact": {
                "street": "",
                "city": "",
                "state": "",
                "zip": "",
                "phone_number": "",
                "email": ""
            },
            "posted_by_id": self.user.id,
            "volunteers": [],
            "status": "0"
        }, **(data or {}))

    def create_assignment(self, data=None):
        form = self.get_assignment_form_data(data)
        response = self.c.post('/api/assignments/', form, format='json')
        self.assertEqual(response.status_code, 201)
        return response.json()

    def add_volunteer_to_assignment(self, assignment_id, volunteer_id):
        outbox_len = len(mail.outbox)
        response = self.c.post(
            '/api/assignments/{}/add_volunteer/'.format(assignment_id),
            data={'volunteer_id': volunteer_id},
            format='json'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(mail.outbox), outbox_len + 2)
        return response.json()

    def test_create_assignment(self):
        self.create_assignment()

    def test_update_volunteer(self):
        outbox_len = len(mail.outbox)
        self.assertEqual(self.user.volunteer.age, 22)
        patch = dict(self.get_user_signup_form_data(self.user.username, self.user.password))
        patch['age'] = 24
        patch['contact']['email'] += '.edu'
        response = self.c.patch('/api/volunteers/%d/' % self.user.id, patch, format='json')
        self.assertEqual(response.status_code, 200)
        response = self.c.get('/api/volunteers/me/')
        self.assertEqual(response.data['age'], 24)
        self.assertEqual(len(mail.outbox), outbox_len + 2)

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

    def test_get_my_assignments(self):
        response = self.c.get('/api/volunteers/me/')
        self.assertEqual(response.json()['assignments'], [])

        assignment = self.create_assignment()
        self.add_volunteer_to_assignment(assignment['id'], self.user.id)
        response = self.c.get('/api/volunteers/me/')
        self.assertEqual(response.json()['assignments'], [assignment['id']])

    def test_get_assignments(self):
        three_days_ago = (timezone.now() - timezone.timedelta(days=3)).strftime("%Y-%m-%d %H:%M:%S")
        three_days_in_the_future = (timezone.now() + timezone.timedelta(days=3)).strftime("%Y-%m-%d %H:%M:%S")
        four_days_in_the_future = (timezone.now() + timezone.timedelta(days=4)).strftime("%Y-%m-%d %H:%M:%S")
        now = timezone.now().strftime("%Y-%m-%d %H:%M:%S")

        assignment_1 = self.create_assignment({'status': 0, 'type': 2, 'start_date': three_days_ago, 'duration': 7})
        assignment_2 = self.create_assignment({'status': 2, 'type': 2, 'start_date': three_days_in_the_future, 'duration': 10})

        # Empty assignments
        response = self.c.get('/api/assignments/').json()
        self.assertEqual(len(response['results']), 2)
        self.assertIn("'id': {}".format(assignment_1['id']), str(response['results']))
        self.assertIn("'id': {}".format(assignment_2['id']), str(response['results']))

        # Date range
        response = self.c.get('/api/assignments/', data={'start_date_starting_at': now}).json()
        self.assertEqual(len(response['results']), 1)
        self.assertEqual(response['results'][0]['id'], assignment_2['id'])

        response = self.c.get('/api/assignments/', data={'start_date_starting_at': three_days_in_the_future}).json()
        self.assertEqual(len(response['results']), 1)
        self.assertEqual(response['results'][0]['id'], assignment_2['id'])

        response = self.c.get('/api/assignments/', data={'start_date_starting_at': four_days_in_the_future}).json()
        self.assertEqual(len(response['results']), 0)

        response = self.c.get('/api/assignments/', data={'start_date_ending_at': now}).json()
        self.assertEqual(len(response['results']), 1)
        self.assertEqual(response['results'][0]['id'], assignment_1['id'])

    def test_hours_automatically_updated(self):
        three_days_ago = (timezone.now() - timezone.timedelta(days=3)).strftime("%Y-%m-%d %H:%M:%S")
        three_days_in_the_future = (timezone.now() + timezone.timedelta(days=3)).strftime("%Y-%m-%d %H:%M:%S")
        four_days_in_the_future = (timezone.now() + timezone.timedelta(days=4)).strftime("%Y-%m-%d %H:%M:%S")
        now = timezone.now().strftime("%Y-%m-%d %H:%M:%S")

        assignment = self.create_assignment({'status': 2, 'start_date': three_days_ago, 'duration': 3})
        self.add_volunteer_to_assignment(assignment['id'], self.user.id)

        assignment = self.create_assignment({'status': 2, 'start_date': three_days_ago, 'duration': 7})
        self.add_volunteer_to_assignment(assignment['id'], self.user.id)

        assignment = self.create_assignment({'status': 0, 'start_date': three_days_ago, 'duration': 7})
        self.add_volunteer_to_assignment(assignment['id'], self.user.id)

        assignment = self.create_assignment({'status': 2, 'start_date': three_days_in_the_future, 'duration': 10})
        self.add_volunteer_to_assignment(assignment['id'], self.user.id)

        response = self.c.get('/api/volunteers/me/')
        self.assertEqual(response.json()['hours'], 20)

        response = self.c.get('/api/volunteers/')
        self.assertEqual(response.json()['results'][0]['hours'], 20)

        response = self.c.get('/api/volunteers/', {'hours_starting_at': now})
        self.assertEqual(response.json()['results'][0]['hours'], 10)

        response = self.c.get('/api/volunteers/', {'hours_starting_at': four_days_in_the_future})
        self.assertEqual(response.json()['results'][0]['hours'], 0)

    def test_emails(self):
        contact = self.user.volunteer.contact

        outbox_start_len = len(mail.outbox)
        mailer.send_volunteer_added_assignment(contact, 'Foo')
        self.assertEqual(len(mail.outbox), outbox_start_len + 2)
        self.assertIn('Foo', mail.outbox[-2].body)

        outbox_start_len = len(mail.outbox)
        mailer.send_volunteer_removed_assignment(contact, 'Foo')
        self.assertEqual(len(mail.outbox), outbox_start_len + 2)
        self.assertIn('Foo', mail.outbox[-2].body)

        outbox_start_len = len(mail.outbox)
        mailer.send_volunteer_welcome(contact, 'Foo')
        self.assertEqual(len(mail.outbox), outbox_start_len + 2)
        self.assertIn('Foo', mail.outbox[-2].body)

        outbox_start_len = len(mail.outbox)
        mailer.send_volunteer_new_opportunities(contact, 'Foo', 'Bar')
        self.assertEqual(len(mail.outbox), outbox_start_len + 2)
        self.assertIn('Foo', mail.outbox[-2].body)
        self.assertIn('Bar', mail.outbox[-2].body)

        outbox_start_len = len(mail.outbox)
        mailer.send_volunteer_upcoming_appointment(contact, 'Foo', 'Bar', 'Baz', 'Qux')
        self.assertEqual(len(mail.outbox), outbox_start_len + 2)
        self.assertIn('Foo', mail.outbox[-2].body)
        self.assertIn('Bar', mail.outbox[-2].body)
        self.assertIn('Baz', mail.outbox[-2].body)
        self.assertIn('Qux', mail.outbox[-2].body)

        outbox_start_len = len(mail.outbox)
        mailer.send_volunteer_upcoming_translation(contact, 'Foo', 'Bar', 'Baz', 'Qux')
        self.assertEqual(len(mail.outbox), outbox_start_len + 2)
        self.assertIn('Foo', mail.outbox[-2].body)
        self.assertIn('Bar', mail.outbox[-2].body)
        self.assertIn('Baz', mail.outbox[-2].body)
        self.assertIn('Qux', mail.outbox[-2].body)

        outbox_start_len = len(mail.outbox)
        mailer.send_volunteer_updated(contact, 'Foo')
        self.assertEqual(len(mail.outbox), outbox_start_len + 2)
        self.assertIn('Foo', mail.outbox[-2].body)

        outbox_start_len = len(mail.outbox)
        mailer.send_volunteer_welcome_staffcreated(contact, 'Foo', 'p@$$w0rd')
        self.assertEqual(len(mail.outbox), outbox_start_len + 2)
        self.assertIn('Foo', mail.outbox[-2].body)
        self.assertIn('p@$$w0rd', mail.outbox[-2].body)

        # Add and admin to send mail to
        self.signup('mojo@jojo.com', 'password', is_superuser=True)

        outbox_start_len = len(mail.outbox)
        mailer.send_staff_assignments_no_volunteers('Foo')
        self.assertEqual(len(mail.outbox), outbox_start_len + 2)
        self.assertIn('Foo', mail.outbox[-2].body)

        outbox_start_len = len(mail.outbox)
        mailer.send_staff_new_account('Foo', 'Bar', 'Baz')
        self.assertEqual(len(mail.outbox), outbox_start_len + 2)
        self.assertIn('Foo', mail.outbox[-2].body)
        self.assertIn('Bar', mail.outbox[-2].body)
        self.assertIn('Baz', mail.outbox[-2].body)

    def test_email_on_update(self):
        mail.send_mail('subject', 'body.', 'bha@gmail.com', ['messi@barca.com'])
        # 3 situations which before tests would have sent emails
        self.assertEqual(len(mail.outbox), 3)
        self.assertEqual(mail.outbox[0].subject, '[BHA] Thanks for Creating An Account With the Boston Housing Authority')
        self.assertEqual(mail.outbox[len(mail.outbox)-1].body, 'body.')

    def test_admin(self):
        response = self.c.get('/admin/login/')
        self.assertEqual(response.status_code, 200)

    def test_user_with_gmail_address_not_created_as_superuser(self):
        user = self.signup("jdoe@gmail.com", "password", first_name="John", last_name="Doe")
        self.assertFalse(user.is_superuser)
        self.assertFalse(user.is_staff)

    def test_should_provide_helpful_error_messages_when_signup_errors_occur(self):
        self.signup('fuzz@buzz.com', 'password')
        singup_json = self.get_user_signup_form_data('fuzz@buzz.com', 'password')
        signup_response = self.c.post('/api/volunteers/', singup_json, format='json')
        self.assertEqual(signup_response.json()[0], 'An account is already registered with fuzz@buzz.com')
