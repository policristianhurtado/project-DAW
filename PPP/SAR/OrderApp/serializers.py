from rest_framework import serializers
from OrderApp.models import Order


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            'id_order',
            'customer_id',
            'table_id',
            'product_id',
            'note',
            'stage'
        )
