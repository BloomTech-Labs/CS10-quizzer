from graphene_django import DjangoObjectType
import graphene

from quizzes.graphql.query import ClassType, QuizType, QuestionType, ChoiceType
from quizzes.models import Class, Quiz, Question, Choice


class CreateClass(graphene.Mutation):
    class Arguments:
        ClassName = graphene.String()

    ok = graphene.Boolean()
    new_class = graphene.Field(lambda: ClassMutation)

    @staticmethod
    def mutate(self, info, ClassName):
        # new_class = ClassMutation(ClassName=ClassName)
        new_class = Class.objects.create(ClassName=ClassName)
        ok = True

        return CreateClass(new_class=new_class, ok=ok)


class ClassMutation(graphene.ObjectType):
    ClassName = graphene.String()


class Mutation(graphene.ObjectType):
    create_class = CreateClass.Field()


class Query(graphene.ObjectType):
    '''
    Allows us to make GET/Query requests from the DB using GraphQL
    '''
    classes = graphene.List(ClassType)
    quizzes = graphene.List(QuizType)
    questions = graphene.List(QuestionType)
    choices = graphene.List(ChoiceType)

    def resolve_classes(self, info):
        return Class.objects.all()

    def resolve_quizzes(self, info):
        return Quiz.objects.all()

    def resolve_questions(self, info):
        return Question.objects.all()

    def resolve_choices(self, info):
        return Choice.objects.all()


schema = graphene.Schema(query=Query, mutation=Mutation)