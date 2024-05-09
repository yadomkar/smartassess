from django.urls import path
from .views import HomeworkUploadView, HomeworkListView, HomeworkStatusView, HomeworkDetailView, FileUploadView

urlpatterns = [
    path('homeworks/upload/', HomeworkUploadView.as_view(), name='homework-upload'),
    path('homeworks/', HomeworkListView.as_view(), name='homework-list'),
    path('homeworks/status/', HomeworkStatusView.as_view(), name='homework-startus'),
    path('homeworks/detail/', HomeworkDetailView.as_view(), name='homework-detail'),
    path('professor/upload/', FileUploadView.as_view(), name='file-upload'),
]
