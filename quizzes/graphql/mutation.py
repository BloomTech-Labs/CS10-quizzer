import bcrypt
import graphene
import json
import jwt
import time

from decouple import config
from quizzes.models import Class, Quiz, Question, Choice, Teacher, Student
from graphql import GraphQLError


# '''
# CreateClass
# '''
# class CreateClass(graphene.Mutation):
#     '''
#     The `Arguments` nested class is how GraphQL knows what arguments
#     are required when making a mutation/POST request.
    
#     The `ok` prop is required by GraphQL. This is not a Django Attribute
#     The `new_class` prop is calling the `ClassMutation` class right below
#     our `CreateClass` class. We then call the `mutate()` method, denoted with
#     a `@staticmethod` decorator, that will then use the value of
#     `ClassMutation.ClassName` and pass that to the `Class.objects.create()`
#     method saved on the `new_class` variable inside of the
#     `mutate()` method below
#     EXAMPLE GRAPHQL MUTATION
#     ------------------------
    
#     mutation {
#         createClass(ClassName:"Test Class Creation 1") {
#             newClass {
#                 ClassName
#             }
#             ok
#         }
#     }
#     '''
#     class Arguments:
#         ClassName  = graphene.String()
#         enc_jwt    = graphene.String()

#     new_class = graphene.Field(lambda: ClassMutation)

#     @staticmethod
#     def mutate(self, info, ClassName, enc_jwt):
#         secret    = config('SECRET_KEY')
#         algorithm = 'HS256'
#         dec_jwt   = jwt.decode(enc_jwt, secret, algorithms=[ algorithm ])

#         # `user` variable needs to be changed to use the ID given by the JWT
#         # for now JWT does NOT return a userID
#         user = Teacher.objects.get(TeacherEmail=dec_jwt[ 'sub' ][ 'email' ])
        
#         # if token is expired return expiration error to user
#         if dec_jwt[ 'exp' ] < time.time():
#             return print('\n\nTOKEN EXPIRED\nRETURN ERROR TO CLIENT\n\n')
        
#         # if user does not exist in the database return error
#         if not user:
#             return print('\n\nUSER DOES NOT EXISTS\nRETURN ERRO TO CLIENT\n\n')
        
#         # this portion is unreachable if any of the above conditions are true
#         new_class = Class.objects.create(ClassName=ClassName)

#         return CreateClass(new_class=new_class)


# class ClassMutation(graphene.ObjectType):
#     ClassName = graphene.String()

# '''
# end CreateClass
# '''


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
        hashed = bcrypt.hashpw(password, bcrypt.gensalt()).decode('utf-8')

        # saving new Teacher into DB
        teacher = Teacher.objects.create(TeacherName=TeacherName, TeacherPW=hashed, TeacherEmail=TeacherEmail)

        # this is what GraphQL is going to return
        return CreateTeacher(teacher=teacher, jwt_string=jwt_string)


class TeacherMutation(graphene.ObjectType):
    TeacherID    = graphene.String()
    TeacherEmail = graphene.String()
    TeacherName  = graphene.String()
        
'''
end CreateTeacher
'''


'''
start QueryTeacher
'''
class QueryTeacher(graphene.Mutation):
    class Arguments:
        TeacherEmail = graphene.String()
        TeacherPW    = graphene.String()

    errors     = graphene.JSONString()
    jwt_string = graphene.String()
    teacher    = graphene.Field(lambda: QueryTeacherMutation)

    @staticmethod
    def mutate(self, info, TeacherPW, TeacherEmail):
        teacher = Teacher.objects.get(TeacherEmail=TeacherEmail)
        plain_pw = TeacherPW.encode('utf-8')
        hashed_pw = teacher.TeacherPW.encode('utf-8')

        if plain_pw:
            if teacher:
                if bcrypt.checkpw(plain_pw, hashed_pw):
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

                    # this is what GraphQL is going to return
                    return QueryTeacher(teacher=teacher, jwt_string=jwt_string)

                else:
                    print('\n\nWRONG PASSWORD\n\n')
                    return {}

            else:
                print('\n\nTEACHER DOES NOT EXIST\n\n')
                return {}

        else:
            raise GraphQLError('Please supply a valid password')



class QueryTeacherMutation(graphene.ObjectType):
    TeacherID    = graphene.String()
    TeacherEmail = graphene.String()
    TeacherName  = graphene.String()
'''
end QueryTeacher
'''