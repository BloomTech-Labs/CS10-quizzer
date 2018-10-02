import bcrypt
import graphene
import json
import jwt
import time

from decouple import config
from graphql import GraphQLError
from quizzes.models import Class, Quiz, Question, Choice, Teacher, Student, Class_Quiz, QuizScores
from uuid import UUID


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
start UpdateTeacherInformation
'''
class UpdateTeacherInformation(graphene.Mutation):
    class Arguments:
        TeacherName  = graphene.String()
        OldPassword  = graphene.String(required=True)
        NewPassword  = graphene.String()
        TeacherEmail = graphene.String()
        incoming_jwt = graphene.String()

    jwt_string = graphene.String()
    teacher    = graphene.Field(lambda: UpdateTeacherInformationMutation)

    @staticmethod
    def mutate(self, info, incoming_jwt, TeacherName, TeacherEmail, OldPassword, NewPassword):
        secret    = config('SECRET_KEY')
        algorithm = 'HS256'
        dec_jwt   = jwt.decode(incoming_jwt, secret, algorithms=[ algorithm ])
        teacherID = dec_jwt[ 'sub' ][ 'id' ]
        teacher = Teacher.objects.get(TeacherID=teacherID)

        old_pw = OldPassword.encode('utf-8')
        hashed_old_pw = teacher.TeacherPW.encode('utf-8')

        if old_pw:
            if teacher:
                if bcrypt.checkpw(old_pw, hashed_old_pw):
                    new_password = NewPassword.encode('utf-8')
                    hashed_new_pw = bcrypt.hashpw(new_password, bcrypt.gensalt()).decode('utf-8')

                    # object.save() cannot take any args, so just change entries first
                    teacher.TeacherName = TeacherName if len(TeacherName) > 0 else teacher.TeacherName
                    teacher.TeacherEmail = TeacherEmail if len(TeacherEmail) > 0 else teacher.TeacherEmail
                    teacher.TeacherPW = hashed_new_pw if len(hashed_new_pw) > 0 else hashed_old_pw
                    teacher.save()

                    # create DATA for new JWT to replace old one now that we maybe changed name or email
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
                    outgoing_jwt = jwt.encode(payload, secret, algorithm=algorithm)
                    # transforms JWT-byte-string into a normal UTF-8 string
                    jwt_string = outgoing_jwt.decode('utf-8')

                    # this is what GraphQL is going to return
                    return UpdateTeacherInformation(teacher=teacher, jwt_string=jwt_string)

                else:
                    raise GraphQLError('Incorrect password provided!')
            else:
                raise GraphQLError('Incorrect password provided!')
        else:
            raise GraphQLError('Incorrect password provided!')


class UpdateTeacherInformationMutation(graphene.ObjectType):
    TeacherID    = graphene.String()
    TeacherEmail = graphene.String()
    TeacherName  = graphene.String()
'''
end UpdateTeacherInformation
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
        ClassID = Class.objects.get(ClassID=ClassID)
        quizzes = ClassID.quiz_set.all()
        student = Student.objects.create(
            StudentName=StudentName,
            StudentEmail=StudentEmail,
            )

        student.ClassID.add(ClassID)

        # add every available quiz in this class to this student
        for quiz in quizzes:
            QuizScores.objects.create(
                StudentID=student.StudentID,
                QuizID=quiz.QuizID,
                ClassID=ClassID
            )
            student.Quizzes.add(quiz)
        
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

class DeleteStudent(graphene.Mutation):
    class Arguments:
        StudentID = graphene.String()

    student = graphene.Field(lambda: DeleteStudentMutation)

    @staticmethod
    def mutate(self, info, StudentID):
        student = Student.objects.get(StudentID=StudentID).delete()

        return DeleteStudent(student=student)

class DeleteStudentMutation(graphene.ObjectType):
    StudentID = graphene.String()


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
        secret     = config('SECRET_KEY')
        algorithm  = 'HS256'
        decJWT     = jwt.decode(encJWT, secret, algorithms=[ algorithm ])
        teacherID  = decJWT[ 'sub' ][ 'id' ]
        teacher    = Teacher.objects.get(TeacherID=teacherID)
        quiz       = Quiz.objects.create(Teacher=teacher, QuizName=QuizName, Public=Public)

        return CreateQuiz(quiz=quiz)

class CreateQuizMutation(graphene.ObjectType):
    QuizID        = graphene.String()
    QuizName      = graphene.String()
    Teacher       = graphene.String()
    Public        = graphene.String()
    created_at    = graphene.String()
    last_modified = graphene.String()
'''
end CreateQuiz
'''


