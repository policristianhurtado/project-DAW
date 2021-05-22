from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from TableApp.models import Table
from TableApp.serializers import TableSerializer

# Create your views here.


@csrf_exempt
def table_api(request, id=0):
    if request.method == 'GET':
        table = Table.objects.all()
        table_serializer = TableSerializer(table, many=True)
        return JsonResponse(table_serializer.data, safe=False)

    elif request.method == 'POST':
        table_data = JSONParser().parse(request)
        table_serializer = TableSerializer(data=table_data)
        if table_serializer.is_valid():
            table_serializer.save()
            return JsonResponse("Saved Successfully !!", safe=False)
        return JsonResponse('Failed to save', safe=False)

    elif request.method == 'PUT':
        table_data = JSONParser().parse(request)
        table = Table.objects.get(
            id_table=table_data['id_table']
        )
        table_serializer = TableSerializer(table, data=table_data)
        if table_serializer.is_valid():
            table_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method == 'DELETE':
        table = Table.objects.get(id_table=id)
        table.delete()
        return JsonResponse("Deleted Successfully!!", safe=False)

@csrf_exempt
def get_table_api(request, id=0):
    if request.method == 'GET':
        table = Table.objects.get(id_table=id)
        table_serializer = TableSerializer(table)
        return JsonResponse(table_serializer.data, safe=False)

