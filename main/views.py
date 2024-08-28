import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from main.models import Solicitud


# Create your views here.


def inicio(request):

    return render(request, 'index.html')



@csrf_exempt
def solicitar_servicio(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        telefono = data.get('telefono')
        
        if telefono:
            solicitud = Solicitud(telefono=telefono)
            solicitud.save()
            return JsonResponse({'status': 'success', 'message': 'Solicitud recibida'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Número de teléfono no proporcionado'}, status=400)
    
    return JsonResponse({'status': 'error', 'message': 'Método no permitido'}, status=405)


@csrf_exempt
def enviar_contacto(request):
    if request.method == 'POST':
        try:
            # Intenta obtener datos del cuerpo JSON
            try:
                data = json.loads(request.body)
            except json.JSONDecodeError:
                # Si no es JSON, asume que es FormData
                data = request.POST

            print("Datos recibidos:", data)

            nombre = data.get('nombre')
            apellido = data.get('apellido')
            telefono = data.get('telefono')
            direccion = data.get('direccion')
            problema_dispositivo = data.get('mensaje')

            print("Nombre:", nombre)
            print("Apellido:", apellido)
            print("Teléfono:", telefono)
            print("Dirección:", direccion)
            print("Problema del dispositivo:", problema_dispositivo)

            # Verificar que todos los campos requeridos estén presentes y no estén vacíos
            required_fields = [nombre, apellido, telefono, direccion, problema_dispositivo]
            if all(field.strip() if field else None for field in required_fields):
                solicitud = Solicitud(
                    nombre=nombre,
                    apellido=apellido,
                    telefono=telefono,
                    direccion=direccion,
                    problema_dispositivo=problema_dispositivo
                )
                solicitud.save()
                return JsonResponse({'status': 'success', 'message': 'Solicitud de contacto recibida'})
            else:
                print("Error: Campos vacíos o faltantes")
                return JsonResponse({'status': 'error', 'message': 'Por favor, complete todos los campos requeridos'}, status=400)
        except Exception as e:
            print(f"Error inesperado: {str(e)}")
            # Log the error here if you have error logging set up
            return JsonResponse({'status': 'error', 'message': 'Ha ocurrido un error en el servidor. Por favor, inténtelo más tarde'}, status=500)
    
    print("Método no permitido")
    return JsonResponse({'status': 'error', 'message': 'Método no permitido'}, status=405)