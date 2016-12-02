import django.utils.timezone as timezone
import kronos
from django.db.models import Q

import api.email as mailer
from api.models import Assignment


@kronos.register('0 8 * * *')
def unfilled_assignment():
    notify_staff_of_assignments_with_no_volunteers(timezone.timedelta(days=2))
    notify_staff_of_assignments_with_no_volunteers(timezone.timedelta(days=7))
    send_volunteer_reminders(timezone.timedelta(days=2))
    send_volunteer_reminders(timezone.timedelta(days=7))


def notify_staff_of_assignments_with_no_volunteers(timedelta):
    start_date = timezone.datetime.now().date() + timedelta
    end_date = start_date + timezone.timedelta(days=1)
    assignments = Assignment.objects \
        .filter(Q(volunteers__isnull=True) | Q(volunteers__volunteer_level__lt=4)) \
        .filter(start_date__gt=start_date, start_date__lt=end_date)
    if assignments:
        mailer.send_staff_assignments_no_volunteers(assignments)


def send_volunteer_reminders(timedelta):
    start_date = timezone.datetime.now().date() + timedelta
    end_date = start_date + timezone.timedelta(days=1)
    upcoming_assignments = Assignment.objects.all() \
        .filter(volunteers__isnull=False) \
        .filter(start_date__gt=start_date, start_date__lt=end_date)
    for assignment in upcoming_assignments:
        for volunteer in assignment.volunteers.all():
            mailer.send_volunteer_upcoming_assignment(volunteer.contact, volunteer, assignment)
