import bcrypt
import graphene
import json
import jwt
import time

from decouple import config
from graphql import GraphQLError
from quizzes.models import Class, Quiz, Question, Choice, Teacher, Student


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
        # password hashing
        # turn strings into byte-strings
        password  = TeacherPW.encode('utf-8')
        hashed = bcrypt.hashpw(password, bcrypt.gensalt()).decode('utf-8')

        # saving new Teacher into DB
        teacher = Teacher.objects.create(TeacherName=TeacherName, TeacherPW=hashed, TeacherEmail=TeacherEmail)
        teacher.TeacherID = str(teacher.TeacherID)

        # create DATA for JWT
        secret    = config('SECRET_KEY')
        algorithm = 'HS256'
        payload = {
            'sub': {
                'id': teacher.TeacherID,
                'username': teacher.TeacherName,
                'email': teacher.TeacherEmail
            },
            'iat': time.time(),
            'exp': time.time() + 86400
        }

        # create JWT as a byte string e.g. b'<< JWT >>'
        enc_jwt    = jwt.encode(payload, secret, algorithm=algorithm)
        # transforms JWT-byte-string into a normal UTF-8 string
        jwt_string = enc_jwt.decode('utf-8')

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
                            'id': str(teacher.TeacherID),
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
                    raise GraphQLError('Incorrect username or password.')

            else:
                raise GraphQLError('Incorrect username or password')

        else:
            raise GraphQLError('Please supply a valid password')



class QueryTeacherMutation(graphene.ObjectType):
    TeacherID    = graphene.String()
    TeacherEmail = graphene.String()
    TeacherName  = graphene.String()
'''
end QueryTeacher
'''


'''
start CreateStudent
'''
class CreateStudent(graphene.Mutation):
    class Arguments:
        StudentName  = graphene.String()
        StudentEmail = graphene.String()
        ClassID      = graphene.String()

    student = graphene.Field(lambda: CreateStudentMutation)

    @staticmethod
    def mutate(self, info, StudentName, StudentEmail, ClassID):
        ClassID   = Class.objects.get(ClassID=ClassID)
        student = Student.objects.create(StudentName=StudentName,
                                         StudentEmail=StudentEmail,
                                         ClassID=ClassID
                                        )
        
        return CreateStudent(student=student)


class CreateStudentMutation(graphene.ObjectType):
    StudentID    = graphene.String()
    StudentName  = graphene.String()
    StudentEmail = graphene.String()
    ClassID      = graphene.String()
    created_at   = graphene.String()
'''
end CreateStudent
'''


'''
start CreateQuiz
'''
class CreateQuiz(graphene.Mutation):
    class Arguments:
        QuizName = graphene.String()
        Public   = graphene.Boolean()
        encJWT   = graphene.String()

    quiz = graphene.Field(lambda: CreateQuizMutation)

    @staticmethod
    def mutate(self, info, QuizName, Public, encJWT):
        secret    = config('SECRET_KEY')
        algorithm = 'HS256'
        decJWT    = jwt.decode(encJWT, secret, algorithms=[ algorithm ])
        teacherID = decJWT[ 'sub' ][ 'id' ]
        teacher   = Teacher.objects.get(TeacherID=teacherID)

        quiz = Quiz.objects.create(TeacherID=teacher, QuizName=QuizName, Public=Public)

        return CreateQuiz(quiz=quiz)

class CreateQuizMutation(graphene.ObjectType):
    QuizID        = graphene.String()
    QuizName      = graphene.String()
    TeacherID     = graphene.String()
    Public        = graphene.String()
    created_at    = graphene.String()
    last_modified = graphene.String()
'''
end CreateQuiz
'''