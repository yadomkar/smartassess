from django.urls import path
from .views import HomeworkUploadView, HomeworkListView, HomeworkStatusView

urlpatterns = [
    path('homeworks/upload/', HomeworkUploadView.as_view(), name='homework-upload'),
    path('homeworks/', HomeworkListView.as_view(), name='homework-list'),
    path('homeworks/status/', HomeworkStatusView.as_view(), name='homework-startus'),
]
