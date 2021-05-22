from rest_framework import serializers
from TableApp.models import Table


class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = (
            'id_table',
            'table_number',
            'location',
            'state',
            'responsible',
        )
