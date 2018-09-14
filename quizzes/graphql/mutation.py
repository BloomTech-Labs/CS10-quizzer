import bcrypt
import graphene
import hashlib
import jwt
import time

from decouple import config
from quizzes.models import Class, Quiz, Question, Choice, Teacher, Student
from uuid import uuid4

salt = uuid4().hex.encode('utf-8')


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
        user = Teacher.objects.get(TeacherName=dec_jwt[ 'sub' ])
        
        # if token is expired return expiration error to user
        if dec_jwt[ 'exp' ] < time.time():
            return print('\n\nTOKEN EXPIRED\nRETURN ERROR TO CLIENT\n\n')
        
        # if user does not exist in the database return error
        if not user:
            return print('\n\nUSER DOES NOT EXISTS\nRETURN ERRO TO CLIENT\n\n')
        
        # this portion is unreachable if any of the above conditions are true
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
        TeacherName  = graphene.String()
        TeacherPW    = graphene.String()
        TeacherEmail = graphene.String()

    jwt_string = graphene.String()
    teacher    = graphene.Field(lambda: TeacherMutation)

    @staticmethod
    def mutate(self, info, TeacherName, TeacherPW, TeacherEmail):
        # create DATA for JWT
        secret    = config('SECRET_KEY')
        algorithm = 'HS256'
        payload = {
            'sub': {
                'username': TeacherName,
                'email': TeacherEmail
            },
            'iat': time.time(),
            'exp': time.time() + 86400
        }

        # create JWT as a byte string e.g. b'<< JWT >>'
        enc_jwt    = jwt.encode(payload, secret, algorithm=algorithm)
        # transforms JWT-byte-string into a normal UTF-8 string
        jwt_string = enc_jwt.decode('utf-8')

        # password hashing
        # turn strings into byte-strings
        password  = TeacherPW.encode('utf-8')
        # salt      = uuid4().hex.encode('utf-8')
        pass_salt = b''.join([ password, salt ])
        # hashlib.sha256 requires byte-strings in order to apply the algorithm
        hashed_pw = hashlib.sha256(pass_salt).hexdigest()

        # saving new Teacher into DB
        teacher = Teacher.objects.create(TeacherName=TeacherName, TeacherPW=hashed_pw, TeacherEmail=TeacherEmail)

        # this is what GraphQL is going to return
        return CreateTeacher(teacher=teacher, jwt_string=jwt_string)


class TeacherMutation(graphene.ObjectType):
    TeacherName  = graphene.String()
    TeacherPW    = graphene.String()
    TeacherEmail = graphene.String()
        
'''
end CreateTeacher
'''


'''
start QueryTeacher
'''
class QueryTeacher(graphene.Mutation):
    class Arguments:
        TeacherPW    = graphene.String()
        TeacherEmail = graphene.String()

    jwt_string = graphene.String()
    teacher    = graphene.Field(lambda: QueryTeacherMutation)

    @staticmethod
    def mutate(self, info, TeacherPW, TeacherEmail):
        # saving new Teacher into DB
        # teacher = Teacher.objects.create(TeacherName=TeacherName, TeacherPW=TeacherPW, TeacherEmail=TeacherEmail)
        teacher = Teacher.objects.get(TeacherEmail=TeacherEmail)
        teacher_pw = TeacherPW.encode('utf-8')
        pass_salt  = b''.join([ teacher_pw, salt ])
        hashed_pw  = hashlib.sha256(pass_salt).hexdigest()

        if teacher:
            print(salt)
            if hashed_pw == teacher.TeacherPW:
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
                # this is what GraphQL is going to return
                return QueryTeacher(teacher=teacher, jwt_string=jwt_string)

            else:
                print('\n\nWRONG PASSWORD\n\n')

        else:
            print('\n\nTEACHER DOES NOT EXIST\n\n')



class QueryTeacherMutation(graphene.ObjectType):
    TeacherPW    = graphene.String()
    TeacherEmail = graphene.String()
'''
end QueryTeacher
'''