from graphene_django import DjangoObjectType
import graphene
from quizzes.models import Class, Quiz, Question, Choice


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


class Query(graphene.ObjectType):
    '''
    Allows us to make GET/Query requests from the DB using GraphQL
    '''
    classes = graphene.List(ClassType)
    quizzes = graphene.List(QuizType)
    questions = graphene.List(QuestionType)
    choices = graphene.List(ChoiceType)

    def resolve_classes(self, info):
        return Class.objects.all()

    def resolve_quizzes(self, info):
        return Quiz.objects.all()

    def resolve_questions(self, info):
        return Question.objects.all()

    def resolve_choices(self, info):
        return Choice.objects.all()


schema = graphene.Schema(query=Query)