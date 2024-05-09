from rest_framework import serializers
from .models import Homework, Student

class HomeworkSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()

    class Meta:
        model = Homework
        fields = [field.name for field in Homework._meta.fields] + ['student_name']

    def get_student_name(self, obj):
        return str(obj.student)

    def create(self, validated_data):
        return Homework.objects.create(**validated_data)


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name', 'email', 'enrollment_number']


class HomeworkStatusSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()

    class Meta:
        model = Homework
        fields = ['student_name', 'status', 'student']

    def get_student_name(self, obj):
        # Access the student object through the foreign key relationship
        return str(obj.student)

class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()