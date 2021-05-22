from rest_framework import serializers
from PersonApp.models import Person


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = (
            'id_person',
            'document_type',
            'document_number',
            'name',
            'lastname',
            'phone',
            'address'
        )
