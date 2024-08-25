import json
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

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