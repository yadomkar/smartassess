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
    class Meta:
        model = Homework
        fields = ['student', 'status']  # This will include all fields from the Homework model