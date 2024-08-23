
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    # Aquí puedes agregar las URLs de tus aplicaciones, por ejemplo:
    # path('', include('home.urls')),
    path('', include('main.urls')),
]
