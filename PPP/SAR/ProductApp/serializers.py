from rest_framework import serializers
from ProductApp.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'id_product',
            'name',
            'price',
            'description',
            'stage',
            'section_id'
        )

