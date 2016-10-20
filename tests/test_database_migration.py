from contextlib import contextmanager

from django.contrib.auth.models import User
from django.test import TestCase, mock
from rest_framework.test import APIClient
from django.utils import timezone
from api.models import Volunteer, Contact, Assignment, LANGUAGE_ENUM
from django.db.models import Sum, Count
from django.core.management import call_command

import geocoder, datetime

fname = "First Name"
lname = "Family Name"
mname = "Middle Name"
sex = "Sex"
notes = "Notes"
active = "Active?"
train = "training"
obs1 = "Observation1"
obs2 = "Observation2"
addr = "Address"
phone = "Phone"
email = "Email"
idx = "idx"

female = "Female"
male = "Male"
other = "Other"

class FakeGeocodeResult(object):
    def __init__(self):
        self.housenumber = '12'
        self.street = 'Foo Bar Lane'
        self.city = 'Boston'
        self.state = 'MA'
        self.postal = '02120'

class DBMigrationTests(TestCase):
    
    userData = []
    assignments = []

    @classmethod
    def setUpClass(cls):
        super(DBMigrationTests, cls).setUpClass()
        geocoder.google = mock.MagicMock(return_value=FakeGeocodeResult())
        f = open("./tests/test_volunteers.csv")
        lines = f.readlines()
        f.close()
        keys = lines.pop(0).rstrip().split(",")
        for i in range(len(lines)):
            infodict = {}
            values = lines[i].rstrip().split(",")
            for k,v in zip(keys,values):
                infodict[k] = v
            infodict["idx"] = i
            cls.userData.append(infodict)

        f = open("./tests/test_assignments.csv")
        lines = f.readlines()
        f.close()
        keys = lines.pop(0).rstrip().split(",")
        for i in range(len(lines)):
            infodict = {}
            values = lines[i].rstrip().split(",")
            for k,v in zip(keys,values):
                infodict[k] = v
            infodict["idx"] = i
            cls.assignments.append(infodict)
        call_command('accessmigration','tests/test_volunteers.csv','tests/test_assignments.csv', 'test')
        return

    def test_usernames(self, **kwargs):
        for data in self.userData:
            username = str(data[idx]) + data[email]
            self.assertTrue(User.objects.filter(username=username).exists())
        return

    def test_names(self, **kwargs):
        for data in self.userData:
            user = User.objects.get(username=str(data[idx])+data[email])
            self.assertTrue(user.first_name == data[fname]) 
            self.assertTrue(user.last_name == data[lname])

    def test_permissions(self, **kwargs):
        for data in self.userData:
            user = User.objects.get(username=str(data[idx])+data[email])
            self.assertTrue(user.is_active)
            self.assertFalse(user.is_staff)
            self.assertFalse(user.is_superuser)

    def get_sex(self, vsex):
        if vsex == 0:
            return male
        elif vsex == 1:
            return female
        else:
            return ""
    
    def get_volunteer_level(self, data):
        if data[obs2].lower() == "true":
            return 4
        elif data[obs1].lower() == "true":
            return 3
        elif data[train].lower() == "true":
            return 2
        else:
            return 0
    

    def test_volunteer_info(self, **kwargs):
        for data in self.userData:
            user = User.objects.get(username=str(data[idx])+data[email])
            volunteer = Volunteer.objects.get(user_id=user.id)
            vsex = self.get_sex(volunteer.sex)
            vlevel = self.get_volunteer_level(data)
            is_active = "TRUE" if not volunteer.inactive else "FALSE"
            self.assertTrue(volunteer.first_name == data[fname])
            self.assertTrue(volunteer.last_name == data[lname])
            self.assertTrue(volunteer.middle_name == data[mname])
            self.assertTrue(vsex == data[sex])
            self.assertTrue(volunteer.volunteer_level == vlevel)
            self.assertTrue(volunteer.notes == "")
            self.assertTrue(is_active == data[active])


    def test_contact_info(self, **kwargs):
        for data in self.userData:
            user = User.objects.get(username=str(data[idx])+data[email])
            volunteer = Volunteer.objects.get(user_id=user.id)
            contact = Contact.objects.get(id=volunteer.contact_id)
            address = geocoder.google(data['Address'])
            xstr = lambda s: s or ""
            street_full = xstr(address.housenumber) + xstr(address.street)
            self.assertTrue(contact.street == street_full)
            self.assertTrue(contact.city == xstr(address.city))
            self.assertTrue(contact.state == xstr(address.state))
            self.assertTrue(contact.zip == xstr(address.postal))
            self.assertTrue(contact.phone_number == data[phone])
            self.assertTrue(contact.email == data[email])
            self.assertTrue(contact.carrier == 0)
            self.assertTrue(contact.preferred_contact == 0)
        return

    
    def test_assignment_contacts(self, **kwargs):
        for assignment in self.assignments:
            self.assertTrue(Contact.objects.filter(street=assignment["street"],
                            city=assignment["city"],
                            state=assignment["state"],
                            zip=assignment["zip"],
                            phone_number=assignment["phone"],
                            preferred_contact=0,
                            carrier=0).exists())
        return


    def test_assignment_info(self, **kwargs):
        for assignment in self.assignments:
            date = timezone.datetime.strptime(assignment["start_date"], "%m/%d/%y %H:%M:%S")
            lang = LANGUAGE_ENUM[int(assignment["language"])][0]
            self.assertTrue(Assignment.objects.filter(name=assignment["name"],
                            language_name=lang,
                            start_date=date,
                            type=0,
                            notes=assignment["notes"],
                            admin_notes=assignment["admin_notes"],
                            status=0,
                            duration=float(assignment["duration"])).exists())
        return

