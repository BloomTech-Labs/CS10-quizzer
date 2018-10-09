import graphene
import jwt
import time

from decouple import config
from graphql import GraphQLError
from quizzes.models import Class, Teacher

from quizzes.helpers.jwt_helpers import decode_jwt

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
        dec_jwt = decode_jwt(enc_jwt)

        # `user` variable needs to be changed to use the ID given by the JWT
        # for now JWT does NOT return a userID
        teacherID = dec_jwt[ 'sub' ][ 'id' ]
        teacher = Teacher.objects.get(TeacherID=teacherID)
        
        # if token is expired return expiration error to teacher
        if dec_jwt[ 'exp' ] < time.time():
            raise GraphQLError('Token has expired.')
        
        # if teacher does not exist in the database return error
        if not teacher:
            raise GraphQLError('This teacher does not exist')
        
        # this portion is unreachable if any of the above conditions are true
        new_class = Class.objects.create(ClassName=ClassName, Teacher=teacher)

        return CreateClass(new_class=new_class)


class ClassMutation(graphene.ObjectType):
    ClassID  = graphene.String()
    Teacher = graphene.String()
    ClassName  = graphene.String()
    created_at = graphene.DateTime()

'''
end CreateClass
'''