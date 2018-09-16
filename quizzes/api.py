import jwt
import time

from decouple import config
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render


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