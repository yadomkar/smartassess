from django.urls import path
from .views import HomeworkUploadView

urlpatterns = [
    path('homeworks/upload/', HomeworkUploadView.as_view(), name='homework-upload'),
]
