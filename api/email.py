from django.core.mail import send_mail


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