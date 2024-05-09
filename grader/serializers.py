from rest_framework import serializers
from .models import Homework, Student

class HomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        fields = '__all__'  # This will include all fields from the Homework model

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