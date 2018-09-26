import json
import jwt
import time
import sendgrid
import stripe

from decouple import config
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from twilio.rest import Client
from decouple import config
from sendgrid.helpers.mail import *


def make_payments(req):
    '''
    TODO: prevent requests that are not authenticated from making transactions
          this can be accomplished by checking req.body. From there we will
          most likely want to check the JWT or some header that we can send
          from the client

    TODO: dynamically set: amount, recept_email

    TODO: find out how to set currency depending on the users location
    '''
    if req.method == 'POST':
        # sets the stripe API key
        stripe.api_key = config('STRIPE_SECRET_KEY')
        products = stripe.Product().list()

        print(req.body)


        # TODO: write two different endpoints
        #       one will be for 'Quizzer Basic' product
        #       other will be for 'Quizzer Premium' product
        

        # for i in range(len(products.data)):
        #     if products.data[i]['name'] == 'Quizzer Basic':
        #         print(products.data[i]['id'])

        # makes a charge for 500 cents ($5.00USD)
        # charge = stripe.Charge.create(
        #     amount=500,
        #     currency='usd',
        #     source='tok_visa',
        #     receipt_email='bsquared18@gmail.com'
        # )

        return JsonResponse(json.loads(req.body.decode('utf-8')))
        
        # return JsonResponse({
        #     'statusText': 'OK',
        #     'statusCode': 200
        # })

    return JsonResponse({ 'error': 'An error occurred while maiking a payment' })


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
