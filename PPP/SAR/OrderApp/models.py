from django.db import models
from PersonApp.models import Person
from TableApp.models import Table
from ProductApp.models import Product

# Create your models here.


class Order(models.Model):
    id_order = models.AutoField(
        primary_key=True)

    customer_id = models.ForeignKey(
        Person,
        on_delete=models.PROTECT
    )

    table_id = models.ForeignKey(
        Table,
        on_delete=models.PROTECT
    )

    product_id = models.ForeignKey(
        Product,
        on_delete=models.PROTECT
    )

    note = models.TextField()

    LIST_STAGES = (
        ('to_do', 'To Do'),
        ('in_progress', 'In Progress'),
        ('finalized', 'Finalized'),
        ('cancelled', 'Cancelled'),
    )

    stage = models.CharField(
        choices=LIST_STAGES,
        max_length=11
    )

    def __str__(self):
        return f'Order {self.id_order}: ' \
               f'{self.customer_id}, ' \
               f'{self.table_id}, ' \
               f'{self.product_id}'
