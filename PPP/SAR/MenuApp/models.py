from django.db import models

# Create your models here.


class Menu(models.Model):
    id_menu = models.AutoField(
        primary_key=True)

    name = models.CharField(
        max_length=150)

    def __str__(self):
        return f'Menu {self.id_menu}: {self.name}'


class Section(models.Model):
    id_section = models.AutoField(
        primary_key=True)

    name = models.CharField(
        max_length=150)

    menu_id = models.ForeignKey(
        Menu,
        on_delete=models.PROTECT)

    def __str__(self):
        return f'Section {self.id_section}: {self.name_section}, {self.menu_id}'
