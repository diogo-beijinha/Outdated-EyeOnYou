from django.shortcuts import render
from django.contrib.auth.decorators import login_required


@login_required(login_url='conta/login/?next=/conta/')
def emptypage(request):
    return render(request, 'empty.html')
