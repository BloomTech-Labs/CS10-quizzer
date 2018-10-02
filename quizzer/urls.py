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
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from graphene_django.views import GraphQLView
from quizzes import api, views

urlpatterns = [
    path('sms/', api.send_sms_notification, name='sms'),
    path('sendgrid/', api.send_email, name='sendgrid'),
    path('graphiql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path('api/payments/basic', csrf_exempt(api.basic_subscription), name='basic_subscription'),
    path('api/payments/premium', csrf_exempt(api.premium_subscription), name='premium_subscription'),
    path('admin/', admin.site.urls),

    # REACT URLS
    path('rocket/', TemplateView.as_view(template_name='index.html')),
    path('rocket/quizzes/', TemplateView.as_view(template_name='index.html')),
    path('rocket/classes/', TemplateView.as_view(template_name='index.html')),
    path('rocket/classes/editclass/', TemplateView.as_view(template_name='index.html')),
    path('rocket/billing/', TemplateView.as_view(template_name='index.html')),
    path('rocket/settings/', TemplateView.as_view(template_name='index.html')),
    path('', TemplateView.as_view(template_name='index.html'))
]
