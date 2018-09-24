import jwt
import time

from decouple import config
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from twilio.rest import Client


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