from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
import re
from django.template import Context
from django.template.loader import get_template


def test_template(name):
    subject, from_email, to = 'Test Template', 'cs4500bha@gmail.com', 'bcox5021@gmail.com'
    text_content = get_template('welcome_email_body.txt')
    html_content = get_template('welcome_email_body.html')
    d = Context({ 'name': name })
    
    text = text_content.render(d)
    html = html_content.render(d)
    msg = EmailMultiAlternatives(subject, text, from_email, [to])
    msg.attach_alternative(html, "text/html")
    msg.send()

def process_notification(subject, message, emailList, textList):
    send_emails(subject, message, emailList)
    send_texts(subject, message, textList)


def send_emails(subject, message, emailList):
    for id_email in emailList:
        send_mail(subject, message, 'no-reply@bha.com', [id_email["email"]], fail_silently=False)


def send_texts(subject, message, textList):
    for id_num_carrier in textList:
        carrier_gateway = carriers[id_num_carrier["carrier"]]
        address = id_num_carrier["phoneNumber"] + "@" + carrier_gateway
        send_mail(subject, message, 'no-reply@bha.com', [address], fail_silently=False)


def sub_volunteer_name(message, name):
    return re.sub('[VOLUNTEER NAME]', name, message)


def sub_volunteer_email(message, email):
    return re.sub('[VOLUNTEER EMAIL ADDRESS]', email, message)


def sub_volunteer_phone(message, phone):
    return re.sub('[VOLUNTEER PHONE NUMBER]', phone, message)


def sub_bha_email(message):
    return re.sub('[BHA EMAIL ADDRESS]', bha_email_address, message)


def sub_bha_url(message):
    return re.sub('[BHA VOLUNTEER PORTAL URL]', bha_url, message)


def sub_bha_phone(message):
    return re.sub('[BHA PHONE NUMBER]', bha_phone_number, message)


def sub_volunteer_welcome(name):
    msg1 = sub_volunteer_name(volunteer_welcome, name)
    msg2 = sub_bha_email(msg1)
    msg3 = sub_bha_url(msg2)
    msg4 = sub_bha_phone(msg3)
    return msg4


def sub_staff_new_account(name, email, phone):
    msg1 = sub_volunteer_welcome(name)
    msg2 = sub_volunteer_email(msg1, email)
    msg3 = sub_volunteer_phone(msg2, phone)
    msg4 = sub_bha_url(msg3)
    return msg4

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

bha_phone_number = "617-988-4032"

bha_url = "https://www.bostonhousing.org/en/vip"

bha_email_address = "LanguageAccessTeam@bostonhousing.org"

volunteer_welcome_subject = "[BHA] Thanks for Creating An Account With the Boston Housing Authority"

volunteer_welcome = ("Dear [VOLUNTEER NAME],\n\n"
                     "You have successfully registered as a member"
                     "of the Boston Housing Authority's Volunteer Interpreter Program. "
                     "You can log in, sign up for opportunities, and manage your appointments "
                     "and written translations at [BHA VOLUNTEER PORTAL URL].\n\nIf you need assistance "
                     "or have questions, please email us at [BHA EMAIL ADDRESS] or call us at "
                     "[BHA PHONE NUMBER].\n\nOn behalf of the BHA, thank you for your future service!"
                     )

volunteer_welcome_staff_created = ("Dear [VOLUNTEER NAME],\n\nA Boston Housing Authority staff member "
                                   "has created an account on your behalf for the Volunteer Interpreter Program. "
                                   "You can log in, sign up for opportunities, and manage your appointments and "
                                   "written translations at [BHA VOLUNTEER PORTAL URL] using the following "
                                   "login information\n\nPassword: [VOLUNTEER PASSWORD]\n\nOnce you have logged in, "
                                   "please change your password. If you need assistance or have questions,"
                                   " please email us at [BHA EMAIL ADDRESS] or call us at [BHA PHONE NUMBER].\n\n"
                                   "If you need assistance or have questions, please email us at [BHA EMAIL ADDRESS] "
                                   "or call us at [BHA PHONE NUMBER].\n\nOn behalf of the BHA, "
                                   "thank you for your future service!"
                                   )

staff_new_account_subject = "[BHA] A New Volunteer Has Created An Account"

staff_new_account = ("Dear Language Access Team,\n\n"
                     "A new volunteer has registered for the Volunteer Interpreter's Program."
                     "Name: [VOLUNTEER NAME]\nEmail Address: [VOLUNTEER EMAIL ADDRESS]\n"
                     "Phone Number: [VOLUNTEER PHONE NUMBER]\n\n"
                     "To approve their account, please log in in at [BHA VOLUNTEER PORTAL URL]."
                     )
