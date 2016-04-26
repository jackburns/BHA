from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.template import Context
from django.template.loader import get_template


def send_volunteer_welcome(name):
    send_volunteer_welcome_email(name)
    #send_volunteer_welcome_text(sender_list)


def send_staff_new_account_notice(name, email, phone):
    send_staff_new_account_notice_email(name, email, phone)
    #send_staff_new_account_notice_text(sender_list)


def send_volunteer_welcome_staff_created(name, password, sender_list):
    send_volunteer_welcome_staffcreated_email(name, password)
    #send_volunteer_welcome_staffcreated_text(sender_list)


def send_volunteer_new_opportunities(name, assignments, sender_list):
    send_volunteer_new_opportunities_email(name, assignments)
    #send_volunteer_new_opportunities_text(sender_list)


def send_staff_assignments_no_volunteers(assignments, sender_list):
    send_staff_assignments_no_volunteers_email(assignments)
    #send_staff_assignments_no_volunteers_text(sender_list)


def send_volunteer_upcoming_appointment(name, assignment_name, assignment_location, start_date, sender_list):
    send_volunteer_upcoming_appointment_email(name, assignment_name, assignment_location, start_date)
    #send_volunteer_upcoming_appointment_text(sender_list)


def send_volunteer_upcoming_translation(name, assignment_name, assignment_location, start_date, sender_list):
    send_volunteer_upcoming_translation_email(name, assignment_name, assignment_location, start_date)
   # send_volunteer_upcoming_translation_text(sender_list)


def send_volunteer_welcome_email(name):
    text_content = get_template('welcome_email_body.txt')
    html_content = get_template('welcome_email_body.html')
    c = get_context_volunteer_welcome(name)
    text = text_content.render(c)
    html = html_content.render(c)
    msg = EmailMultiAlternatives(volunteer_welcome_subject, text, from_email, [to])
    msg.attach_alternative(html, "text/html")
    msg.send()


def send_staff_new_account_notice_email(name, volunteer_email, volunteer_phone):
    text_content = get_template('new_account_staff_email_body.txt')
    html_content = get_template('new_account_staff_email_body.html')
    c = get_context_staff_new_account(name, volunteer_email, volunteer_phone)
    text = text_content.render(c)
    html = html_content.render(c)
    msg = EmailMultiAlternatives(staff_new_account_subject, text, from_email, [to])
    msg.attach_alternative(html, "text/html")
    msg.send()


def send_volunteer_welcome_staffcreated_email(name, password):
    text_content = get_template('welcome_staffcreated_email_body.txt')
    html_content = get_template('welcome_staffcreated_email_body.html')
    c = get_context_volunteer_staff_created(name, password)
    text = text_content.render(c)
    html = html_content.render(c)
    msg = EmailMultiAlternatives(volunteer_welcome_staff_created, text, from_email, [to])
    msg.attach_alternative(html, "text/html")
    msg.send()


def send_volunteer_new_opportunities_email(name, assignments):
    text_content = get_template('volunteer_new_opportunities_email_body.txt')
    html_content = get_template('volunteer_new_opportunities_email_body.html')
    c = get_volunteer_new_opportunities(name, assignments)
    text = text_content.render(c)
    html = html_content.render(c)
    msg = EmailMultiAlternatives(volunteer_new_opportunities, text, from_email, [to])
    msg.attach_alternative(html, "text/html")
    msg.send()


def send_staff_assignments_no_volunteers_email(assignments):
    text_content = get_template('staff_assignments_no_volunteers_email_body.txt')
    html_content = get_template('staff_assignments_no_volunteers_email_body.html')
    c = get_staff_assignments_no_volunteers_email(assignments)
    text = text_content.render(c)
    html = html_content.render(c)
    msg = EmailMultiAlternatives(staff_assignments_no_volunteers, text, from_email, [to])
    msg.attach_alternative(html, "text/html")
    msg.send()


def send_volunteer_upcoming_appointment_email(name, assignment_name, assignment_location, start_date):
    text_content = get_template('volunteer_upcoming_appointment_email_body.txt')
    html_content = get_template('volunteer_upcoming_appointment_email_body.html')
    c = get_volunteer_upcoming_appointment(name, assignment_name, assignment_location, start_date)
    text = text_content.render(c)
    html = html_content.render(c)
    msg = EmailMultiAlternatives(volunteer_upcoming_appointment, text, from_email, [to])
    msg.attach_alternative(html, "text/html")
    msg.send()


def send_volunteer_upcoming_translation_email(name, assignment_name, assignment_location, start_date):
    text_content = get_template('volunteer_upcoming_translation_email_body.txt')
    html_content = get_template('volunteer_upcoming_translation_email_body.html')
    c = get_volunteer_upcoming_translation(name, assignment_name, assignment_location, start_date)
    text = text_content.render(c)
    html = html_content.render(c)
    msg = EmailMultiAlternatives(volunteer_upcoming_translation, text, from_email, [to])
    msg.attach_alternative(html, "text/html")
    msg.send()


def send_volunteer_welcome_text(sender_list):
    text_content = get_template('welcome_email_text.txt')
    c = Context({'bha_url': bha_url})
    text = text_content.render(c)
    send_texts(volunteer_welcome_subject, text, sender_list)


def send_staff_new_account_notice_text(sender_list):
    text_content = get_template('new_account_staff_text.txt')
    c = Context({'bha_url': bha_url})
    text = text_content.render(c)
    send_texts(staff_new_account_subject, text, sender_list)


def send_volunteer_welcome_staffcreated_text(sender_list):
    text_content = get_template('welcome_staffcreated_text.txt')
    c = Context({'bha_url': bha_url})
    text = text_content.render(c)
    send_texts(volunteer_welcome_staff_created, text, sender_list)


