from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer
import time

class ArticleListCreateView(generics.ListCreateAPIView): # GET ir POST'int, kad galesim ir issitraukt data ir postint datas
    queryset = Article.objects.all().order_by('-published_at')
    serializer_class = ArticleSerializer

    # def list(self, request, *args, **kwargs):
    #     time.sleep(3)  # Delay for 3 seconds before returning data
    #     return super().list(request, *args, **kwargs)

    # def create(self, request, *args, **kwargs):
    #     time.sleep(3)  # Delay for 3 seconds before processing POST request
    #     return super().create(request, *args, **kwargs)

class ArticleDetailView(generics.RetrieveUpdateDestroyAPIView): # DELETE ir UPDATE 
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer