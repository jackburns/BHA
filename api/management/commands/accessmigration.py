import csv
import geocoder
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from api.models import Volunteer, Contact, Assignment, SEX_ENUM, VOLUNTEER_LEVEL_ENUM, LANGUAGE_ENUM


# Create user object
# Affixing volunteer index to e-mail because all the test data has the same e-mail and they have to be unique
# Should probably change if/when we do an actual migration
def create_user(user_fields, i, test=False):
    try:
        if test:
            user = User.objects.create_user(username=str(i) + user_fields['Email'],
                                            email=str(i) + user_fields['Email'],
                                            password='',
                                            first_name=user_fields['First Name'],
                                            last_name=user_fields['Family Name'],)
        else:
            user = User.objects.create_user(username=user_fields['Email'],
                                            email=user_fields['Email'],
                                            password='',
                                            first_name=user_fields['First Name'],
                                            last_name=user_fields['Family Name'],)
    except Exception as e:
        return None
    return user


# Create contact object
def create_contact(contact_fields):
    address = geocoder.google(contact_fields['Address'])
    xstr = lambda s: s or ""
    street_full = xstr(address.housenumber) + xstr(address.street)
    contact = Contact.objects.create(street=street_full,
                                     city=xstr(address.city),
                                     state=xstr(address.state),
                                     zip=xstr(address.postal),
                                     phone_number=contact_fields['Phone'],
                                     email=contact_fields['Email'],
                                     carrier=0,
                                     preferred_contact=0)

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
    if level_fields['Observation2'].lower() == "true":
        return VOLUNTEER_LEVEL_ENUM[4][0]
    elif level_fields['Observation1'].lower() == "true":
        return VOLUNTEER_LEVEL_ENUM[3][0]
    elif level_fields['training'].lower() == "true":
        return VOLUNTEER_LEVEL_ENUM[2][0]
    else:
        return VOLUNTEER_LEVEL_ENUM[0][0]


# Create volunteer object
def create_volunteer(user, contact, volunteer_level, volunteer_fields):
    try:
        sex = get_tuple_key(SEX_ENUM, volunteer_fields['Sex'])
    except Exception as e:
        sex = get_tuple_key(SEX_ENUM, "Other")
    volunteer = Volunteer.objects.create(created_at=timezone.now(),
                                         user=user,
                                         contact=contact,
                                         first_name=volunteer_fields['First Name'],
                                         last_name=volunteer_fields['Family Name'],
                                         middle_name=volunteer_fields['Middle Name'],
                                         sex=sex,
                                         volunteer_level=volunteer_level,
                                         notes=volunteer_fields['Notes'],
                                         inactive= (volunteer_fields['Active?'] != "TRUE"))
    volunteer.save()
    return volunteer


def create_assignment(assignment_fields):
    
    contact = Contact.objects.create(street=assignment_fields["street"],
                                     city=assignment_fields["city"],
                                     state=assignment_fields["state"],
                                     zip=assignment_fields["zip"],
                                     phone_number=assignment_fields['phone'],
                                     email="",
                                     carrier=0,
                                     preferred_contact=0)

    date = timezone.datetime.strptime(assignment_fields["start_date"], "%m/%d/%y %H:%M:%S")
    volunteer = Volunteer.objects.all()[:1].get()
    langs = LANGUAGE_ENUM.keys()
    langs.sort()
    lang = langs[int(assignment_fields["language"])]
    assignment = Assignment.objects.create(name=assignment_fields["name"], 
                                            posted_by=volunteer,
                                            language_name=lang,
                                            start_date=date,
                                            contact=contact,
                                            type=0,
                                            notes=assignment_fields["notes"],
                                            admin_notes=assignment_fields["admin_notes"],
                                            status=0,
                                            duration=float(assignment_fields["duration"]))
    contact.save()
    assignment.save()

    return assignment


def import_volunteers_from_file(file, test=False):
    # Fields necessary for mapping to respective objects
    model_fields = {'user': ['Email', "First Name", "Family Name", "Active?"],
                    'volunteer': ['First Name', 'Family Name', 'Middle Name', 'Sex', 'Notes', 'Active?'],
                    'volunteer_level': ['training', 'Observation1', 'Observation2'],
                    'contact': ['Address', 'Phone', 'Email'],}
    
    with open(file) as csvfile:
        reader = csv.DictReader(csvfile)
        for i, row in enumerate(reader):
            fields_dict = {fields: {key: row[key] for key in model_fields[fields]} for fields in model_fields}
            try:
                user = create_user(fields_dict['user'], i, test)
                contact = create_contact(fields_dict['contact'])
                level = get_volunteer_level(fields_dict['volunteer_level'])
                volunteer = create_volunteer(user, contact, level, fields_dict['volunteer'])
            except Exception as e:
                print("Couldn't import volunteer " + str(i) + "\n" + str(e))


def import_assignments_from_file(file, test=False):
    model_fields = {'assignment':["name", "posted_by", "volunteers", "language", "start_date", 
                                    "time", "type", "notes", "admin_notes", "duration", "street",
                                    "city", "state", "zip", "phone"]} 
    with open(file) as csvfile:
        reader = csv.DictReader(csvfile)
        for i, row in enumerate(reader):
            fields_dict = {fields: {key: row[key] for key in model_fields[fields]} for fields in model_fields}
            try:
                assignment = create_assignment(fields_dict['assignment'])
            except Exception as e:
                print("Couldn't import assignment " + str(i) + "\n" + str(e))
    
    return


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('file', nargs='+', type=str)

    def handle(self, *args, **options):
        if len(options['file']) > 0:
            if "test" in options['file']:
                import_volunteers_from_file(options['file'][0], test=True)
            else:
                import_volunteers_from_file(options['file'][0])
        if len(options['file']) > 1:
            if "test" in options['file']:
                import_assignments_from_file(options['file'][1], test=True)
            else:
                import_assignments_from_file(options['file'][1])