def send_volunteer_new_opportunities_text(sender_list):
    text_content = get_template('volunteer_new_opportunities_text.txt')
    c = Context({'bha_url': bha_url})
    text = text_content.render(c)
    send_texts(volunteer_new_opportunities, text, sender_list)


def send_staff_assignments_no_volunteers_text(sender_list):
    text_content = get_template('staff_assignments_no_volunteers_text.txt')
    c = Context({'bha_url': bha_url})
    text = text_content.render(c)
    send_texts(staff_assignments_no_volunteers, text, sender_list)


def send_volunteer_upcoming_appointment_text(sender_list):
    text_content = get_template('volunteer_upcoming_appointment_text.txt')
    c = Context({'bha_url': bha_url})
    text = text_content.render(c)
    send_texts(volunteer_upcoming_appointment, text, sender_list)


def send_volunteer_upcoming_translation_text(sender_list):
    text_content = get_template('volunteer_upcoming_translation_text.txt')
    c = Context({'bha_url': bha_url})
    text = text_content.render(c)
    send_texts(volunteer_upcoming_translation, text, sender_list)


def get_context_staff_new_account(name, volunteer_email, volunteer_phone):
    c = Context({'name': name})
    c.update({'bha_vip_url': bha_url})
    c.update({'volunteer_email': volunteer_email})
    c.update({'volunteer_phone': volunteer_phone})
    return c


def get_context_volunteer_welcome(name):
    c = Context({'name': name})
    c.update({'bha_vip_url': bha_url})
    c.update({'bha_email': bha_email_address})
    c.update({'bha_phone': bha_phone_number})
    return c


def get_context_volunteer_staff_created(name, password):
    c = Context({'name': name})
    c.update({'bha_vip_url': bha_url})
    c.update({'volunteer_password': password})
    c.update({'bha_email': bha_email_address})
    c.update({'bha_phone': bha_phone_number})
    return c


def get_volunteer_new_opportunities(name, assignments):
    c = Context({'name': name})
    c.update({'assignment_list': assignments})
    c.update({'bha_url': bha_url})
    c.update({'bha_email': bha_email_address})
    c.update({'bha_phone': bha_phone_number})
    return c


def get_staff_assignments_no_volunteers_email(assignments):
    c = Context({'assignments': assignments})
    c.update({'bha_url': bha_url})
    return c


def get_volunteer_upcoming_appointment(name, assignment_name, assignment_location, start_date):
    c = Context({'name': name})
    c.update({'assignment_name': assignment_name})
    c.update({'assignment_location': assignment_location})
    c.update({'start_date': start_date})
    c.update({'bha_vip_url': bha_url})
    c.update({'bha_email': bha_email_address})
    c.update({'bha_phone': bha_phone_number})
    return c


def get_volunteer_upcoming_translation(name, assignment_name, assignment_language, start_date):
    c = Context({'name': name})
    c.update({'assignment_name': assignment_name})
    c.update({'assignment_language': assignment_language})
    c.update({'start_date': start_date})
    c.update({'bha_url': bha_url})
    c.update({'bha_email': bha_email_address})
    c.update({'bha_phone': bha_phone_number})
    return c


def process_notification(subject, message, emailList, textList):
    send_emails(subject, message, emailList)
    send_texts(subject, message, textList)


def send_emails(subject, message, email_list):
    for id_email in email_list:
        send_mail(subject, message, 'no-reply@bha.com', [id_email["email"]], fail_silently=False)


def send_texts(subject, message, text_list):
    print(text_list)
    for id_num_carrier in text_list:
        #carrier_gateway = carriers[id_num_carrier["carrier"]]
        #address = id_num_carrier["phoneNumber"] + "@" + carrier_gateway
        send_mail(subject, message, 'no-reply@bha.com', ['8573139589@tmomail.net'], fail_silently=False)


carriers = {
    "AT&T": "txt.att.net",
    "Sprint": "messaging.sprintpcs.com",
    "T-Mobile": "tmomail.net",
    "Verizon": "vtext.com",
    "Alltel": "sms.alltelwireless.com",
    "Boost": "sms.myboostmobile.com",
    "Cellular South": "",
    "Centennial Wireless": "cwemail.com",
    "Cincinnati Bell": "gocbw.com",
    "Cricket Wireless": "sms.mycricket.com",
    "Metro PCS": "mymetropcs.com",
    "Powertel": "",
    "Qwest": "qwestmp.com",
    "Rogers": "sms.rogers.com",
    "Suncom": "",
    "Telus": "msg.telus.com",
    "U.S. Cellular": "email.uscc.net",
    "Virgin Mobile USA": "vmobl.com",
    "Other": "",
}

from_email, to = 'cs4500bha@gmail.com', 'bcox5021@gmail.com'

bha_phone_number = "617-988-4032"

bha_url = "https://www.bostonhousing.org/en/vip"

bha_email_address = "LanguageAccessTeam@bostonhousing.org"

volunteer_welcome_subject = "[BHA] Thanks for Creating An Account With the Boston Housing Authority"

staff_new_account_subject = "[BHA] A New Volunteer Has Created An Account"

volunteer_welcome_staff_created = "[BHA] Thanks for Creating An Account With the Boston Housing Authority"

volunteer_upcoming_appointment = "[BHA] Volunteer Appointment Reminder: It's Almost Time to Volunteer"

volunteer_upcoming_translation = "[BHA] Written Translation Reminder: It's Almost Time to Submit Your Translation"

volunteer_new_opportunities = "[BHA] New Volunteer Assignments Available"

staff_assignments_no_volunteers = "[BHA] Reminder: These Assignments Need Volunteers"
