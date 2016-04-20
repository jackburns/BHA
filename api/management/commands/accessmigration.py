import csv
import geocoder
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from api.models import Volunteer, Contact, SEX_ENUM


# Create user object
# Affixing volunteer index to e-mail because all the test data has the same e-mail and they have to be unique
# Should probably change if/when we do an actual migration
def create_user(user_fields, i):
    user = User.objects.create_user(username=str(i) + user_fields['Email'],
                                    email=str(i) + user_fields['Email'],
                                    password='')
    return user


# Create contact object
def create_contact(contact_fields):
    address = geocoder.google(contact_fields['Address'])
    street_full = address.housenumber + address.street
    contact = Contact.objects.create(street=street_full,
                                     city=address.city,
                                     state=address.state,
                                     zip=address.postal,
                                     phone_number=contact_fields['Phone'],
                                     email=contact_fields['Email'],
                                     preferred_contact=2)

    return contact


# Get key of tuple form values
# Because our enums are not actually enums :(
# Smelly af
def get_tuple_key(_tuple, value):
    tuple_dict = dict(_tuple)
    return list(tuple_dict.keys())[list(tuple_dict.values()).index(value)]


# Get volunteer level based on VOLUNTEER_LEVEL_ENUM
# Hardcoded because why the fuck not
def get_volunteer_level(level_fields):
    if bool(level_fields['Observation2']):
        return 4
    elif bool(level_fields['Observation1']):
        return 3
    elif bool(level_fields['training']):
        return 2
    else:
        return 1


# Create volunteer object
def create_volunteer(user, contact, volunteer_level, volunteer_fields):
    volunteer = Volunteer.objects.create(created_at=timezone.now(),
                                         user=user,
                                         contact=contact,
                                         first_name=volunteer_fields['First Name'],
                                         last_name=volunteer_fields['Family Name'],
                                         middle_name=volunteer_fields['Middle Name'],
                                         sex=get_tuple_key(SEX_ENUM, volunteer_fields['Sex']),
                                         volunteer_level=volunteer_level,
                                         notes=volunteer_fields['Notes'],
                                         inactive=not bool(volunteer_fields['Active?']))
    volunteer.save()
    return volunteer


def import_volunteers_from_file(file):
    # Fields necessary for mapping to respective objects
    model_fields = {'user': ['Email'],
                    'volunteer': ['First Name', 'Family Name', 'Middle Name', 'Sex', 'Notes', 'Active?'],
                    'volunteer_level': ['training', 'Observation1', 'Observation2'],
                    'contact': ['Address', 'Phone', 'Email']}
    User.objects.all().delete()

    with open(file) as csvfile:
        reader = csv.DictReader(csvfile)

        for i, row in enumerate(reader):
            fields_dict = {fields: {key: row[key] for key in model_fields[fields]} for fields in model_fields}

            try:
                user = create_user(fields_dict['user'], i)
                contact = create_contact(fields_dict['contact'])
                level = get_volunteer_level(fields_dict['volunteer_level'])

                volunteer = create_volunteer(user, contact, level, fields_dict['volunteer'])
            except Exception as e:
                print("Couldn't import volunteer " + str(i) + "\n" + str(e))


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('file', nargs='+', type=str)

    def handle(self, *args, **options):
        for file in options['file']:
            import_volunteers_from_file(file)

