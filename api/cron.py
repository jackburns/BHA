import kronos
import datetime
from django.db.models import Q
from .email import send_emails
from .models import Assignment 

@kronos.register('0 8 * * *')
def unfilled_assignment():
    today = datetime.date.today()
    assignments =  Assignment.objects.all().filter(Q(volunteers__isnull=True) | Q(volunteers__volunteer_level__lt=4)).filter(start_date__lt= today + datetime.timedelta(days=6))

    message = "These assignments are unfilled or do not have experience volunteer: \n"
    for assignment in assignments:
        message += assignment.name + ": " + assignment.start_date.strftime('%d %B %Y - %I:%M %p') + '\n'
    send_emails("Unfilled Assignment", message, [{"email": "cs4500bha@gmail.com"},])


