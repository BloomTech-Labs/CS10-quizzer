import graphene
import jwt
import time

from decouple import config
from graphene_django import DjangoObjectType
from quizzes.graphql.mutation import CreateTeacher, QueryTeacher
from quizzes.graphql.mutations.classes import CreateClass
from quizzes.models import Class, Quiz, Question, Choice, Teacher, Student

from quizzes.graphql.query import (
    ClassType, QuizType, QuestionType, ChoiceType, TeacherType, StudentType
)



class Mutation(graphene.ObjectType):
    '''
    Mutation class allows us to make POST/Mutation requests to create new
    fields
    '''
    create_class   = CreateClass.Field()
    create_teacher = CreateTeacher.Field()
    query_teacher  = QueryTeacher.Field()


class Query(graphene.ObjectType):
    '''
    Allows us to make GET/Query requests from the DB using GraphQL
    '''
    classes    = graphene.List(ClassType)
    quizzes    = graphene.List(QuizType)
    questions  = graphene.List(QuestionType)
    choices    = graphene.List(ChoiceType)
    teachers   = graphene.List(TeacherType)
    teacher    = graphene.Field(
        TeacherType,
        email=graphene.String(),
        password=graphene.String()
    )
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

    '''
    Searches for a single teacher by their email address provided by login form

    ** NOTE THIS DOES NOT WORK
    ** THIS IS HERE FOR FUTURE TESTING
    ** MAYBE WE CAN MAKE THIS WORK
    '''
    def resolve_teacher(self, info, **kwargs):
        teacher_email = kwargs.get('email')
        teacher_pw    = kwargs.get('password')
        teacher       = Teacher.objects.get(TeacherEmail=teacher_email)

        if teacher:
            if teacher_pw == teacher.TeacherPW:
                # create DATA for JWT
                secret    = config('SECRET_KEY')
                algorithm = 'HS256'
                payload = {
                    'sub': {
                        'username': teacher.TeacherName,
                        'email': teacher.TeacherEmail
                    },
                    'iat': time.time(),
                    'exp': time.time() + 86400
                }

                # create JWT as a byte string e.g. b'<< JWT >>'
                enc_jwt = jwt.encode(payload, secret, algorithm=algorithm)
                # transforms JWT-byte-string into a normal UTF-8 string
                jwt_string = enc_jwt.decode('utf-8')

                print(jwt_string)
                return teacher

            else:
                print('\n\nWRONG PASSWORD\n\n')

        else:
            print('\n\nTEACHER DOES NOT EXIST\n\n')
        

    def resolve_students(self, info):
        return Student.objects.all()


schema = graphene.Schema(query=Query, mutation=Mutation)