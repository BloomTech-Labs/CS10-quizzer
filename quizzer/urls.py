"""quizzer URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from graphene_django.views import GraphQLView
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from quizzes import api

urlpatterns = [
    path('sms/', api.send_sms_notification, name='sms'),
    path('sendgrid/', api.send_email, name='sendgrid'),
    path('graphiql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path('api/login/', api.get_jwt, name='get_jwt'),
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html'))
]
