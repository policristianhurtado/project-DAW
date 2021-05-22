from django.core.mail import send_mail, BadHeaderError, EmailMultiAlternatives
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.conf import settings
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
from django.template.loader import render_to_string

from OrderApp.models import Order
from PersonApp.models import Person
from ProductApp.models import Product
from OrderApp.serializers import OrderSerializer

# Create your views here.


@csrf_exempt
def order_api(request, id=0):
    if request.method == 'GET':
        order = Order.objects.all()
        order_serializer = OrderSerializer(order, many=True)
        return JsonResponse(order_serializer.data, safe=False)

    elif request.method == 'POST':
        order_data = JSONParser().parse(request)
        order_serializer = OrderSerializer(data=order_data)
        if order_serializer.is_valid():
            order_serializer.save()

            return JsonResponse("Saved Successfully !!", safe=False)
        return JsonResponse('Failed to save', safe=False)

    elif request.method == 'PUT':
        order_data = JSONParser().parse(request)
        order = Order.objects.get(
            id_order=order_data['id_order']
        )
        order_serializer = OrderSerializer(order, data=order_data)
        if order_serializer.is_valid():
            order_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method == 'DELETE':
        order = Order.objects.get(id_order=id)
        order.delete()
        return JsonResponse("Deleted Successfully!!", safe=False)


@csrf_exempt
def get_order_api(request, id=0):
    if request.method == 'GET':
        order = Order.objects.get(id_order=id)
        order_serializer = OrderSerializer(order)
        return JsonResponse(order_serializer.data, safe=False)


@csrf_exempt
def state_order_api(request, id=0):
    if request.method == 'PUT':
        order_data = JSONParser().parse(request)
        print(order_data)
        print(order_data['stage'])
        order = Order.objects.get(
            id_order=order_data['id_order']
        )
        order_serializer = OrderSerializer(order, data=order_data)
        if order_serializer.is_valid():
            order_serializer.save()
            if order_data['stage'] == "finalized":
                person = Person.objects.get(
                    id_person=order_data['customer_id']
                )
                product = Product.objects.get(
                    id_product=order_data['product_id']
                )
                send_mail(person, product)
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

"""
def _send_order_api(obj):
    state = False
    subject = obj['subject']
    message = obj['message']
    to_email = obj['toEmail']
    from_email = settings.EMAIL_HOST_USER
    try:
        send_mail(subject, message, from_email, to_email)
        state = True
    except BadHeaderError:
        return BadHeaderError
    return state
"""


@csrf_exempt
def index(request):
    if request.method == 'POST':
        mail = request.POST.get('email')
        send_mail(mail)
        print(settings.STATIC_ROOT)

    return render(request, 'index.html')


def send_mail(person, product):
    try:
        mail = person.email
        mailServer = smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT)
        print(mailServer.ehlo())
        mailServer.starttls()
        print(mailServer.ehlo())
        mailServer.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
        print('Conectado..')

        email_to = mail
        # Construimos el mensaje simple
        mensaje = MIMEMultipart()
        mensaje['From'] = settings.EMAIL_HOST_USER
        mensaje['To'] = email_to
        mensaje['Subject'] = "Tienes un correo"

        content = render_to_string('send_mail.html', {'dato': person.name, 'product': product.name, 'price': product.price})
        mensaje.attach(MIMEText(content, 'html'))

        mailServer.sendmail(settings.EMAIL_HOST_USER,
                            email_to,
                            mensaje.as_string())

        print('Correo enviado correctamente')

    except Exception as e:
        print(e)


"""
    context = {'mail': mail}
    template = get_template('mail.html')
    content = template.render(context)

    email = EmailMultiAlternatives(
        'Prueba',
        'Prueba super duper',
        settings.EMAIL_HOST_USER,
        [mail]
    )

    email.attach_alternative(content, 'text/html')
    email.send()
"""