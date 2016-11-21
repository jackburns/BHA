from django.contrib.auth.models import User, Group
from rest_framework import serializers
import api.email as mailer
from .models import Volunteer, Contact, Availability, Language, Assignment
from datetime import datetime
from django.shortcuts import get_object_or_404

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'is_superuser')
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

class VolunteerSerializer(serializers.Serializer):

    contact = ContactSerializer()
    availability = AvailabilitySerializer(many=True)
    languages = LanguageSerializer(many=True)
    assignments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)
    sex = serializers.IntegerField(allow_null=True, required=False)
    age = serializers.IntegerField(allow_null=True, required=False)
    volunteer_level = serializers.IntegerField(allow_null=True, required=False)
    inactive = serializers.BooleanField(default=False, required=False)
    hours = serializers.IntegerField(allow_null=True, required=False)
    organization = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    notes = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    id = serializers.IntegerField(allow_null=True, required=False)
    password = serializers.CharField(allow_null=True, required=False)
    hours_starting_at = serializers.DateTimeField(required=False)
    hours_ending_at = serializers.DateTimeField(required=False)
    full_name = serializers.SerializerMethodField()
    referrer = serializers.CharField(required=False) 

    def get_full_name(self, obj):
        return obj.first_name + ' ' + obj.last_name

    def _validate_unique_email(self, email):
        if User.objects.filter(username=email).exists():
            raise serializers.ValidationError(
                'An account is already registered with {0}'.format(email)
            )

    def create(self, data):

        self._validate_unique_email(data['contact']['email'])

        contact_data = data.pop('contact', None)
        availability_data = data.pop('availability', None)
        languages_data = data.pop('languages', None)
        password_data = data.pop('password')
        first_name = data.pop('first_name')
        last_name = data.pop('last_name')
        name = first_name + " " + last_name
        data['first_name'] = first_name
        data['last_name'] = last_name

        isAdmin = False

        user = User.objects.create(username=contact_data['email'], email=contact_data['email'], is_staff=isAdmin, is_superuser=isAdmin)
        user.set_password(password_data)
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

        mailer.send_volunteer_welcome(volunteer.contact, name)
        mailer.send_staff_new_account(name, contact_data['email'], contact_data['phone_number'])

        return volunteer

    # this is actually a little involved, set every field appropriately
    # TODO: add updating username via email
    # TODO: investigate updating password via here as well
    def update(self, instance, data):

        if data['contact']['email'] != instance.user.username:
            self._validate_unique_email(data['contact']['email'])

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
            mailer.send_volunteer_updated(contact, instance.first_name)

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
    contact = ContactSerializer()
    availability = AvailabilitySerializer(many=True)
    languages = LanguageSerializer(many=True)
    assignments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)
    sex = serializers.IntegerField(allow_null=True, required=False)
    volunteer_level = serializers.IntegerField(allow_null=True, required=False)
    inactive = serializers.BooleanField(default=False, required=False)
    hours = serializers.IntegerField(allow_null=True, required=False)
    organization = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    notes = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    id = serializers.IntegerField(allow_null=True, required=False)
    password = serializers.CharField(allow_null=True, required=False)
    admin_notes = serializers.CharField(allow_blank=True, allow_null=True, required=False)

class AssignmentSerializer(serializers.ModelSerializer):
    contact = ContactSerializer()
    posted_by = VolunteerSerializer(required=False, allow_null=True)
    volunteers = VolunteerSerializer(read_only=True, many=True)
    posted_by_id = serializers.IntegerField(allow_null=True, required=False)

    class Meta:
        model = Assignment
        fields = ('id', 'contact', 'language_name', 'posted_by', 'posted_by_id', 'start_date', 'name', 'volunteers', 'notes', 'type', 'status', 'duration')
        read_only_fields = ('id', 'posted_by')
        write_only_fields = ('posted_by_id',)

    def create(self, data):
        contact_data = data.pop('contact', None)
        posted_by_id = data.pop('posted_by_id', None)
        posted_by = get_object_or_404(Volunteer, id=posted_by_id)

        contact = Contact.objects.create(**contact_data)

        assignment = Assignment.objects.create(contact=contact, posted_by=posted_by, **data)

        assignment.save()

        return assignment

    def update(self, instance, data):
        contact_data = data.pop('contact', None)
        contact = instance.contact
        posted_by_id = data.pop('posted_by_id', None)
        posted_by = data.pop('posted_by', None)

        if contact is None:
            data['contact'] = Contact.objects.create(**contact_data)
        else:
            updateAttrs(contact, contact_data)
            contact.save()

        if posted_by_id is not None:
            new_posted_by = get_object_or_404(Volunteer, id=posted_by_id)
            data['posted_by'] = new_posted_by

        updateAttrs(instance, data)
        instance.save()
        return instance

class AdminAssignmentSerializer(AssignmentSerializer):
    class Meta:
        model = Assignment
        fields = ('id', 'contact', 'language_name', 'posted_by', 'posted_by_id', 'start_date', 'name', 'volunteers', 'notes', 'type', 'admin_notes', 'status')
        read_only_fields = ('id', 'posted_by')
        write_only_fields = ('posted_by_id',)
