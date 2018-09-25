import jwt
import time
import sendgrid

from decouple import config
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from twilio.rest import Client
from decouple import config
from sendgrid.helpers.mail import *

def get_jwt(req):
    secret = config('SECRET_KEY')
    algorithm = 'HS256'
    payload = {
        'sub': 'username',
        'iat': time.time(),
        'exp': time.time() + 86400
    }

    encode_jwt = jwt.encode(payload, secret, algorithm=algorithm)
    utf8_jwt = encode_jwt.decode('utf-8')

    return JsonResponse({ 'token': utf8_jwt })

def send_sms_notification(req):
    account_sid = config('TWILIO_SID')
    auth_token = config('TWILIO_AUTH_TOKEN')

    client = Client(account_sid, auth_token)

    message = client.messages.create(
        to='+14077236293',
        from_='+13396666589',
        body='Hello from Python!'
    )

    return JsonResponse({
        'statusText': 'OK',
        'statusCode': 200
    })

def send_email(req):
    sg = sendgrid.SendGridAPIClient(
        apikey = config('SENDGRID_API_KEY')
    )

    from_email = Email('test@example.com')
    to_email = Email('test@example.com')
    subject = 'Sendgrid Test'
    content = Content(
        'text/plain',
        'Test test test'
    )
    mail = Mail(from_email, subject, to_email, content)
    response = sg.client.mail.send.post(request_body=mail.get())

    return HttpResponse('Email sent!')
