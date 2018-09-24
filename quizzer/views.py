from django.shortcuts import render

# Create your views here.

import os

from django.http import HttpResponse
from decouple import config

import sendgrid
from sendgrid.helpers.mail import *

def index(request):
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
