import graphene
import jwt
import time
import graphql

from decouple import config
from graphene_django import DjangoObjectType
from graphql import GraphQLError, GraphQLObjectType, GraphQLList
from quizzes.graphql.mutations.classes import CreateClass
from quizzes.models import Class, Quiz, Question, Choice, Teacher, Student, QuizScores

from quizzes.graphql.mutation import (
    CreateTeacher, QueryTeacher, CreateStudent, CreateQuiz, CreateQuestion,
    CreateChoice, UpdateTeacherInformation, AddQuizToClass, DeleteStudent,
    UpdateClassName, UpdateQuizName, UpdateQuestionText, UpdateChoice, UpdateQuizScore
)

from quizzes.graphql.query import (
    ClassType, QuizType, QuestionType, ChoiceType, TeacherType, StudentType, QuizScoresType
)

from quizzes.helpers.jwt_helpers import decode_jwt

class Mutation(graphene.ObjectType):
    '''
    Mutation class allows us to make POST/Mutation requests to create new
    fields
    '''
    create_class      = CreateClass.Field()
    update_class      = UpdateClassName.Field()
    update_quiz       = UpdateQuizName.Field()
    update_question   = UpdateQuestionText.Field()
    update_choice     = UpdateChoice.Field()
    create_teacher    = CreateTeacher.Field()
    update_teacher    = UpdateTeacherInformation.Field()
    query_teacher     = QueryTeacher.Field()
    create_student    = CreateStudent.Field()
    delete_student    = DeleteStudent.Field()
    create_quiz       = CreateQuiz.Field()
    create_question   = CreateQuestion.Field()
    create_choice     = CreateChoice.Field()
    add_quiz_to_class = AddQuizToClass.Field()
    update_quiz_score = UpdateQuizScore.Field()


class Query(graphene.ObjectType):
    '''
    Allows us to make GET/Query requests from the DB using GraphQL
    '''
    classes         = graphene.List(ClassType, enc_jwt=graphene.String())
    single_class    = graphene.Field(ClassType, ClassID=graphene.String())

    public_quizzes  = graphene.List(QuizType)
    single_quiz     = graphene.Field(QuizType, QuizID=graphene.String())
    class_quizzes   = graphene.List(QuizType, ClassID=graphene.String())
    teacher_quizzes = graphene.List(QuizType, enc_jwt=graphene.String())
    
    quiz_questions  = graphene.List(QuestionType, QuizID=graphene.String())

    teacher         = graphene.List(TeacherType, enc_jwt=graphene.String())
    
    student         = graphene.Field(StudentType, StudentID=graphene.String())
    class_students  = graphene.List(StudentType, ClassID=graphene.String())

    student_scores = graphene.List(QuizScoresType, StudentID=graphene.String())
    quiz_scores = graphene.List(QuizScoresType, QuizID=graphene.String())

    '''
    Each method, resolve_<< name >>, is named after what we want to return.
    For example, we have a property called `classes` so we name our
    `resolve_` method `resolve_classes()` which will then return our query
    to `Class.objects.all()` from the DB
    '''
    def resolve_teacher(self, info, **kwargs):
        enc_jwt    = kwargs.get('enc_jwt')
        dec_jwt    = decode_jwt(enc_jwt)
        teacherID  = dec_jwt[ 'sub' ][ 'id' ]
        teacher    = Teacher.objects.filter(TeacherID=teacherID)
        
        return teacher
    
    def resolve_classes(self, info, **kwargs):
        '''
        if an enc_jwt argument is supplied to the classes query
        we can get back every class that a teacher has created
        
        if we do not supply an enc_jwt or the enc_jwt is wrong we are then
        returned with EVERY class created

        TODO: do not return every single class if JWT is wrong/missing
        '''
        try:
            enc_jwt    = kwargs.get('enc_jwt')
            dec_jwt    = decode_jwt(enc_jwt)
            teacher    = Teacher.objects.get(TeacherID=dec_jwt[ 'sub' ][ 'id' ])

            '''
            grabs every class that contains a teacher with this email address

            << tableName >>__<< field >>__contains = << value to search for >>
            NOTE: these are double underscores between each field
            '''

            return teacher.class_set.all()
            
            # return Class.objects.filter(
            #     TeacherID__TeacherEmail__contains=teacher.TeacherEmail
            #     )

        except:
            raise GraphQLError('Please supply a valid JWT')

    def resolve_public_quizzes(self, info):
        return Quiz.objects.filter(Public=True)

    def resolve_single_quiz(self, info, **kwargs):
        try:
            QuizID = kwargs.get('QuizID')
            return Quiz.objects.get(pk=QuizID)

        except:
            return GraphQLError('Something went wrong')

    def resolve_class_quizzes(self, info, **kwargs):
        class_id = kwargs.get('ClassID')

        if class_id:
            classroom = Class.objects.get(ClassID=class_id)
            return classroom.quiz_set.all()

        return GraphQLError('Please supply a valid ClassID')

    def resolve_teacher_quizzes(self, info, **kwargs):
        if 'enc_jwt' in kwargs:
            enc_jwt   = kwargs.get('enc_jwt')
            dec_jwt   = decode_jwt(enc_jwt)
            teacherID = dec_jwt['sub']['id']
            teacher   = Teacher.objects.get(TeacherID=teacherID)

            return teacher.quiz_set.all()

        return GraphQLError('Please supply a valid JWT')

    def resolve_quiz_questions(self, info, **kwargs):
        invalid_quiz = GraphQLError('Please supply a valid QuizID')
        
        if 'QuizID' in kwargs:
            quizID = kwargs.get('QuizID')

            if quizID:
                quiz = Quiz.objects.get(QuizID=quizID)
                return quiz.question_set.all()
            
        raise invalid_quiz

    # returns a single student
    def resolve_student(self, info, **kwargs):
        try:
            studentID = kwargs.get('StudentID')
            return Student.objects.get(pk=studentID)

        except:
            return GraphQLError('No student found with that ID')

    def resolve_class_students(self, info, **kwargs):
        class_id = kwargs.get('ClassID')

        if class_id:
            classroom = Class.objects.get(ClassID=class_id)
            return classroom.student_set.all()

        return GraphQLError('Please supply a valid ClassID')

    def resolve_single_class(self, info, **kwargs):
        class_id = kwargs.get('ClassID')

        if class_id:
            return Class.objects.get(ClassID=class_id)
        
        return GraphQLError('Please supply a valid ClassID')

    def resolve_student_scores(self, info, **kwargs):
        student_id = kwargs.get('StudentID')

        if student_id:
            return QuizScores.objects.filter(StudentID=student_id)

    def resolve_quiz_scores(self, info, **kwargs):
        quiz_id = kwargs.get('QuizID')

        if quiz_id:
            return QuizScores.objects.filter(QuizID=quiz_id)

schema = graphene.Schema(query=Query, mutation=Mutation)