'''
start AddQuizToClass
'''
class AddQuizToClass(graphene.Mutation):
    class Arguments:
        QuizID     = graphene.String()
        Classroom  = graphene.String()
        encJWT     = graphene.String()

    quiz = graphene.Field(lambda: AddQuizToClassMutation)

    @staticmethod
    def mutate(self, info, QuizID, Classroom, encJWT):
        secret     = config('SECRET_KEY')
        algorithm  = 'HS256'
        decJWT     = jwt.decode(encJWT, secret, algorithms=[ algorithm ])
        teacherID  = decJWT[ 'sub' ][ 'id' ]
        teacher    = Teacher.objects.get(TeacherID=teacherID)
        classroom  = Class.objects.get(ClassID=Classroom)
        quiz       = Quiz.objects.get(QuizID=QuizID)

        # adds a new record in QuizScores for EACH student
        for student in classroom.student_set.all():
            QuizScores.objects.create(
                StudentID=student.StudentID,
                QuizID=quiz.QuizID,
                ClassID=classroom
            )

        quiz.Classes.add(classroom)
        quiz.save()

        return AddQuizToClass(quiz=quiz)


class AddQuizToClassMutation(graphene.ObjectType):
    QuizID        = graphene.String()
    QuizName      = graphene.String()
    Teacher       = graphene.String()
    Public        = graphene.String()
    created_at    = graphene.String()
    last_modified = graphene.String()
'''
end AddQuizToClass
'''


'''
start CreateQuestion
'''
class CreateQuestion(graphene.Mutation):
    class Arguments:
        QuizID       = graphene.String()
        QuestionText = graphene.String()
        isMajor      = graphene.Boolean()
        encJWT       = graphene.String()

    question = graphene.Field(lambda: CreateQuestionMutation)

    @staticmethod
    def mutate(self, info, QuizID, QuestionText, isMajor, encJWT):
        secret     = config('SECRET_KEY')
        algorithm  = 'HS256'
        decJWT     = jwt.decode(encJWT, secret, algorithms=[ algorithm ])
        teacherID  = decJWT[ 'sub' ][ 'id' ]
        teacher    = Teacher.objects.get(TeacherID=teacherID)

        # check if JWT is expire
        # check if teacher exists

        quiz     = Quiz.objects.get(QuizID=QuizID)
        question = Question.objects.create(
            QuizID=quiz,
            Question=QuestionText,
            isMajor=isMajor
            )

        return CreateQuestion(question=question)


class CreateQuestionMutation(graphene.ObjectType):
    QuestionID    = graphene.String()
    QuizID        = graphene.String()
    Question      = graphene.String()
    isMajor       = graphene.String()
    created_at    = graphene.String()
    last_modified = graphene.String()
'''
end CreateQuestion
'''


'''
start CreateChoice
'''
class CreateChoice(graphene.Mutation):
    class Arguments:
        ChoiceText = graphene.String()
        isCorrect  = graphene.Boolean()
        QuestionID = graphene.String()
        encJWT     = graphene.String()

    choice = graphene.Field(lambda: CreateChoiceMutation)

    @staticmethod
    def mutate(self, info, ChoiceText, isCorrect, QuestionID, encJWT):
        secret     = config('SECRET_KEY')
        algorithm  = 'HS256'
        decJWT     = jwt.decode(encJWT, secret, algorithms=[ algorithm ])
        teacherID  = decJWT[ 'sub' ][ 'id' ]
        teacher    = Teacher.objects.get(TeacherID=teacherID)

        # check if JWT is expire
        # check if teacher exists

        question = Question.objects.get(QuestionID=QuestionID)
        choice   = Choice.objects.create(
            QuestionID=question,
            ChoiceText=ChoiceText,
            isCorrect=isCorrect
            )

        return CreateChoice(choice=choice)


class CreateChoiceMutation(graphene.ObjectType):
    ChoiceID      = graphene.String()
    QuestionID    = graphene.String()
    ChoiceText    = graphene.String()
    isCorrect     = graphene.String()
    created_at    = graphene.String()
    last_modified = graphene.String()
'''
end CreateChoice
'''

class UpdateClassName(graphene.Mutation):
    class Arguments:
        ClassID = graphene.String(required=True)
        ClassName = graphene.String(required=True)
        encJWT = graphene.String(required=True)

    updated_class = graphene.Field(lambda: UpdateClassNameMutation)

    @staticmethod
    def mutate(self, info, ClassID, ClassName, encJWT):
        secret    = config('SECRET_KEY')
        algorithm = 'HS256'
        dec_jwt   = jwt.decode(encJWT, secret, algorithms=[ algorithm ])
        teacherID = dec_jwt[ 'sub' ][ 'id' ]
        teacher = Teacher.objects.get(TeacherID=teacherID)
        updated_class = Class.objects.get(ClassID=ClassID)

        if teacher and updated_class:
            # object.save() cannot take any args, so just change entries first
            updated_class.ClassName = ClassName if len(ClassName) > 0 else updated_class.ClassName
            updated_class.save()

            # this is what GraphQL is going to return
            return UpdateClassName(updated_class=updated_class)

        else:
            raise GraphQLError('Something went wrong.')

class UpdateClassNameMutation(graphene.ObjectType):
    ClassID = graphene.String()
    ClassName = graphene.String()
