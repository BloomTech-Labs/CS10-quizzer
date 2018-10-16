import bcrypt
import graphene
import json
import jwt
import time

from decouple import config
from graphql import GraphQLError
from quizzes.models import Class, Quiz, Question, Choice, Teacher, Student, QuizScores
from uuid import UUID

from quizzes.helpers.jwt_helpers import decode_jwt, create_jwt

'''
start CreateTeacher
'''
class CreateTeacher(graphene.Mutation):
    class Arguments:
        TeacherName  = graphene.String(required=True)
        TeacherPW    = graphene.String(required=True)
        TeacherEmail = graphene.String(required=True)

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

        jwt_string = create_jwt(teacher.TeacherID, teacher.TeacherName, teacher.TeacherEmail)

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
        incoming_jwt = graphene.String(required=True)

    jwt_string = graphene.String()
    teacher    = graphene.Field(lambda: UpdateTeacherInformationMutation)

    @staticmethod
    def mutate(self, info, incoming_jwt, TeacherName, TeacherEmail, OldPassword, NewPassword):
        dec_jwt = decode_jwt(incoming_jwt)
        teacherID = dec_jwt[ 'sub' ][ 'id' ]
        teacher = Teacher.objects.get(TeacherID=teacherID)

        old_pw = OldPassword.encode('utf-8')
        hashed_old_pw = teacher.TeacherPW.encode('utf-8')

        if old_pw:
            if teacher:
                if bcrypt.checkpw(old_pw, hashed_old_pw):
                    # object.save() cannot take any args, so just change entries directly first.
                    teacher.TeacherName = TeacherName if len(TeacherName) > 0 else teacher.TeacherName
                    teacher.TeacherEmail = TeacherEmail if len(TeacherEmail) > 0 else teacher.TeacherEmail

                    # No point in doing any new password hashing if there's no new password present...
                    if len(NewPassword) > 0:
                        new_password = NewPassword.encode('utf-8')
                        hashed_new_pw = bcrypt.hashpw(new_password, bcrypt.gensalt()).decode('utf-8')
                        teacher.TeacherPW = hashed_new_pw
                    
                    # Save the new teacher data back into the database
                    teacher.save()
                    # Make ID into a string so we can return it easily.
                    teacher.TeacherID = str(teacher.TeacherID)

                    jwt_string = create_jwt(teacher.TeacherID, teacher.TeacherName, teacher.TeacherEmail)

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
        TeacherEmail = graphene.String(required=True)
        TeacherPW    = graphene.String(required=True)

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
                    teacher.TeacherID = str(teacher.TeacherID)
                    jwt_string = create_jwt(teacher.TeacherID, teacher.TeacherName, teacher.TeacherEmail)

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
        StudentName  = graphene.String(required=True)
        StudentEmail = graphene.String(required=True)
        ClassID      = graphene.String(required=True)
        enc_jwt      = graphene.String(required=True)

    student = graphene.Field(lambda: CreateStudentMutation)

    @staticmethod
    def mutate(self, info, StudentName, StudentEmail, ClassID, enc_jwt):
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
        StudentID = graphene.String(required=True)
        enc_jwt = graphene.String(required=True)

    student = graphene.Field(lambda: DeleteStudentMutation)

    @staticmethod
    def mutate(self, info, StudentID, enc_jwt):
        student = Student.objects.get(StudentID=StudentID).delete()

        return DeleteStudent(student=student)

class DeleteStudentMutation(graphene.ObjectType):
    StudentID = graphene.String()

