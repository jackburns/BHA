import kronos
import datetime
from django.db.models import Q
from .email import process_notification, send_emails, test_template, volunteer_welcome_subject, sub_volunteer_welcome, sub_staff_new_account, staff_new_account_subject
from .models import Assignment 

@kronos.register('0 8 * * *')
def unfilled_assignment():
    today = datetime.date.today()
    assignments =  Assignment.objects.all().filter(Q(volunteers__isnull=True) | Q(volunteers__volunteer_level__lt=4)).filter(start_date__lt= today + datetime.timedelta(days=6))
    #process_notification(volunteer_welcome_subject, sub_volunteer_welcome('Brian'), [{"email":"bcox5021@gmail.com"}, ], [])
    test_template('Brian')
    if assignments:
        message = "These assignments are unfilled or do not have experience volunteer: \n"
        for assignment in assignments:
            message += assignment.name + ": " + assignment.start_date.strftime('%d %B %Y - %I:%M %p') + '\n'
        send_emails("Unfilled Assignment", message, [{"email": "cs4500bha@gmail.com"},])


