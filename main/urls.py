
from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('encuesta-computador/', views.encuesta_computador, name='encuesta_computador'),

]
