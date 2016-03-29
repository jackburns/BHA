from django.db import models
from django.contrib.auth.models import User

SEX_ENUM = (
    ('Male', 'Male'),
    ('Female', 'Female'),
    ('Other', 'Other'),
)

ROLE_ENUM = (
    ('User', 'User'),
    ('Admin', 'Admin'),
)

VOLUNTEER_LEVEL_ENUM = (
    ('Unverified', 'Unverified'),
    ('Verified', 'Verified'),
    ('Trained', 'Trained'),
    ('hasObserved', 'hasObserved'),
    ('beenObserved', 'beenObserved'),
)

DAY_ENUM = (
    ('Monday', 'Monday'),
    ('Tuesday', 'Tuesday'),
    ('Wednesday', 'Wednesday'),
    ('Thursday', 'Thursday'),
    ('Friday', 'Friday'),
    ('Saturday', 'Saturday'),
    ('Sunday', 'Sunday'),
)

PREFERRED_CONTACT_ENUM = (
    ('Email', 'Email'),
    ('Text', 'Text'),
    ('Both', 'Both'),
)

LANGUAGE_ENUM = (
    ('English', 'English'),
    ('Spanish', 'Spanish'),
    ('Other', 'Other'),
)

class Availability(models.Model):
    start_time = models.TimeField()
    end_time = models.TimeField()
	
class Contact(models.Model):
    street = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    zip = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=50)
    email = models.EmailField()
    preferred_contact = models.CharField(max_length=50, choices=PREFERRED_CONTACT_ENUM)

class Language(models.Model):
    can_written_translate = models.BooleanField()
    language_name = models.CharField(max_length=50, choices=LANGUAGE_ENUM)

class Volunteer(models.Model):
    user = models.OneToOneField(User, null=True,on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50)
    birthday = models.DateField()
    sex = models.CharField(max_length=50, choices=SEX_ENUM)
    role = models.CharField(max_length=50, choices=ROLE_ENUM)
    volunteer_level = models.CharField(max_length=50, choices=VOLUNTEER_LEVEL_ENUM)
    created_at = models.DateTimeField()
    deleted_at = models.DateTimeField()
    notes = models.TextField()
    inactive = models.BooleanField()
    availability = models.ForeignKey(Availability, on_delete=models.CASCADE)
    contact = models.CharField(Contact, max_length=50, choices=PREFERRED_CONTACT_ENUM)
    hours = models.IntegerField()


