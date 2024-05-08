from django.urls import path
from .views import HomeworkUploadView, HomeworkListView

urlpatterns = [
    path('homeworks/upload/', HomeworkUploadView.as_view(), name='homework-upload'),
    path('homeworks/', HomeworkListView.as_view(), name='homework-list'),
]
