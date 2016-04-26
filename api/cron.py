import kronos
import datetime
from django.db.models import Q
from .email import send_emails, send_volunteer_welcome, send_staff_assignments_no_volunteers, send_volunteer_upcoming_translation, send_volunteer_upcoming_appointment, send_staff_new_account_notice, send_volunteer_welcome_staff_created, send_volunteer_new_opportunities
from .models import Assignment

@kronos.register('0 8 * * *')
def unfilled_assignment():
    today = datetime.date.today()
    assignments = Assignment.objects.all().filter(Q(volunteers__isnull=True) | Q(volunteers__volunteer_level__lt=4)).filter(start_date__lt= today + datetime.timedelta(days=6))
    # process_notification(volunteer_welcome_subject, sub_volunteer_welcome('Brian'), [{"email":"sonichedgehog7115@gmail.com"}, ], [])
    #send_volunteer_welcome('Anu', [{'8573139589'}])
    #send_volunteer_upcoming_translation("Anu Singh", "BHA Application", "Spanish", "2016-04-28", [])
    #send_volunteer_upcoming_appointment("Anu Singhh", "BHA Application 1", "13 Main St.", "2015-04-28",
    #                                    "00:00:01", [])
    #send_staff_assignments_no_volunteers("jowrfjweoirjwfwjngfjwef", [])
    #send_staff_new_account_notice("Anu Singh", "as@gmail.com", "1234567890", [])
    #send_volunteer_welcome_staff_created("Anu Singh", "password123", [])
    #send_volunteer_new_opportunities("Anu Singh", "ffenooq\nnqnofqof\n", [])
    if assignments:
        message = ""
        for assignment in assignments:
            message += assignment.name + " at " + assignment.contact.street + " on " + assignment.start_date + "\n"
        send_staff_assignments_no_volunteers(message, [])

    # Sending emails to volunteers for upcoming appointments/translations
    # Filter assignments due in 2 days with assigned volunteers
    upcoming_assignments = Assignment.objects.all().filter(Q(volunteers__isnull=False) | Q(volunteers__volunteer_level__lt=4)).filter(start_date__lt= today + datetime.timedelta(days=2))
    if assignments:
        for a in upcoming_assignments:
            if a.type == "written":
                # Send notification to every volunteer assigned to the translation
                for v in a.volunteers:
                    send_volunteer_upcoming_translation(v.name, a.name, a.language_name, a.start_date,
                                                              "TIME GOES HERE", [])
            if a.type == "in-person" | a.type == "training":
                # Send notification to every volunteer assigned to the appointment
                for v in a.volunteers:
                    send_volunteer_upcoming_appointment(v.name, a.name, a.contact.street, a.start_date,
                                                              "TIME GOES HERE", [])