'''
start CreateQuiz
'''
class CreateQuiz(graphene.Mutation):
    class Arguments:
        QuizName = graphene.String(required=True)
        Public   = graphene.Boolean()
        encJWT   = graphene.String(required=True)

    quiz = graphene.Field(lambda: CreateQuizMutation)

    @staticmethod
    def mutate(self, info, QuizName, Public, encJWT):
        decJWT     = decode_jwt(encJWT)
        teacherID  = decJWT[ 'sub' ][ 'id' ]
        teacher    = Teacher.objects.get(TeacherID=teacherID)
        quizzes    = teacher.quiz_set.all()

        if teacher.Subscription == "" and len(quizzes) >= 10:
            return GraphQLError('Free users cannot create more than 10 quizzes.')
        elif teacher.Subscription == "Basic" and len(quizzes) >= 25:
            return GraphQLError('Basic users cannot create more than 25 quizzes.')
        else:
            quiz = Quiz.objects.create(Teacher=teacher, QuizName=QuizName, Public=Public)
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
start UpdateQuizName
''' 
class UpdateQuizName(graphene.Mutation): 
  class Arguments: 
    QuizID = graphene.String(required=True) 
    QuizName = graphene.String(required=True)
    enc_jwt = graphene.String(required=True) 

  updated_quiz = graphene.Field(lambda: UpdateQuizNameMutation)

  @staticmethod
  def mutate(self, info, QuizID, QuizName, enc_jwt):
    dec_jwt = decode_jwt(enc_jwt)
    teacherID = dec_jwt['sub']['id']
    teacher = Teacher.objects.get(TeacherID=teacherID)
    updated_quiz = Quiz.objects.get(QuizID=QuizID)

    if teacher and updated_quiz:
      # object.save() cannot take any args, so just change entries first
      updated_quiz.QuizName = QuizName if len(QuizName) > 0 else updated_quiz.QuizName
      updated_quiz.save()

      # this is what GraphQL is going to return 
      return UpdateQuizName(updated_quiz=updated_quiz)
    
    else: 
      raise GraphQLError('Something went wrong.')

class UpdateQuizNameMutation(graphene.ObjectType):
  QuizID = graphene.String() 
  QuizName = graphene.String() 
'''
end UpdateQuizName
'''

'''
start AddQuizToClass
'''
class AddQuizToClass(graphene.Mutation):
    class Arguments:
        QuizID     = graphene.String(required=True)
        Classroom  = graphene.String(required=True)
        encJWT     = graphene.String(required=True)

    quiz = graphene.Field(lambda: AddQuizToClassMutation)

    @staticmethod
    def mutate(self, info, QuizID, Classroom, encJWT):
        decJWT     = decode_jwt(encJWT)
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
start DeleteQuiz
'''
class DeleteQuiz(graphene.Mutation):
    class Arguments: 
        QuizID = graphene.String(required=True)
        enc_jwt = graphene.String(required=True)
    
    quiz = graphene.Field(lambda: DeleteQuizMutation)

    @staticmethod
    def mutate(self, info, QuizID, enc_jwt):
        quiz = Quiz.objects.get(QuizID=QuizID).delete()

        return DeleteQuiz(quiz=quiz)

class DeleteQuizMutation(graphene.ObjectType):
    QuizID = graphene.String() 
'''
end DeleteQuiz
'''

'''
start CreateQuestion
'''
class CreateQuestion(graphene.Mutation):
    class Arguments:
        QuizID       = graphene.String(required=True)
        QuestionText = graphene.String(required=True)
        isMajor      = graphene.Boolean()
        encJWT       = graphene.String(required=True)

    question = graphene.Field(lambda: CreateQuestionMutation)

    @staticmethod
    def mutate(self, info, QuizID, QuestionText, isMajor, encJWT):
        decJWT     = decode_jwt(encJWT)
        teacherID  = decJWT[ 'sub' ][ 'id' ]
        teacher    = Teacher.objects.get(TeacherID=teacherID)

        quiz     = Quiz.objects.get(QuizID=QuizID)
        question = Question.objects.create(
            QuizID=quiz,
            QuestionText=QuestionText,
            isMajor=isMajor
            )

        return CreateQuestion(question=question)


class CreateQuestionMutation(graphene.ObjectType):
    QuestionID    = graphene.String()
    QuizID        = graphene.String()
    QuestionText  = graphene.String()
    isMajor       = graphene.String()
    created_at    = graphene.String()
    last_modified = graphene.String()
