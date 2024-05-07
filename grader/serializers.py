from rest_framework import serializers
from .models import Homework

class HomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        fields = '__all__'  # This will include all fields from the Homework model

    def create(self, validated_data):
        return Homework.objects.create(**validated_data)