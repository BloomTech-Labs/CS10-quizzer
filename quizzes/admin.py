from django.contrib import admin
from .models import (
    Class, Quiz, Question, Choice, Teacher, Student, Class_Quiz, Student_Quiz
)

# # Register your models here.
class QuizAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at', 'last_modified')

admin.site.register(
    (Class, Quiz, Question, Choice, Teacher, Student, Class_Quiz, Student_Quiz),
    QuizAdmin
    )
