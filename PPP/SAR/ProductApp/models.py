from django.db import models
from MenuApp.models import Section

# Create your models here.


class Product(models.Model):
    id_product = models.AutoField(
        primary_key=True)

    name = models.CharField(max_length=150)

    price = models.FloatField()

    description = models.TextField()

    LIST_STAGE = (
        ('available', 'Available'),
        ('exhausted', 'Exhausted')
    )

    stage = models.CharField(
        choices=LIST_STAGE,
        max_length=12)

    section_id = models.ForeignKey(
        Section,
        on_delete=models.PROTECT)

    def __str__(self):
        return f'Product {self.id_product}: {self.name}'
