from django.conf.urls import url
from OrderApp import views

urlpatterns = [
    url(r'^order/$', views.order_api),
    url(r'^order/([0-9]+)$', views.order_api),
    url(r'^get_order/([0-9]+)$', views.get_order_api),
    url(r'^state_order/([0-9]+)$', views.state_order_api),
    url('index', views.index, name="index")
]
