import json
import jwt
import time
import sendgrid
import stripe

from decouple import config
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from quizzes.helpers.createsubscription import CreateSubscription
from quizzes.models import Teacher
from twilio.rest import Client
from sendgrid.helpers.mail import *


def basic_subscription(req):
    '''
    TODO: prevent requests that are not authenticated from making transactions
          this can be accomplished by checking req.body. From there we will
          most likely want to check the JWT or some header that we can send
          from the client

    TODO: dynamically set: amount, recept_email

    TODO: find out how to set currency depending on the users location
    '''
    if req.method == 'POST':
        create_subscription = CreateSubscription(
            config('STRIPE_SECRET_KEY'),
            req.body,
            'plan_Dfqkao8AaFuGrC',
            'Basic'
            )

        create_subscription.parse_body()
        customer_exists = create_subscription.check_if_customer_exists()

        if bool(customer_exists):
            return JsonResponse({
                'error': 'Please cancel your current subscription before starting a new one',
                'customer': customer_exists
            })

        create_subscription.create_subscription()

        return JsonResponse({
            'statusText': 'OK',
            'statusCode': 200
        })

    return JsonResponse({ 'error': 'An error occurred while maiking a payment' })


def premium_subscription(req):
    if req.method == 'POST':
        create_subscription = CreateSubscription(
            config('STRIPE_SECRET_KEY'),
            req.body,
            'plan_Dg2R9ddEFH3x95',
            'Premium'
            )

        create_subscription.parse_body()
        customer_exists = create_subscription.check_if_customer_exists()

        if bool(customer_exists):
            return JsonResponse({
                'error': 'Please cancel your current subscription before starting a new one',
                'customer': customer_exists
            })

        create_subscription.create_subscription()

        return JsonResponse({
            'statusText': 'OK',
            'statusCode': 200
        })

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
