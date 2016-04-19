from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .email import process_notification
from .models import Volunteer, Contact, Availability, Language, Assignment
from datetime import datetime

adminEmailSuffix = [
    '@bha.com',
    '@bostonhousing.org',
    '@gmail.com'
]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'is_staff')
        write_only_fields = ('password',)

    def restore_object(self, attrs, instance=None):
        # call set_password on user object. Without this
        # the password will be stored in plain text.
        user = super(UserSerializer, self).restore_object(attrs, instance)
        user.set_password(attrs['password'])
        return user

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('street', 'city', 'state', 'zip', 'phone_number', 'email', 'preferred_contact', 'carrier')

class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ('id', 'day', 'start_time', 'end_time')

class LanguageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Language
        fields = ('id', 'can_written_translate', 'language_name')


# like object.update but defaults to ORIGINAL OBJECT if key not found on NEW OBJECT
# (cannot NULL fields once written to prevent future headaches)
# TODO: move this someplace not total shit plz
def updateAttrs(old, new):
    for key, value in new.items():
        setattr(old, key, value)

# TODO: why do i have to write this shit? whatever move me one day plz
# NOTE: THIS WILL NOT WORK IF YOU TRIED TO BE FANCY WITH YOUR IDS (shame on you)
def purgeList(old_array, new_array):
    # delete stuff
    item_ids = []
    for item in new_array:
        if hasattr(item, 'id'):
            item_ids.append(item.id)
    for item in old_array:
        if item.id not in item_ids:
            item.delete()

class VolunteerSerializer(serializers.ModelSerializer):

    contact = ContactSerializer()
    availability = AvailabilitySerializer(many=True)
    languages = LanguageSerializer(many=True)
    assignments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Volunteer
        fields = ('contact', 'availability', 'languages', 'id', 'first_name', 'last_name', 'sex', 'volunteer_level', 'inactive', 'hours', 'user', 'assignments', 'organization', 'notes')
        read_only_fields = ('user')

    def create(self, data):
        contact_data = data.pop('contact', None)
        availability_data = data.pop('availability', None)
        languages_data = data.pop('languages', None)
        user_data = data.pop('user')

        isAdmin = any(suffix.lower() in contact_data['email'].lower() for suffix in adminEmailSuffix)

        user = User.objects.create(username=user_data['username'], email=contact_data['email'], is_staff=isAdmin)
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
        process_notification("Welcome to VIP!", "Thank you for signing up to volunteer for the Boston Housing Authority Volunteers Interpreters Program! We appreciate your help!", [{"email":contact.email},], [])
        process_notification("New Volunteer Signup", "A new volunteer has signed up for the VIP!", [{"email":"cs4500bha@gmail.com"},], [])

        return volunteer

    # this is actually a little involved, set every field appropriately
    # TODO: add updating username via email
    # TODO: investigate updating password via here as well
    def update(self, instance, data):
        contact_data = data.pop('contact')
        availability_data = data.pop('availability')
        languages_data = data.pop('languages')
        contact = instance.contact
        availability = instance.availability.all()
        languages = instance.languages.all()

        # update username and email if we need to
        if contact.email != contact_data['email']:
            user = User.objects.get(pk=instance.user_id)
            user.username = contact_data['email']
            user.email = contact_data['email']
            user.save()
            process_notification("Email Updated Successfully!", "Your email has been updated successfully! Please use this new email for user login", [{"email":contact.email},], [])

        updateAttrs(contact, contact_data)
        contact.save()

        updateAttrs(instance, data)
        instance.save()

        purgeList(availability, availability_data)
        purgeList(languages, languages_data)

        for item in availability_data:
            if hasattr(item, 'id'):
                availability = Availability(id=item['id'], day=item['day'],
                                start_time=item['start_time'], end_time=item['end_time'], volunteer=instance)
                availability.save()
            else:
                availability = Availability(day=item['day'],
                                start_time=item['start_time'], end_time=item['end_time'], volunteer=instance)
                availability.save()

        for item in languages_data:
            if hasattr(item, 'id'):
                language = Language(id=item['id'], can_written_translate=item['can_written_translate'], language_name=item['language_name'], volunteer=instance)
                language.save()
            else:
                language = Language(can_written_translate=item['can_written_translate'], language_name=item['language_name'], volunteer=instance)
                language.save()

        return instance

class AdminVolunteerSerializer(VolunteerSerializer):
    class Meta:
	    model = Volunteer
	    fields = ('contact', 'availability', 'languages', 'id', 'first_name', 'last_name', 'sex', 'volunteer_level', 'inactive', 'hours', 'notes', 'user', 'admin_notes')

class AssignmentSerializer(serializers.ModelSerializer):
    contact = ContactSerializer()
    language = LanguageSerializer()
    posted_by = VolunteerSerializer()
    volunteers = VolunteerSerializer(read_only=True, many=True)

    class Meta:
        model = Assignment
        fields = ('id', 'contact', 'language', 'posted_by', 'start_date', 'name', 'volunteers', 'notes', 'type')
        read_only_fields = ('id', 'posted_by')

class AdminAssignmentSerializer(AssignmentSerializer):
    class Meta:
        model = Assignment
        fields = ('id', 'contact', 'language', 'posted_by', 'start_date', 'name', 'volunteers', 'notes', 'type', 'admin_notes')
        read_only_fields = ('id', 'posted_by')
