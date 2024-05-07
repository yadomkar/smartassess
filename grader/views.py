from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import Homework, Student
from .serializers import HomeworkSerializer

class HomeworkUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        # Check if student ID is provided in the request
        student_id = request.data.get('student')
        if not Student.objects.filter(id=student_id).exists():
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = HomeworkSerializer(data=request.data)
        if serializer.is_valid():
            homework = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
