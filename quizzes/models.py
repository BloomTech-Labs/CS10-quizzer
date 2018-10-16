from django.db import models
from uuid import uuid4

# Create your models here.
class Teacher(models.Model):
    TeacherID     = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    TeacherEmail  = models.CharField(max_length=256, unique=True, blank=False)
    TeacherName   = models.CharField(max_length=50, blank=False)
    TeacherPW     = models.CharField(max_length=256, blank=False)
    CustomerID    = models.CharField(max_length=256, blank=True)
    Subscription  = models.CharField(max_length=256, blank=True)
    created_at    = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        db_table            = 'Teachers'
        verbose_name_plural = 'teachers'


class Class(models.Model):
    ClassID       = models.UUIDField(primary_key=True, default = uuid4, editable = False)
    ClassName     = models.CharField(max_length = 50, blank = False)
    Teacher       = models.ForeignKey('Teacher', on_delete=models.CASCADE)
    cc_emails     = models.BooleanField(default=False)
    created_at    = models.DateTimeField(auto_now_add = True)
    last_modified = models.DateTimeField(auto_now = True)

    class Meta:
        db_table            = 'Classes'
        verbose_name_plural = 'classes'


class Quiz(models.Model):
    QuizID        = models.UUIDField(primary_key=True, default = uuid4, editable = False)
    QuizName      = models.CharField(max_length = 100, blank = False)
    Teacher       = models.ForeignKey('Teacher', on_delete=models.CASCADE)
    Classes       = models.ManyToManyField(Class)
    Public        = models.BooleanField(default=True)
    created_at    = models.DateTimeField(auto_now_add = True)
    last_modified = models.DateTimeField(auto_now = True)

    class Meta:
        db_table            = 'Quizzes'
        verbose_name_plural = 'quizzes'


class Question(models.Model):
    QuestionID    = models.UUIDField(primary_key=True, default = uuid4, editable = False)
    QuizID        = models.ForeignKey('Quiz', on_delete = models.CASCADE)
    QuestionText  = models.TextField(blank = False)
    isMajor       = models.BooleanField(default=True, blank=False)
    created_at    = models.DateTimeField(auto_now_add = True)
    last_modified = models.DateTimeField(auto_now = True)

    class Meta:
        db_table            = 'Questions'
        verbose_name_plural = 'questions'
    

class Choice(models.Model):
    ChoiceID      = models.UUIDField(primary_key=True, default = uuid4, editable = False)
    QuestionID    = models.ForeignKey('Question', on_delete = models.CASCADE)
    ChoiceText    = models.TextField()
    isCorrect     = models.BooleanField()
    status        = models.BooleanField()
    created_at    = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        db_table            = 'Choices'
        verbose_name_plural = 'choices'


class Student(models.Model):
    StudentID     = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    StudentName   = models.CharField(max_length=50, blank=False)
    StudentEmail  = models.CharField(max_length=256, blank=False)
    ClassID       = models.ManyToManyField(Class)
    Quizzes       = models.ManyToManyField(Quiz)
    created_at    = models.DateTimeField(auto_now_add=True)
    created_at    = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        db_table            = 'Students'
        verbose_name_plural = 'students'

class QuizQuestionChoice(models.Model):
    QQCID    = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    Quiz     = models.ForeignKey('Quiz', on_delete=models.CASCADE)
    Question = models.ForeignKey('Question', on_delete=models.CASCADE)
    Choice   = models.ForeignKey('Choice', on_delete=models.CASCADE)


class QuizScores(models.Model):
    QuizScoresID  = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    StudentID     = models.UUIDField(blank=False)
    QuizID        = models.UUIDField(blank=False)
    QuizName      = models.CharField(max_length=256, blank=False)
    ClassID       = models.ForeignKey('Class', on_delete=models.CASCADE)
    Score         = models.IntegerField(default=0)
    created_at    = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        db_table            = 'QuizScores'
        verbose_name_plural = 'QuizScores'
