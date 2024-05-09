import uuid
import pdfplumber
import openai
import json
from django.db import models
from django.conf import settings
from pathlib import Path
import os
import dotenv
import json

dotenv.load_dotenv()

class Student(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    enrollment_number = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Homework(models.Model):
    HOMEWORK_STATUS = (
        ('pending', 'Pending'),
        ('grading', 'Grading'),
        ('graded', 'Graded'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='homeworks')
    title = models.CharField(max_length=200)
    description = models.TextField()
    submission_date = models.DateField()
    file = models.FileField(upload_to='homeworks/')
    ocr_text = models.TextField(blank=True, null=True)
    grade = models.IntegerField(null=True, blank=True)
    feedback = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=HOMEWORK_STATUS, default='pending')

    def __str__(self):
        return f"{self.title} - {self.get_status_display()} ({self.student.first_name} {self.student.last_name})"

    def read_pdf(self, file_path):
        text = ''
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ''
        return text

    def grade_assignment(self):
        student_text = self.read_pdf(self.file.path)
        rubric_text = self.read_pdf('professor/Rubric.pdf')

        prompt = f"""
            Assess the following student assignment based on the detailed rubric provided. The goal is to determine how well the student has met the criteria outlined in the rubric.

            --- Rubric Description ---
            {rubric_text}

            --- Student Assignment Text ---
            {student_text}

            Please provide the following in JSON format:
            {{
                "grade": "A numerical grade out of 10, considering the completeness and correctness of the student's answers compared to the rubric.",
                "feedback": {{
                    "strengths": "Detailed strengths highlighting what concepts were well understood and correctly applied.",
                    "improvements": "Detailed areas for improvement where the student failed to meet the rubric's criteria or showed misunderstanding."
                }}
            }}
            """

        client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ]
        )

        result_text = response.choices[0].message.content.strip()

        print(result_text)
        print(self.student.first_name, self.student.last_name)
        grade, feedback = parse_response(result_text)
        print(grade, feedback)
        self.ocr_text = student_text
        self.grade = grade
        self.feedback = feedback
        self.status = 'graded'
        self.save()


def parse_response(response_text):
    try:
        data = json.loads(response_text)
        grade = int(data["grade"])
        # Formulating feedback as a readable string
        feedback_str = (f"Strengths of the work: {data['feedback']['strengths']}. "
                        f"Areas for improvement: {data['feedback']['improvements']}.")
        return grade, feedback_str
    except json.JSONDecodeError as e:
        print(f"Failed to decode JSON: {str(e)}")
        return None, "Feedback could not be parsed due to JSON decoding error."
    except KeyError as e:
        print(f"Missing expected key in JSON response: {str(e)}")
        return None, "Feedback could not be parsed due to missing keys in JSON."
    except ValueError as e:
        print(f"Error processing numerical values: {str(e)}")
        return None, "Feedback could not be parsed due to value error."