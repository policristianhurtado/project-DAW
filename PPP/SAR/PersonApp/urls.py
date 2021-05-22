from django.conf.urls import url
from PersonApp import views

urlpatterns = [
    url(r'^person/$', views.person_api),
    url(r'^person/([0-9]+)$', views.person_api)
]