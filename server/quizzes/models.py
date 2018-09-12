from django.db import models
from uuid import uuid4

# Create your models here.

class Class(models.Model):
    ClassesID = models.UUIDField(primary_key=True, default = uuid4, editable = False)
    ClassName = models.CharField(max_length = 50, blank = False)
    created_at = models.DateTimeField(auto_now_add = True)
    last_modified = models.DateTimeField(auto_now = True)

    class Meta:
        db_table = 'Classes'
        verbose_name_plural = 'classes'

class Quiz(models.Model):
    QuizID = models.UUIDField(primary_key=True, default = uuid4, editable = False)
    ClassesID = models.ForeignKey('Class', on_delete = models.CASCADE)
    QuizName = models.CharField(max_length = 100, blank = False)
    Public = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add = True)
    last_modified = models.DateTimeField(auto_now = True)

    class Meta:
        db_table = 'Quizzes'
        verbose_name_plural = 'quizzes'

class Question(models.Model):
    QuestionID = models.UUIDField(primary_key=True, default = uuid4, editable = False)
    QuizID = models.ForeignKey('Quiz', on_delete = models.CASCADE)
    Question = models.TextField(blank = False)
    created_at = models.DateTimeField(auto_now_add = True)
    last_modified = models.DateTimeField(auto_now = True)

    class Meta:
        db_table = 'Questions'
        verbose_name_plural = 'questions'
    

class Choice(models.Model):
    ChoiceID = models.UUIDField(primary_key=True, default = uuid4, editable = False)
    QuestionID = models.ForeignKey('Question', on_delete = models.CASCADE)
    Choice = models.TextField(blank = False)
    isCorrect = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add = True)
    last_modified = models.DateTimeField(auto_now = True)

    class Meta:
        db_table = 'Choices'
        verbose_name_plural = 'choices'


class Teacher(models.Model):
    TeacherID = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    TeacherName = models.CharField(max_length=50, blank=False)
    ClassID = models.ForeignKey('Class', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Teachers'
        verbose_name_plural = 'teachers'


class Student(models.Model):
    StudentID = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    StudentName = models.CharField(max_length=50, blank=False)
    ClassID = models.ForeignKey('Class', on_delete=models.CASCADE)
    TeacherID = models.ForeignKey('Teacher', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Students'
        verbose_name_plural = 'students'