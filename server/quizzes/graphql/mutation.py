import graphene
import hashlib
import jwt
import time

from decouple import config
from quizzes.models import Class, Quiz, Question, Choice, Teacher, Student
from uuid import uuid4


'''
CreateClass
'''
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
        ClassName  = graphene.String()
        enc_jwt    = graphene.String()

    new_class = graphene.Field(lambda: ClassMutation)

    @staticmethod
    def mutate(self, info, ClassName, enc_jwt):
        secret    = config('SECRET_KEY')
        algorithm = 'HS256'
        dec_jwt   = jwt.decode(enc_jwt, secret, algorithms=[ algorithm ])

        # `user` variable needs to be changed to use the ID given by the JWT
        # for now JWT does NOT return a userID
        user      = Teacher.objects.get(TeacherName=dec_jwt[ 'sub' ])
        
        # if token is expired return expiration error to user
        if dec_jwt[ 'exp' ] < time.time():
            return print('\n\nTOKEN EXPIRED\nRETURN ERROR TO CLIENT\n\n')
        
        # if user does not exist in the database return error
        if not user:
            return print('\n\nUSER DOES NOT EXISTS\nRETURN ERRO TO CLIENT\n\n')
        
        else:
            new_class = Class.objects.create(ClassName=ClassName)

        return CreateClass(new_class=new_class)


class ClassMutation(graphene.ObjectType):
    ClassName = graphene.String()

'''
end CreateClass
'''


'''
start CreateTeacher
'''
class CreateTeacher(graphene.Mutation):
    class Arguments:
        TeacherName = graphene.String()
        TeacherPW   = graphene.String()

    jwt_string = graphene.String()
    teacher    = graphene.Field(lambda: TeacherMutation)

    @staticmethod
    def mutate(self, info, TeacherName, TeacherPW):
        # create DATA for JWT
        secret    = config('SECRET_KEY')
        algorithm = 'HS256'
        payload = {
            'sub': TeacherName,
            'iat': time.time(),
            'exp': time.time() + 86400
        }

        enc_jwt    = jwt.encode(payload, secret, algorithm=algorithm)
        jwt_string = enc_jwt.decode('utf-8')

        # password hashing
        # turn string into byte string
        password  = TeacherPW.encode('utf-8')
        salt      = uuid4().hex.encode('utf-8')
        pass_salt = b''.join([ password, salt ])
        hashed_pw = hashlib.sha256(pass_salt).hexdigest()

        print(hashed_pw)

        # saving new Teacher into DB
        teacher = Teacher.objects.create(TeacherName=TeacherName, TeacherPW=hashed_pw)

        # this is what GraphQL is going to return
        return CreateTeacher(teacher=teacher, jwt_string=jwt_string)


class TeacherMutation(graphene.ObjectType):
    TeacherName = graphene.String()
        
'''
end CreateTeacher
'''