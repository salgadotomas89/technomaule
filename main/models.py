from django.db import models

# Create your models here.

from django.db import models

class Solicitud(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15)
    direccion = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_termino = models.DateTimeField(null=True, blank=True)
    diagnostico = models.TextField(blank=True)
    problema_dispositivo = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido} - {self.fecha_creacion}"
    

