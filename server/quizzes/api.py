from rest_framework import serializers, viewsets
from .models import Class, Quiz, Question, Choice

class ClassSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Class
        fields = ('ClassName')
    # Check and add more fields from class schema

class ClassViewset(viewsets.ModelViewSet):

    serializer_class = ClassSerializer
    queryset = Class.objects.all()

###


class QuizSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Quiz
        fields = ('QuizName')
    # Check and add more fields from quiz schema

class QuizViewset(viewsets.ModelViewSet):

    serializer_class = QuizSerializer
    queryset = Class.objects.all()

###

class QuestionSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Question
        fields = ('Question')
    # Check and add more fields from question schema

class QuestionViewset(viewsets.ModelViewSet):

    serializer_class = QuestionSerializer
    queryset = Class.objects.all()

###

class ChoiceSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Choice
        fields = ('Choice')
    # Check and add more fields from choice schema

class ChoiceViewset(viewsets.ModelViewSet):

    serializer_class = ChoiceSerializer
    queryset = Class.objects.all()