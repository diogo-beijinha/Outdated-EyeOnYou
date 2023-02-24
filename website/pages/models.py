from django.db import models


# Create your models here.

class Detected(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date = models.DateTimeField()
    recognized = models.BooleanField()


class Logs(models.Model):
    email_addr = models.CharField(max_length=100)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date = models.DateTimeField()
    code = models.IntegerField()
    success = models.SmallIntegerField()
    platform = models.CharField(max_length=20)
    end_ip = models.CharField(max_length=20)


class Registered(models.Model):
    name = models.CharField(max_length=100)
    user_id = models.CharField(max_length=100)
    date = models.DateTimeField()
    created_by = models.CharField(max_length=100)


class Test(models.Model):
    stuff = models.CharField(max_length=20)
