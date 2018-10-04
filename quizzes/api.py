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
    '''
    NOTE: for now this function is not being used and does not have any plans
          of being used in the future
    '''
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
    body = json.loads(req.body.decode('utf-8'))
    teacher_name = body['teacherName']
    teacher_email = body['teacherEmail']
    class_name = body['className']
    class_id = body['classID']
    students = body['students']
    quiz_name = body['quizName']
    quiz_id = body['quizID']

    sg = sendgrid.SendGridAPIClient(
        apikey=config('SENDGRID_API_KEY')
    )

    from_email = Email(teacher_email)

    for student in students:
        student_id = student['id']
        student_name = student['name']
        student_email = student['email']

        to_email = Email(student_email)
        subject = f'New quiz from {teacher_name}'

        content = Content(
            'text/html',
            f'''
            <p>Hello <b>{student_name}</b></p>
            <p>You have a new quiz from <b>{teacher_name}</b> for the class <b>{class_name}</b><p>
            <p>To take this quiz follow the link here: <a href="https://quizzercs10.herokuapp.com/student/{quiz_id}/{class_id}/{student_id}/">{quiz_name}</a></p>
            '''
            )

        mail = Mail(from_email, subject, to_email, content)
        response = sg.client.mail.send.post(request_body=mail.get())

    return HttpResponse('Email sent!')
