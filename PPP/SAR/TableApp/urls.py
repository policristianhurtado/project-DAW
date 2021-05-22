from django.conf.urls import url
from TableApp import views

urlpatterns = [
    url(r'^table/$', views.table_api),
    url(r'^table/([0-9]+)$', views.table_api),
    url(r'^get_table/([0-9]+)$', views.get_table_api)
]
