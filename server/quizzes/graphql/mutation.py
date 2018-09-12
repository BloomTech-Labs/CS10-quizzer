import graphene
import jwt
import time

from decouple import config
from quizzes.models import Class, Quiz, Question, Choice, Teacher, Student

class CreateClass(graphene.Mutation):
    '''
    The `Arguments` nested class is how GraphQL knows what arguments
    are required when making a mutation/POST request.
    
    The `ok` prop is required by GraphQL. This is not a Django Attribute

    The `new_class` prop is calling the `ClassMutation` class right below
    our `CreateClass` class. We then call the `mutate()` method, denoted with
    a `@staticmethod` decorator, that will then use the value of
    `ClassMutation.ClassName` and pass that to the `Class.objects.create()`
    method saved on the `new_class` variable inside of the
    `mutate()` method below

    EXAMPLE GRAPHQL MUTATION
    ------------------------
    
    mutation {
        createClass(ClassName:"Test Class Creation 1") {
            newClass {
                ClassName
            }
            ok
        }
    }

    '''
    class Arguments:
        ClassName = graphene.String()

    ok = graphene.Boolean()
    jwt_string = graphene.String()
    new_class = graphene.Field(lambda: ClassMutation)

    @staticmethod
    def mutate(self, info, ClassName):
        secret = config('SECRET_KEY')
        algorithm = 'HS256'
        payload = {
            'sub': ClassName,
            'iat': time.time(),
            'exp': time.time() + 86400
        }

        enc_jwt = jwt.encode(payload, secret, algorithm=algorithm)
        
        new_class = Class.objects.create(ClassName=ClassName)
        ok = True
        jwt_string = enc_jwt.decode('utf-8')

        return CreateClass(new_class=new_class, ok=ok, jwt_string=jwt_string)


class ClassMutation(graphene.ObjectType):
    ClassName = graphene.String()


class CreateTeacher(graphene.Mutation):
    class Arguments:
        TeacherName = graphene.String()
        ClassID     = graphene.ID()

    jwt_string = graphene.String()
    teacher    = graphene.Field(lambda: TeacherMutation)

    @staticmethod
    def mutate(self, info, TeacherName, ClassID):
        secret    = config('SECRET_KEY')
        algorithm = 'HS256'
        payload = {
            'sub': TeacherName,
            'iat': time.time(),
            'exp': time.time() + 86400
        }

        enc_jwt = jwt.encode(payload, secret, algorithm=algorithm)

        jwt_string = enc_jwt.decode('utf-8')
        teacher = Teacher.objects.create(
            TeacherName=TeacherName,
            ClassID=ClassID
            )

        return CreateTeacher(teacher=teacher, jwt_string=jwt_string)


class TeacherMutation(graphene.ObjectType):
    TeacherName = graphene.String()
    ClassID     = graphene.ID()
        