'''
end CreateQuestion
'''

'''
start UpdateQuestionText
'''
class UpdateQuestionText(graphene.Mutation): 
  class Arguments: 
    QuestionID = graphene.String(required=True)
    QuestionText = graphene.String(required=True)
    enc_jwt = graphene.String(required=True)

  updated_question = graphene.Field(lambda: UpdateQuestionTextMutation)

  @staticmethod
  def mutate(self, info, QuestionID, QuestionText, enc_jwt): 
    dec_jwt = decode_jwt(enc_jwt)
    teacherID = dec_jwt['sub']['id']
    teacher = Teacher.objects.get(TeacherID=teacherID)
    updated_question = Question.objects.get(QuestionID=QuestionID)

    if teacher and updated_question: 
        # object.save() cannot take any args, so just change entries first
        updated_question.QuestionText = QuestionText if len(QuestionText) > 0 else updated_question.QuestionText
        updated_question.save()

        # this is what GraphQL is going to return 
        return UpdateQuestionText(updated_question=updated_question)

    else: 
        raise GraphQLError('Something went wrong.')

class UpdateQuestionTextMutation(graphene.ObjectType): 
  QuestionID = graphene.String()
  QuestionText = graphene.String()
'''
endUpdateQuestion
'''

'''
start DeleteQuestion
'''
class DeleteQuestion(graphene.Mutation):
    class Arguments: 
        QuestionID = graphene.String(required=True)
        enc_jwt = graphene.String(required=True)
    
    question = graphene.Field(lambda: DeleteQuestionMutation)

    @staticmethod
    def mutate(self, info, QuestionID, enc_jwt): 
        question = Question.objects.get(QuestionID=QuestionID).delete()

        return DeleteQuestion(question=question)

class DeleteQuestionMutation(graphene.ObjectType):
    QuestionID = graphene.String() 
'''
end DeleteQuestion
'''

'''
start CreateChoice
'''
class CreateChoice(graphene.Mutation):
    class Arguments:
        ChoiceText = graphene.String(required=True)
        isCorrect  = graphene.Boolean(required=True)
        status     = graphene.Boolean(required=True)
        QuestionID = graphene.String(required=True)
        encJWT     = graphene.String(required=True)

    choice = graphene.Field(lambda: CreateChoiceMutation)

    @staticmethod
    def mutate(self, info, ChoiceText, isCorrect, status, QuestionID, encJWT):
        decJWT     = decode_jwt(encJWT)
        teacherID  = decJWT[ 'sub' ][ 'id' ]
        teacher    = Teacher.objects.get(TeacherID=teacherID)

        question = Question.objects.get(QuestionID=QuestionID)
        choice   = Choice.objects.create(
            QuestionID=question,
            ChoiceText=ChoiceText,
            isCorrect=isCorrect,
            status=status
            )

        return CreateChoice(choice=choice)


class CreateChoiceMutation(graphene.ObjectType):
    ChoiceID      = graphene.String()
    QuestionID    = graphene.String()
    ChoiceText    = graphene.String()
    isCorrect     = graphene.Boolean()
    status        = graphene.Boolean()
    created_at    = graphene.String()
    last_modified = graphene.String()
'''
end CreateChoice
'''

