from graphene_django import DjangoObjectType

from quizzes.models import (
    Class, Quiz, Question, Choice, Teacher, Student
)

class ClassType(DjangoObjectType):
    '''
    ClassType GraphQL Schema
    '''
    class Meta:
        model = Class


class QuizType(DjangoObjectType):
    '''
    QuizType GraphQL Schema
    '''
    class Meta:
        model = Quiz


class QuestionType(DjangoObjectType):
    '''
    Question GraphQL Schema
    '''
    class Meta:
        model = Question


class ChoiceType(DjangoObjectType):
    '''
    ChoiceType GraphQL Schema
    '''
    class Meta:
        model = Choice


class TeacherType(DjangoObjectType):
    '''
    TeacherType GraphQL Schema
    '''
    class Meta:
        model = Teacher


class StudentType(DjangoObjectType):
    '''
    StudentType GraphQL Schema
    '''
    class Meta:
        model = Student