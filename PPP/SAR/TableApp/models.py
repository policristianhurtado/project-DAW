from django.db import models
from PersonApp.models import Person

# Create your models here.


class Table(models.Model):
    id_table = models.AutoField(
        primary_key=True)

    table_number = models.IntegerField(
        null=False)

    location = models.CharField(
        max_length=255)

    LIST_STAGES = (
        ('occupied', 'Occupied'),
        ('available', 'Available'),
    )

    state = models.CharField(
        choices=LIST_STAGES,
        max_length=9
    )

    responsible = models.ForeignKey(
        Person,
        on_delete=models.PROTECT
    )

    def __str__(self):
        return f'Table {self.id_table}: {self.table_number}, {self.location}'


