from django.db import models

# Create your models here.


class Person(models.Model):
    id_person = models.AutoField(
        primary_key=True)

    LIST_DOCUMENT_TYPE = (
        ("cc", "CC"),
        ("ce", "CE"),
        ("pe", "PE"),
        ("ti", "TI"),
    )

    document_type = models.CharField(
        max_length=2,
        choices=LIST_DOCUMENT_TYPE)

    document_number = models.CharField(
        max_length=30)

    name = models.CharField(
        max_length=100)

    lastname = models.CharField(
        max_length=100)

    phone = models.CharField(
        max_length=50)

    address = models.CharField(
        max_length=150)

    email = models.CharField(
        max_length=150)

    def __str__(self):
        return f'Person {self.id_person}: {self.name} {self.lastname}'
