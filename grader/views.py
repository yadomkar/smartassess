from datetime import date
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import Homework, Student
from .serializers import HomeworkSerializer, StudentSerializer, HomeworkStatusSerializer, FileUploadSerializer
from django.core.files.storage import FileSystemStorage


class HomeworkUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        # Retrieve 'student_id' from the query parameters
        student_id = request.query_params.get('student_id')
        if not Student.objects.filter(id=student_id).exists():
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

        # Add default values for 'description' and 'title' if they are not provided
        request.data['submission_date'] = date.today().isoformat()  # Add today's date as submission date
        request.data.setdefault('description', 'Default Homework Description')
        request.data.setdefault('title', 'Default Homework Title')
        request.data['student'] = student_id

        # Proceed with serializing the homework data
        serializer = HomeworkSerializer(data=request.data)
        if serializer.is_valid():
            # Save the validated homework data
            homework = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Return errors if the data is not valid
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HomeworkListView(APIView):
    def get(self, request):
        homeworks = Homework.objects.all()
        serializer = HomeworkSerializer(homeworks, many=True)
        return Response(serializer.data)


class HomeworkStatusView(APIView):
    def get(self, request):
        homeworks = Homework.objects.all()
        serializer = HomeworkStatusSerializer(homeworks, many=True)
        return Response(serializer.data)

class HomeworkDetailView(APIView):
    def get(self, request):
        student_id = request.query_params.get('student_id')
        homework = Homework.objects.filter(student_id=student_id).order_by('-submission_date').first()
        serializer = HomeworkSerializer(homework)
        return Response(serializer.data)

class FileUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        serializer = FileUploadSerializer(data=request.data)
        if serializer.is_valid():
            file = serializer.validated_data['file']
            fs = FileSystemStorage(location='professor/')  # Define the directory to save files
            filename = fs.save(file.name, file)
            file_url = fs.url(filename)
            return Response({'file_url': file_url}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)