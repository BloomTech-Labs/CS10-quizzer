import graphene

from graphene_django import DjangoObjectType
from quizzes.graphql.mutation import CreateClass
from quizzes.models import Class, Quiz, Question, Choice, Teacher, Student

from quizzes.graphql.query import (
    ClassType, QuizType, QuestionType, ChoiceType, TeacherType, StudentType
)



class Mutation(graphene.ObjectType):
    '''
    Mutation class allows us to make POST/Mutation requests to create new
    fields
    '''
    create_class = CreateClass.Field()


class Query(graphene.ObjectType):
    '''
    Allows us to make GET/Query requests from the DB using GraphQL
    '''
    classes    = graphene.List(ClassType)
    quizzes    = graphene.List(QuizType)
    questions  = graphene.List(QuestionType)
    choices    = graphene.List(ChoiceType)
    teachers   = graphene.List(TeacherType)
    students   = graphene.List(StudentType)

    '''
    Each method, resolve_<< name >>, is named after what we want to return.
    For example, we have a property called `classes` so we name our
    `resolve_` method `resolve_classes()` which will then return our query
    to `Class.objects.all()` from the DB
    '''
    def resolve_classes(self, info):
        return Class.objects.all()

    def resolve_quizzes(self, info):
        return Quiz.objects.all()

    def resolve_questions(self, info):
        return Question.objects.all()

    def resolve_choices(self, info):
        return Choice.objects.all()

    def resolve_teachers(self, info):
        return Teacher.objects.all()

    def resolve_students(self, info):
        return Student.objects.all()


schema = graphene.Schema(query=Query, mutation=Mutation)