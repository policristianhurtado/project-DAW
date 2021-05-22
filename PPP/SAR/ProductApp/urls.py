from django.conf.urls import url
from django.urls import path

from ProductApp import views
from ProductApp.views import TestView

urlpatterns = [
    url(r'^product/$', views.product_api),
    url(r'^product/([0-9]+)$', views.product_api),
    url(r'^get_product/([0-9]+)$', views.get_product_api),
    path('test/', TestView.as_view(), name="test")
]
