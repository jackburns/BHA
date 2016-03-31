from django.db import models
from django.contrib.auth.models import User

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
	('af', 'Afrikaans'),
	('ar', 'Arabic'),
	('ast', 'Asturian'),
	('az', 'Azerbaijani'),
	('bg', 'Bulgarian'),
	('be', 'Belarusian'),
	('bn', 'Bengali'),
	('br', 'Breton'),
	('bs', 'Bosnian'),
	('ca', 'Catalan'),
	('cs', 'Czech'),
	('cy', 'Welsh'),
	('da', 'Danish'),
	('de', 'German'),
	('el', 'Greek'),
	('en', 'English'),
	('en-au', 'Australian English'),
	('en-gb', 'British English'),
	('eo', 'Esperanto'),
	('es', 'Spanish'),
	('es-ar', 'Argentinian Spanish'),
	('es-co', 'Colombian Spanish'),
	('es-mx', 'Mexican Spanish'),
	('es-ni', 'Nicaraguan Spanish'),
	('es-ve', 'Venezuelan Spanish'),
	('et', 'Estonian'),
	('eu', 'Basque'),
	('fa', 'Persian'),
	('fi', 'Finnish'),
	('fr', 'French'),
	('fy', 'Frisian'),
	('ga', 'Irish'),
	('gd', 'Scottish Gaelic'),
	('gl', 'Galician'),
	('he', 'Hebrew'),
	('hi', 'Hindi'),
	('hr', 'Croatian'),
	('hu', 'Hungarian'),
	('ia', 'Interlingua'),
	('id', 'Indonesian'),
	('io', 'Ido'),
	('is', 'Icelandic'),
	('it', 'Italian'),
	('ja', 'Japanese'),
	('ka', 'Georgian'),
	('kk', 'Kazakh'),
	('km', 'Khmer'),
	('kn', 'Kannada'),
	('ko', 'Korean'),
	('lb', 'Luxembourgish'),
	('lt', 'Lithuanian'),
	('lv', 'Latvian'),
	('mk', 'Macedonian'),
	('ml', 'Malayalam'),
	('mn', 'Mongolian'),
	('mr', 'Marathi'),
	('my', 'Burmese'),
	('nb', 'Norwegian Bokmal'),
	('ne', 'Nepali'),
	('nl', 'Dutch'),
	('nn', 'Norwegian Nynorsk'),
	('os', 'Ossetic'),
	('pa', 'Punjabi'),
	('pl', 'Polish'),
	('pt', 'Portuguese'),
	('pt-br', 'Brazilian Portuguese'),
	('ro', 'Romanian'),
	('ru', 'Russian'),
	('sk', 'Slovak'),
	('sl', 'Slovenian'),
	('sq', 'Albanian'),
	('sr', 'Serbian'),
	('sr-latn', 'Serbian Latin'),
	('sv', 'Swedish'),
	('sw', 'Swahili'),
	('ta', 'Tamil'),
	('te', 'Telugu'),
	('th', 'Thai'),
	('tr', 'Turkish'),
	('tt', 'Tatar'),
	('udm', 'Udmurt'),
	('uk', 'Ukrainian'),
	('ur', 'Urdu'),
	('vi', 'Vietnamese'),
	('zh-hans', 'Simplified Chinese'),
	('zh-hant', 'Traditional Chinese'),
)

class Availability(models.Model):
    day = models.IntegerField(choices=DAY_ENUM, default=None)
    start_time = models.TimeField()
    end_time = models.TimeField()

class Contact(models.Model):
    street = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    zip = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=50)
    email = models.EmailField()
    preferred_contact = models.IntegerField(choices=PREFERRED_CONTACT_ENUM)

class Language(models.Model):
    can_written_translate = models.BooleanField()
    language_name = models.CharField(max_length=7, choices=LANGUAGE_ENUM)

class Volunteer(models.Model):
    user = models.OneToOneField(User, null=True,on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50)
    birthday = models.DateField()
    sex = models.IntegerField(choices=SEX_ENUM)
    role = models.IntegerField(choices=ROLE_ENUM)
    volunteer_level = models.IntegerField(choices=VOLUNTEER_LEVEL_ENUM)
    created_at = models.DateTimeField()
    deleted_at = models.DateTimeField(blank=True)
    notes = models.TextField()
    inactive = models.BooleanField()
    availability = models.ForeignKey(Availability, on_delete=models.CASCADE, blank=True)
    contact = models.OneToOneField(Contact, on_delete=models.CASCADE, blank=True)
    languages = models.ForeignKey(Language, on_delete=models.CASCADE, blank=True)
    hours = models.IntegerField(default=0)
