from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required, user_passes_test
import logging
from .models import Detected, Registered


@login_required(login_url='conta/login/?next=/conta/')
def home_page(request):
    return render(request, 'index.html')


def login(request):
    return render(request, 'login.html')


# def setcookie(request):
# response = HttpResponse(login(request))
# if request.method == "POST":
#     username = request.POST["username"]
#     password = request.POST["password"]
#     response.set_cookie("user", username)
# return response


@login_required(login_url='conta/login/?next=/conta/')
def alertas(request):
    detected = Detected.objects.all()
    context = {'detected': detected}
    return render(request, 'alertas.html', context)


@login_required(login_url='conta/login/?next=/conta/')
@user_passes_test(lambda u: u.groups.filter(name='Admins').exists())
def consola(request):
    return render(request, 'consola.html')


@login_required(login_url='conta/login/?next=/conta/')
def logs(request):
    detected = Detected.objects.all()
    context = {'detected': detected}
    return render(request, 'logs.html', context)


@login_required(login_url='conta/login/?next=/conta/')
def utilizadores(request):
    users = User.objects.all()
    context = {"users": users}
    return render(request, 'utilizadores.html', context)

@login_required(login_url='conta/login/?next=/conta/')
@user_passes_test(lambda u: u.groups.filter(name='Admins').exists())
def registados(request):
    registados = Registered.objects.all()
    context = {"registados": registados}
    return render(request, 'registados.html', context)