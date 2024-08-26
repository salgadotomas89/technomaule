
from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('solicitar-servicio/', views.solicitar_servicio, name='solicitar_servicio'),
    path('enviar-contacto/', views.enviar_contacto, name='enviar_contacto'),
]
