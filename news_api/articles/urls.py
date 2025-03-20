from django.urls import path
from .views import ArticleListCreateView, ArticleDetailView

urlpatterns = [
    path('articles/', ArticleListCreateView.as_view(), name='article-list-create'), # POST /articles /GET articles
    path('articles/<int:pk>/', ArticleDetailView.as_view(), name='article-detail'), #PUT /articles/3 DELETE /articles/5
]