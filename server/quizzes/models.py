from django.db import models
from uuid import uuid4

# Create your models here.

class Class(models.Model):
    ClassesID = models.UUIDField(primary_key=True, default = uuid4, editable = False)
    ClassName = models.CharField(max_length = 50, blank = False)
    created_at = models.DateTimeField(auto_now_add = True)
    last_modified = models.DateTimeField(auto_now = True)

class Quiz(models.Model):
    QuizID = models.UUIDField(primary_key=True, default = uuid4, editable = False)
    ClassesID = models.ForeignKey('Class', on_delete = models.CASCADE)
    QuizName = models.CharField(max_length = 100, blank = False)
    created_at = models.DateTimeField(auto_now_add = True)
    last_modified = models.DateTimeField(auto_now = True)

class Question(models.Model):
    QuestionID = models.UUIDField(primary_key=True, default = uuid4, editable = False)
    QuizID = models.ForeignKey('Quiz', on_delete = models.CASCADE)
    Question = models.TextField(blank = False)
    created_at = models.DateTimeField(auto_now_add = True)
    last_modified = models.DateTimeField(auto_now = True)
    

class Choice(models.Model):
    ChoiceID = models.UUIDField(primary_key=True, default = uuid4, editable = False)
    QuestionID = models.ForeignKey('Question', on_delete = models.CASCADE)
    Choice = models.TextField(blank = False)
    isCorrect = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add = True)
    last_modified = models.DateTimeField(auto_now = True)