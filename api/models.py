from django.db import models
from django.contrib.auth.models import User

SEX_ENUM = (
    (0, 'Male'),
    (1, 'Female'),
    (2, 'Other'),
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

ASSIGNMENT_TYPE_ENUM = (
    (0, 'in-person'),
    (1, 'written'),
    (2, 'training'),
)

ASSIGNMENT_STATUS_ENUM = (
    (0, 'unapproved'),
    (1, 'approved'),
    (2, 'complete'),
)

CARRIERS_ENUM = (
    (0, ''),
    (1, 'txt.att.net'),
    (2, 'messaging.sprintpcs.com'),
    (3, 'tmomail.net'),
    (4, 'vtext.com'),
    (5, 'sms.alltelwireless.com'),
    (6, 'sms.myboostmobile.com'),
    (7, 'cwemail.com'),
    (8, 'gocbw.com'),
    (9, 'sms.mycricket.com'),
    (10, 'mymetropcs.com'),
    (11, 'qwestmp.com'),
    (12, 'sms.rogers.com'),
    (13, 'msg.telus.com'),
    (14, 'email.uscc.net'),
    (15, 'vmobl.com'),
)

class Contact(models.Model):
    street = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    zip = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=50)
    email = models.EmailField()
    preferred_contact = models.IntegerField(choices=PREFERRED_CONTACT_ENUM)
    carrier = models.IntegerField(choices=CARRIERS_ENUM)

class Volunteer(models.Model):
    user = models.OneToOneField(User, null=True,on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, null=True, blank=True)
    sex = models.IntegerField(choices=SEX_ENUM, null=True, blank=True)
    volunteer_level = models.IntegerField(choices=VOLUNTEER_LEVEL_ENUM, default=0)
    created_at = models.DateTimeField()
    deleted_at = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    admin_notes = models.TextField(null=True, blank=True)
    inactive = models.BooleanField(default=False)
    contact = models.OneToOneField(Contact)
    hours = models.IntegerField(default=0)
    organization = models.CharField(max_length=120, null=True, blank=True)

    def __str__(self):
        return "{} {} {}".format(self.first_name, self.middle_name, self.last_name)

class Language(models.Model):
    can_written_translate = models.BooleanField()
    language_name = models.CharField(max_length=7, choices=LANGUAGE_ENUM, blank=True)
    volunteer = models.ForeignKey(Volunteer, on_delete=models.CASCADE, related_name='languages')

class Availability(models.Model):
    day = models.IntegerField(choices=DAY_ENUM, default=None)
    start_time = models.TimeField()
    end_time = models.TimeField()
    volunteer = models.ForeignKey(Volunteer, on_delete=models.CASCADE, related_name='availability')

class Assignment(models.Model):
    name = models.CharField(max_length=120)
    posted_by = models.ForeignKey(Volunteer, on_delete=models.SET_NULL, related_name='posted_assignments', null=True, blank=True)
    volunteers = models.ManyToManyField(Volunteer, related_name='assignments', blank=True)
    language_name = models.CharField(max_length=7, choices=LANGUAGE_ENUM)
    is_translation = models.BooleanField(default=False)
    start_date = models.DateTimeField()
    contact = models.OneToOneField(Contact, null=True, blank=True)
    type = models.IntegerField(default=0, choices=ASSIGNMENT_TYPE_ENUM)
    notes = models.TextField(null=True, blank=True)
    admin_notes = models.TextField(null=True, blank=True)
    status = models.IntegerField(default=0, choices=ASSIGNMENT_STATUS_ENUM)
    duration = models.DecimalField(default=0, max_digits=4, decimal_places=2)

    def __str__(self):
        return self.name