'''
start UpdateChoice
'''
class UpdateChoice(graphene.Mutation): 
    class Arguments: 
        ChoiceID = graphene.String(required=True)
        ChoiceText = graphene.String(required=True)
        isCorrect = graphene.Boolean(required=True)
        status = graphene.Boolean(required=True)
        enc_jwt = graphene.String(required=True)
    
    updated_choice = graphene.Field(lambda: UpdateChoiceMutation)
    
    @staticmethod
    def mutate(self, info, ChoiceID, ChoiceText, isCorrect, status, enc_jwt):
        dec_jwt = decode_jwt(enc_jwt)
        teacherID = dec_jwt['sub']['id']
        teacher = Teacher.objects.get(TeacherID=teacherID)
        updated_choice = Choice.objects.get(ChoiceID=ChoiceID)

        if teacher and updated_choice: 
            # object.save() cannot take any args, so just change entries first
            updated_choice.ChoiceText = ChoiceText if len(ChoiceText) > 0 else updated_choice.ChoiceText
            updated_choice.isCorrect = isCorrect if isCorrect != updated_choice.isCorrect else updated_choice.isCorrect
            updated_choice.status = status if status != updated_choice.status else updated_choice.status
            updated_choice.save() 

            # this is what GraphQL is going to return
            return UpdateChoice(updated_choice=updated_choice)
        
        else: 
            raise GraphQLError('Something went wrong.')
        
class UpdateChoiceMutation(graphene.ObjectType): 
    ChoiceID = graphene.String()
    ChoiceText = graphene.String() 
    isCorrect = graphene.Boolean()
    status = graphene.Boolean()
'''
end UpdateChoice
'''

'''
start DeleteChoice 
'''
class DeleteChoice(graphene.Mutation):
    class Arguments: 
        ChoiceID = graphene.String(required=True)
        enc_jwt = graphene.String(required=True)

    choice = graphene.Field(lambda: DeleteChoiceMutation)

    @staticmethod
    def mutate(self, info, ChoiceID, enc_jwt):
        choice = Choice.objects.get(ChoiceID=ChoiceID).delete()

        return DeleteChoice(choice=choice)

class DeleteChoiceMutation(graphene.ObjectType): 
    ChoiceID = graphene.String() 
'''
end DeleteChoice
'''

'''
start UpdateClassName
'''
class UpdateClassName(graphene.Mutation):
    class Arguments:
        ClassID = graphene.String(required=True)
        ClassName = graphene.String(required=True)
        enc_jwt = graphene.String(required=True)

    updated_class = graphene.Field(lambda: UpdateClassNameMutation)

    @staticmethod
    def mutate(self, info, ClassID, ClassName, enc_jwt):
        dec_jwt = decode_jwt(enc_jwt)
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
'''
end UpdateClassName
'''

'''
start UpdateQuizScore
'''
class UpdateQuizScore(graphene.Mutation):
    class Arguments:
        QuizID    = graphene.String(required=True)
        Classroom = graphene.String(required=True)
        StudentID = graphene.String(required=True)
        Score     = graphene.Int(required=True)

    updated_quiz_score = graphene.Field(lambda: UpdateQuizScoreMutation)

    @staticmethod
    def mutate(self, info, QuizID, Classroom, StudentID, Score):
        quiz = Quiz.objects.get(QuizID=QuizID)
        quiz_name = quiz.QuizName
        quiz_score = QuizScores.objects.get(
            QuizID=QuizID,
            ClassID=Classroom,
            StudentID=StudentID
        )

        quiz_score.Score = Score
        quiz_score.QuizName = quiz_name
        quiz_score.save(update_fields=['Score', 'QuizName'])

        return UpdateQuizScore(updated_quiz_score=quiz_score)

class UpdateQuizScoreMutation(graphene.ObjectType):
    QuizID    = graphene.String()
    Score     = graphene.Int()
    StudentID = graphene.String()
'''
end UpdateQuizScore
'''

class UpdateCCEmails(graphene.Mutation):
    class Arguments:
        ClassID = graphene.String(required=True)

    updated_cc_emails = graphene.Field(lambda: UpdateCCEmailsMutation)

    @staticmethod
    def mutate(self, info, ClassID):
        classroom = Class.objects.get(ClassID=ClassID)
        classroom.cc_emails = not classroom.cc_emails
        classroom.save(update_fields=['cc_emails'])

        return UpdateCCEmails(updated_cc_emails=classroom)

class UpdateCCEmailsMutation(graphene.ObjectType):
    cc_emails = graphene.Boolean()
