from django.core.mail import EmailMultiAlternatives
from django.core.mail import send_mail
from django.template.exceptions import TemplateDoesNotExist
from django.template.loader import get_template
from django.contrib.auth.models import User
from django.db.models import Q
from api.models import CARRIERS_ENUM, LANGUAGE_ENUM


def send_volunteer_welcome(contact, name):
    notify_contact(
        contact, 'welcome',
        name=name
    )


def send_volunteer_added_assignment(contact, name):
    notify_contact(
        contact, 'user_added',
        name=name
    )


def send_volunteer_removed_assignment(contact, name):
    notify_contact(
        contact, 'user_removed',
        name=name
    )


def send_staff_new_account(name, email, phone):
    notify_superusers(
        'new_account_staff',
        name=name, volunteer_email=email, volunteer_phone=phone
    )


def send_volunteer_welcome_staffcreated(contact, name, password):
    notify_contact(
        contact, 'welcome_staffcreated',
        name=name, password=password
    )


def send_volunteer_new_opportunities(contact, name, assignments):
    notify_contact(
        contact,
        'volunteer_new_opportunities',
        name=name, assignment_list=assignments
    )


def send_staff_assignments_no_volunteers(assignments):
    notify_superusers(
        'staff_assignments_no_volunteers',
        assignments=assignments
    )


def send_volunteer_upcoming_assignment(contact, volunteer, assignment):
    template = 'volunteer_upcoming_translation' if assignment.type == 1 else 'volunteer_upcoming_appointment'
    notify_contact(
        contact, template,
        name=volunteer.first_name,
        assignment_name=assignment.name,
        assignment_location=assignment.contact.full_address,
        assignment_language=LANGUAGE_ENUM.get(assignment.language_name, ''),
        start_date=assignment.start_date
    )


def send_volunteer_updated(contact, name):
    notify_contact(
        contact,
        'user_info_updated',
        name=name
    )

def send_referral(email, referrer_name, referrer_email, url):
    # This DOES NOT use the notify_contact system because there is not a user here,
    # just an email address
    context = {
        'volunteer_name': referrer_name,
        'login_url': url
    }
    template="referral"
    subject = _subjects_by_template["referral"]
    email_text = _try_render_template('{}_email_body.txt'.format(template), context)
    email_html = _try_render_template('{}_email_body.html'.format(template), context)

    mail = EmailMultiAlternatives(subject, email_text, 'no-reply@bha.com', [email])
    if email_html:
        mail.attach_alternative(email_html, "text/html")
    mail.send()


def notify_contact(contact, template=None, subject=None, payload=None, **kwargs):
    payload = payload or kwargs
    send_notification(contact.email, contact.carrier, contact.phone_number, template, subject, payload)


def notify_superusers(template=None, subject=None, payload=None, **kwargs):
    payload = payload or kwargs
    admins = User.objects.filter(Q(is_superuser=True) | Q(is_staff=True))
    for admin in admins:
        try:
            notify_contact(admin.volunteer.contact, template, subject, payload)
        except AttributeError:
            print('UNABLE TO CONTACT {}'.format(admin))


def send_notification(email_address, phone_carrier, phone_number, template=None, subject=None, payload=None, **kwargs):
    subject = subject or _subjects_by_template.get(template)
    payload = payload or kwargs
    context = _create_context(payload)

    email_text = _try_render_template('{}_email_body.txt'.format(template), context) or payload
    email_html = _try_render_template('{}_email_body.html'.format(template), context)
    mail = EmailMultiAlternatives(subject, email_text, 'no-reply@bha.com', [email_address])
    if email_html:
        mail.attach_alternative(email_html, "text/html")
    mail.send()

    sms_text = _try_render_template('{}_text.txt'.format(template), context) or email_text
    send_text(phone_carrier, phone_number, subject, sms_text)


def send_email(address, subject, message):
    send_mail(subject, message, 'no-reply@bha.com', [address], fail_silently=False)


def send_text(carrier, phone_number, subject, message):
    carrier_gateway = CARRIERS_ENUM.get(carrier, carrier)
    address = phone_number + "@" + carrier_gateway
    send_email(address, subject, message)


def _create_context(payload):
    return dict(payload, **_default_context)


def _try_render_template(template_string, context):
    try:
        return get_template(template_string).render(context)
    except TemplateDoesNotExist:
        return None


_default_context = {
    'bha_phone_number': "617-988-4032",
    'bha_url': "https://www.bostonhousing.org/en/vip",
    'bha_email': "LanguageAccessTeam@bostonhousing.org"
}

_subjects_by_template = {
    'welcome': "[BHA] Thanks for Creating An Account With the Boston Housing Authority",
    'user_added': "[BHA] You Were Added to an Assignment With the Boston Housing Authority",
    'user_removed': "[BHA] You Were Removed from an Assignment With the Boston Housing Authority",
    'new_account': "[BHA] A New Volunteer Has Created An Account",
    'volunteer_upcoming_appointment': "[BHA] Reminder: It's Almost Time to Volunteer",
    'volunteer_upcoming_translation': "[BHA] Reminder: It's Almost Time to Submit Your Translation",
    'volunteer_new_opportunities': "[BHA] New Assignments Available",
    'staff_assignments_no_volunteers': "[BHA] Reminder: These Assignments Need Volunteers",
    'user_info_updated': "[BHA] Contact information updated",
    'referral': "[BHA] Would you like to work with the Boston Housing Authority?"
}
