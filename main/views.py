from django.shortcuts import render

# Create your views here.


def inicio(request):

    return render(request, 'index.html')


def encuesta_computador(request):
    print('hola')
    if request.method == 'POST':
        # Aquí procesarías los datos de la encuesta
        pass
    return render(request, 'encuesta_computador.html')