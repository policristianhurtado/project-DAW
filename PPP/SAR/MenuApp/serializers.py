from rest_framework import serializers

from MenuApp.models import Section, Menu


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = (
            'id_menu',
            'name'
        )


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = (
            'id_section',
            'name',
            'menu_id'
        )
