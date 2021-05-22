from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from ProductApp.models import Product
from ProductApp.serializers import ProductSerializer

# Create your views here.


@csrf_exempt
def product_api(request, id=0):
    if request.method == 'GET':
        product = Product.objects.all()
        product_serializer = ProductSerializer(product, many=True)
        return JsonResponse(product_serializer.data, safe=False)

    elif request.method == 'POST':
        product_data = JSONParser().parse(request)
        product_serializer = ProductSerializer(data=product_data)
        if product_serializer.is_valid():
            product_serializer.save()
            return JsonResponse('Saved Successfully !!!', safe=False)
        return JsonResponse('Failed to save !!!', safe=False)

    elif request.method == 'PUT':
        product_data = JSONParser().parse(request)
        product = Product.objects.get(id_product=product_data['id_product'])
        product_serializer = ProductSerializer(product, data=product_data)
        if product_serializer.is_valid():
            product_serializer.save()
            return JsonResponse("Updated Successfully !!!", safe=False)
        return JsonResponse("Failed to update !!!", safe=False)

    elif request.method == 'DELETE':
        product = Product.objects.get(id_product=id)
        product.delete()
        return JsonResponse('Deleted Successfully !!!')


@csrf_exempt
def get_product_api(request, id=0):
    if request.method == 'GET':
        product = Product.objects.get(id_product=id)
        product_serializer = ProductSerializer(product)
        return JsonResponse(product_serializer.data, safe=False)


class TestView(TemplateView):
    template_name = 'send_mail.html'
