from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Volunteer, Contact, Availability, Language, Assignment
from datetime import datetime

adminEmailSuffix = [
    '@bha.com',
    '@gmail.com'
]

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    is_staff = serializers.BooleanField(read_only=True)
    class Meta:
        model = User
        fields = ('id',  'username', 'password', 'is_staff')

    def restore_object(self, attrs, instance=None):
        # call set_password on user object. Without this
        # the password will be stored in plain text.
        user = super(UserSerializer, self).restore_object(attrs, instance)
        user.set_password(attrs['password'])
        return user

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('street', 'city', 'state', 'zip', 'phone_number', 'email', 'preferred_contact')

class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ('day', 'start_time', 'end_time')

class LanguageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Language
        fields = ('can_written_translate', 'language_name')


# like object.update but defaults to ORIGINAL OBJECT if key not found on NEW OBJECT
# (cannot NULL fields once written to prevent future headaches)
# TODO: move this someplace not total shit plz
def updateAttrs(self, old, new):
    for key in new.items():
        updateAttr(old, new, key)
    return old

# 2 lazy 2 figure out functional programming in python
def updateAttr(self, old, new, key):
    setattr(old, key, new.get(key, getattr(old, key)))

# TODO: why do i have to write this shit? whatever move me one day plz
# NOTE: THIS WILL NOT WORK IF YOU TRIED TO BE FANCY WITH YOUR IDS (shame on you)
def purgeList(self, old_array, new_array):
    # delete stuff
    item_ids = [item['id'] for item in new_array]
    for item in old_array:
        if item.id not in items_ids:
            item.delete()

class VolunteerSerializer(serializers.ModelSerializer):

    contact = ContactSerializer()
    availability = AvailabilitySerializer(many=True, read_only=True)
    languages = LanguageSerializer(many=True, read_only=True)
    user = UserSerializer()

    class Meta:
        model = Volunteer
        fields = ('contact', 'availability', 'languages', 'id', 'first_name', 'last_name', 'sex', 'volunteer_level', 'inactive', 'hours', 'user')

    def create(self, data):
        contact_data = data.pop('contact', None)
        availability_data = data.pop('availability', None)
        languages_data = data.pop('languages', None)
        user_data = data.pop('user')

        isAdmin = any(suffix.lower() in contact_data['email'].lower() for suffix in adminEmailSuffix)

        user = User.objects.create(username=user_data['username'], is_staff=isAdmin)
        user.set_password(user_data['password'])
        user.save()

        contact = Contact.objects.create(**contact_data)

        volunteer = Volunteer.objects.create(created_at=datetime.now(),user=user,contact=contact, **data)

        if availability_data is not None:
            for single_av_data in availability_data:
                Availability.objects.create(volunteer=volunteer, **single_av_data)

        if languages_data is not None:
            for language_data in languages_data:
                Language.objects.create(volunteer=volunteer, **language_data)

        volunteer.save()
        return volunteer

    # this is actually a little involved, set every field appropriately
    # TODO: make sure this actually works and fix it when it doesnt
    def update(self, instance, data):
        contact_data = data.pop('contact')
        availability_data = data.pop('availability')
        languages_data = data.pop('languages')
        contact = instance.contact
        availability = instance.availability
        languages = instance.languages

        contact = updateAttrs(contact, contact_data)
        contact.save()

        purgeList(availability, availability_data)
        purgeList(languages, languages_data)

        for item in availability_data:
            availability = Availability(id=item['id'], day=item['day'],
                            start_time=item['start_time'], end_time=['end_time'], volunteer=instance)
            availability.save()

        for item in languages_data:
            language = Language(id=item['id'], can_written_translate=item['can_written_translate'], language_name=['language_name'], volunteer=instance)
            language.save()
        #
        # contact.street = contact_data.get('street', contact.street)
        # contact.city = contact_data.get('city', contact.city)
        # contact.state = contact_data.get('state', contact.state)
        # contact.zip = contact_data.get('zip', contact.zip)
        # contact.phone_number = contact_data.get('phone_number', contact.phone_number)
        # contact.email = contact_data.get('email', contact.email)
        # contact.preferred_contact = contact_data.get('preferred_contact', contact.preferred_contact)

        # non admin update until i figure out a better way :P
        updateAttr(instance, data, 'first_name')
        updateAttr(instance, data, 'last_name')
        updateAttr(instance, data, 'middle_name')
        updateAttr(instance, data, 'birthday')
        updateAttr(instance, data, 'sex')

        return instance

class AdminVolunteerSerializer(VolunteerSerializer):
    notes = serializers.CharField(required=False)

class AssignmentSerializer(serializers.ModelSerializer):
    contact = ContactSerializer()
    language = LanguageSerializer()
    posted_by = VolunteerSerializer()
    volunteers = VolunteerSerializer(read_only=True, many=True)

    class Meta:
        model = Assignment
        fields = ('id', 'contact', 'language', 'posted_by', 'start_date', 'name', 'volunteers', 'notes')
        read_only_fields = ('id', 'posted_by')

class AdminAssignmentSerializer(AssignmentSerializer):
    class Meta:
        model = Assignment
        fields = ('admin_notes')
