import graphene

from quizzes.models import Class, Quiz, Question, Choice

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
    new_class = graphene.Field(lambda: ClassMutation)

    @staticmethod
    def mutate(self, info, ClassName):
        new_class = Class.objects.create(ClassName=ClassName)
        ok = True

        return CreateClass(new_class=new_class, ok=ok)


class ClassMutation(graphene.ObjectType):
    ClassName = graphene.String()