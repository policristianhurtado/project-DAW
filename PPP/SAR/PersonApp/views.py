from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from PersonApp.models import Person
from PersonApp.serializers import PersonSerializer

# Create your views here.


@csrf_exempt
def person_api(request, id=0):
    if request.method == 'GET':
        person = Person.objects.all()
        person_serializer = PersonSerializer(person, many=True)
        return JsonResponse(person_serializer.data, safe=False)

    elif request.method == 'POST':
        person_data = JSONParser().parse(request)
        person_serializer = PersonSerializer(data=person_data)
        if person_serializer.is_valid():
            person_serializer.save()
            return JsonResponse("Exito", safe=False)
        return JsonResponse('Fallido', safe=False)

    elif request.method == 'PUT':
        person_data = JSONParser().parse(request)
        person = Person.objects.get(
            id_person=person_data['id_person']
        )
        person_serializer = PersonSerializer(person, data=person_data)
        if person_serializer.is_valid():
            person_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method == 'DELETE':
        person = Person.objects.get(id_person=id)
        person.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)
