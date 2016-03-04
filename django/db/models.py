from django.db import models


class Volunteer(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50)
    birthday = models.DateField()
    sex = models.CharField(max_length=1, choices=SEX_ENUM)
    role = models.CharField(max_length=1, choices=ROLE_ENUM)
    volunteer_level = models.CharField(max_length=1, choices=VOLUNTEER_LEVEL_ENUM)
    created_at = models.DateTimeField()
    deleted_at = models.DateTimeField()
    notes = models.TextField()
    inactive = models.BooleanField()
    availability = models.ForeignKey(Availability, on_delete=models.CASCADE)
    contact = models.OneToOneField(Contact, on_delete=models.CASCADE)
    hours = models.IntegerField()


class Availability(models.Model):
    start_time = models.TimeField()
    end_time = models.TimeField()

class Contact(models.Model):
    street = models.CharField()
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    zip = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    preferred_contact = models.CharField(max_length=1, choices=PREFERRED_CONTACT_ENUM)

class Language(models.Model):
    can_written_translate = models.BooleanField()
    language_name = models.CharField(max_length=1, choices=LANGUAGE_ENUM)


SEX_ENUM = (
    (0, 'Male'),
    (1, 'Female'),
    (2, 'Other'),
)

ROLE_ENUM = (
    (0, 'User'),
    (1, 'Admin'),
)

VOLUNTEER_LEVEL_ENUM = (
    (0, 'Unverified'),
    (1, 'Verified'),
    (2, 'Trained'),
    (3, 'hasObserved'),
    (4, 'beenObserved'),
)

DAY_ENUM = (
    (0, 'Monday'),
    (1, 'Tuesday'),
    (2, 'Wednesday'),
    (3, 'Thursday'),
    (4, 'Friday'),
    (5, 'Saturday'),
    (6, 'Sunday'),
)

PREFERRED_CONTACT_ENUM = (
    (0, 'Email'),
    (1, 'Text'),
    (2, 'Both'),
)

LANGUAGE_ENUM = (
    (0, 'English'),
    (1, 'Spanish'),
    (2, 'Other'),
)



