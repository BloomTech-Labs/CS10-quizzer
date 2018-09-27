import json
import jwt
import time
import sendgrid
import stripe

from decouple import config
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from quizzes.models import Teacher
from twilio.rest import Client
from sendgrid.helpers.mail import *


class CreateSubscription:
    def __init__(self, stripe_secret_key, body, plan, sub):
        self.stripe_secret_key = stripe_secret_key
        self.body              = body
        self.plan              = plan
        self.sub               = sub
        self.jwt               = None
        self.id                = None
        self.email             = None
        self.customer          = None
        self.Teacher           = None

    def get_teacher(self):
        secret       = config('SECRET_KEY')
        algorithm    = 'HS256'
        decJWT       = jwt.decode(self.jwt, secret, algorithms=[ algorithm ])
        teacherID    = decJWT['sub']['id']
        self.Teacher = Teacher.objects.get(TeacherID=teacherID)

        return self.Teacher

    def check_if_customer_exists(self):
        teacher = self.get_teacher()
        customerID = teacher.CustomerID
        
        if bool(customerID):
            return True

        return False

    def set_api_key(self):
        stripe.api_key = self.stripe_secret_key

    def parse_body(self):
        self.body  = json.loads(self.body.decode('utf-8'))
        self.id    = self.body['token']['id']
        self.email = self.body['token']['email']
        self.jwt   = self.body['jwt']

    def create_customer(self):
        self.set_api_key()
        
        self.customer = stripe.Customer.create(
            email=self.email,
            source=self.id
        )

    def update_teacher(self):
        self.create_customer()
        self.Teacher.CustomerID = self.customer.id
        self.Teacher.Subscription = self.sub
        print(self.Teacher.CustomerID)
        self.Teacher.save(update_fields=['CustomerID'])

    def create_subscription(self):
        self.update_teacher()
        
        stripe.Subscription.create(
            customer=self.customer.id,
            items=[{ 'plan': self.plan }]
        )


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
