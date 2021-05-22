from django.conf.urls import url
from MenuApp import views

urlpatterns = [
    url(r'^section/$', views.section_api),
    url(r'^section/([0-9]+)$', views.section_api),
    url(r'^get_section/([0-9]+)$', views.get_section_api),
    url(r'^menu/$', views.menu_api),
    url(r'^menu/([0-9]+)$', views.menu_api),
    url(r'^get_menu/([0-9]+)$', views.get_menu_api),
]
