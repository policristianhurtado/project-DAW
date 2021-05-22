from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from MenuApp.models import Menu, Section
from MenuApp.serializers import SectionSerializer, MenuSerializer

# Create your views here.


@csrf_exempt
def section_api(request, id=0):
    if request.method == 'GET':
        section = Section.objects.all()
        section_serializer = SectionSerializer(section, many=True)
        return JsonResponse(section_serializer.data, safe=False)

    elif request.method == 'POST':
        section_data = JSONParser().parse(request)
        section_serializer = SectionSerializer(data=section_data)
        if section_serializer.is_valid():
            section_serializer.save()
            return JsonResponse("Saved Successfully !!", safe=False)
        return JsonResponse('Failed to save', safe=False)

    elif request.method == 'PUT':
        section_data = JSONParser().parse(request)
        section = Section.objects.get(
            id_section=section_data['id_section']
        )
        section_serializer = SectionSerializer(section, data=section_data)
        if section_serializer.is_valid():
            section_serializer.save()
            return JsonResponse("Updated Succes"
                                "sfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method == 'DELETE':
        section = Section.objects.get(id_section=id)
        section.delete()
        return JsonResponse("Deleted Successfully!!", safe=False)


@csrf_exempt
def get_section_api(request, id=0):
    if request.method == 'GET':
        section = Section.objects.get(id_section=id)
        section_serializer = SectionSerializer(section)
        return JsonResponse(section_serializer.data, safe=False)


@csrf_exempt
def menu_api(request, id=0):
    if request.method == 'GET':
        menu = Menu.objects.all()
        menu_serializer = MenuSerializer(menu, many=True)
        return JsonResponse(menu_serializer.data, safe=False)

    elif request.method == 'POST':
        menu_data = JSONParser().parse(request)
        menu_serializer = MenuSerializer(data=menu_data)
        if menu_serializer.is_valid():
            menu_serializer.save()
            return JsonResponse("Saved Successfully !!", safe=False)
        return JsonResponse('Failed to save', safe=False)

    elif request.method == 'PUT':
        menu_data = JSONParser().parse(request)
        menu = Menu.objects.get(
            id_menu=menu_data['id_menu']
        )
        menu_serializer = MenuSerializer(menu, data=menu_data)
        if menu_serializer.is_valid():
            menu_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method == 'DELETE':
        menu = Menu.objects.get(id_menu=id)
        menu.delete()
        return JsonResponse("Deleted Successfully!!", safe=False)


@csrf_exempt
def get_menu_api(request, id=0):
    if request.method == 'GET':
        menu = Menu.objects.get(id_menu=id)
        menu_serializer = MenuSerializer(menu)
        return JsonResponse(menu_serializer.data, safe=False)
