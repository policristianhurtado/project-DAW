from django.contrib import admin
from django.urls import path
from django.conf.urls import url,include
from rest_framework.schemas import get_schema_view
from rest_framework_swagger.renderers import SwaggerUIRenderer, OpenAPIRenderer

schema_view = get_schema_view(title='Users API', renderer_classes=[OpenAPIRenderer, SwaggerUIRenderer])

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include('MenuApp.urls')),
    url(r'^', include('PersonApp.urls')),
    url(r'^', include('ProductApp.urls')),
    url(r'^', include('OrderApp.urls')),
    url(r'^', include('TableApp.urls')),
    url(r'^', schema_view, name="docs"),
]
