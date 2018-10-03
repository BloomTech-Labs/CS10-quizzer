import graphene
import jwt
import time
import graphql

from decouple import config
from graphene_django import DjangoObjectType
from graphql import GraphQLError, GraphQLObjectType, GraphQLList
from quizzes.graphql.mutations.classes import CreateClass
from quizzes.models import Class, Quiz, Question, Choice, Teacher, Student, Student_Quiz, Class_Quiz

from quizzes.graphql.mutation import (
    CreateTeacher, QueryTeacher, CreateStudent, CreateQuiz, CreateQuestion,
    CreateChoice, UpdateTeacherInformation, AddQuizToClass, DeleteStudent,
    UpdateClassName
)

from quizzes.graphql.query import (
    ClassType, QuizType, QuestionType, ChoiceType, TeacherType, StudentType, Class_QuizType
)



class Mutation(graphene.ObjectType):
    '''
    Mutation class allows us to make POST/Mutation requests to create new
    fields
    '''
    create_class      = CreateClass.Field()
    update_class      = UpdateClassName.Field()
    create_teacher    = CreateTeacher.Field()
    update_teacher    = UpdateTeacherInformation.Field()
    query_teacher     = QueryTeacher.Field()
    create_student    = CreateStudent.Field()
    delete_student    = DeleteStudent.Field()
    create_quiz       = CreateQuiz.Field()
    create_question   = CreateQuestion.Field()
    create_choice     = CreateChoice.Field()
    add_quiz_to_class = AddQuizToClass.Field()


class Query(graphene.ObjectType):
    '''
    Allows us to make GET/Query requests from the DB using GraphQL
    '''
    classes         = graphene.List(ClassType, enc_jwt=graphene.String())
    single_class    = graphene.String(ClassID=graphene.String())

    public_quizzes  = graphene.List(QuizType)
    single_quiz     = graphene.Field(QuizType, QuizID=graphene.String())
    class_quizzes   = graphene.List(QuizType, ClassID=graphene.String())
    teacher_quizzes = graphene.List(QuizType, enc_jwt=graphene.String())
    
    quiz_questions  = graphene.List(QuestionType, QuizID=graphene.String())
    questions       = graphene.List(QuestionType)
    
    choices         = graphene.List(ChoiceType)

    teachers        = graphene.List(TeacherType)
    teacher         = graphene.List(TeacherType, enc_jwt=graphene.String())
    
    students        = graphene.List(StudentType)
    class_students  = graphene.List(StudentType, ClassID=graphene.String())

    '''
    Each method, resolve_<< name >>, is named after what we want to return.
    For example, we have a property called `classes` so we name our
    `resolve_` method `resolve_classes()` which will then return our query
    to `Class.objects.all()` from the DB
    '''
    def resolve_single_quiz(self, info, **kwargs):
        try:
            QuizID = kwargs.get('QuizID')
            return Quiz.objects.get(pk=QuizID)

        except:
            return GraphQLError('Something went wrong')
        
    
    def resolve_teacher(self, info, **kwargs):
        enc_jwt    = kwargs.get('enc_jwt').encode('utf-8')
        secret     = config('SECRET_KEY')
        algorithm  = 'HS256'
        dec_jwt    = jwt.decode(enc_jwt, secret, algorithms=[ algorithm ])
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

            return teacher.class_set.all()
            
            # return Class.objects.filter(
            #     TeacherID__TeacherEmail__contains=teacher.TeacherEmail
            #     )

        except:
            raise GraphQLError('Please supply a valid JWT')

    def resolve_public_quizzes(self, info):
        return Quiz.objects.filter(Public=True)

    def resolve_class_quizzes(self, info, **kwargs):
        class_id = kwargs.get('ClassID')

        if class_id:
            classroom = Class.objects.get(ClassID=class_id)
            return classroom.quiz_set.all()

        return GraphQLError('Please supply a valid ClassID')

    def resolve_teacher_quizzes(self, info, **kwargs):
        if 'enc_jwt' in kwargs:
            enc_jwt   = kwargs.get('enc_jwt').encode('utf-8')
            secret    = config('SECRET_KEY')
            algorithm = 'HS256'
            dec_jwt   = jwt.decode(enc_jwt, secret, algorithms=[ algorithm ])
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

    def resolve_questions(self, info):
        return Question.objects.all()

    def resolve_choices(self, info):
        return Choice.objects.all()

    def resolve_teachers(self, info):
        return Teacher.objects.all()

    def resolve_students(self, info):
        return Student.objects.all()

    def resolve_class_students(self, info, **kwargs):
        class_id = kwargs.get('ClassID')

        if class_id:
            classroom = Class.objects.get(ClassID=class_id)
            return classroom.student_set.all()

        return GraphQLError('Please supply a valid ClassID')

    def resolve_single_class(self, info, **kwargs):
        class_id = kwargs.get('ClassID')

        if class_id:
            classroom = Class.objects.get(ClassID=class_id)
            return classroom.ClassName
        
        return GraphQLError('Please supply a valid ClassID')

schema = graphene.Schema(query=Query, mutation=Mutation)
