import graphene
import jwt
import time
import graphql

from decouple import config
from graphene_django import DjangoObjectType
from graphql import GraphQLError, GraphQLObjectType, GraphQLList
from quizzes.graphql.mutation import CreateTeacher, QueryTeacher, CreateStudent, CreateQuiz
from quizzes.graphql.mutations.classes import CreateClass
from quizzes.models import Class, Quiz, Question, Choice, Teacher, Student, Student_Quiz, Class_Quiz

from quizzes.graphql.query import (
    ClassType, QuizType, QuestionType, ChoiceType, TeacherType, StudentType, Class_QuizType
)



class Mutation(graphene.ObjectType):
    '''
    Mutation class allows us to make POST/Mutation requests to create new
    fields
    '''
    create_class   = CreateClass.Field()
    create_teacher = CreateTeacher.Field()
    query_teacher  = QueryTeacher.Field()
    create_student = CreateStudent.Field()
    create_quiz    = CreateQuiz.Field()


class Query(graphene.ObjectType):
    '''
    Allows us to make GET/Query requests from the DB using GraphQL
    '''
    classes          = graphene.List(ClassType, enc_jwt=graphene.String())
    public_quizzes   = graphene.List(QuizType)
    questions        = graphene.List(QuestionType)
    choices          = graphene.List(ChoiceType)
    teachers         = graphene.List(TeacherType)
    students         = graphene.List(StudentType)
    class_quizzes    = graphene.List(Class_QuizType, ClassID=graphene.String())

    teacher = graphene.Field(
        TeacherType,
        email=graphene.String(),
        password=graphene.String()
    )

    '''
    Each method, resolve_<< name >>, is named after what we want to return.
    For example, we have a property called `classes` so we name our
    `resolve_` method `resolve_classes()` which will then return our query
    to `Class.objects.all()` from the DB
    '''
    def resolve_classes(self, info, **kwargs):
        '''
        if an enc_jwt argument is supplied to the classes query
        we can get back every class that a teacher has created
        
        if we do not supply an enc_jwt or the enc_jwt is wrong we are then
        returned with EVERY class created

        TODO: do not return every single class if JWT is wrong/missing
        '''
        try:
            enc_jwt    = kwargs.get('enc_jwt').encode('utf-8')
            secret     = config('SECRET_KEY')
            algorithm  = 'HS256'
            dec_jwt    = jwt.decode(enc_jwt, secret, algorithms=[ algorithm ])
            teacher    = Teacher.objects.get(TeacherID=dec_jwt[ 'sub' ][ 'id' ])

            '''
            grabs every class that contains a teacher with this email address

            << tableName >>__<< field >>__contains = << value to search for >>
            NOTE: these are double underscores between each field
            '''
            return Class.objects.filter(
                TeacherID__TeacherEmail__contains=teacher.TeacherEmail
                )

        except:
            raise GraphQLError('Please supply a valid JWT')

    def resolve_public_quizzes(self, info):
        return Quiz.objects.filter(Public=True)

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

    def resolve_class_quizzes(self, info, **kwargs):
        if 'ClassID' not in kwargs:
            return GraphQLError('Please supply a valid ClassID')

        class_id = kwargs.get('ClassID')

        return Class_Quiz.objects.filter(ClassID=class_id)


schema = graphene.Schema(query=Query, mutation=Mutation)