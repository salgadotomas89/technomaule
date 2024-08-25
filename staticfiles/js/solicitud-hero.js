document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('solicitud-form');
    const mensajeExito = document.getElementById('mensaje-exito');
    const telefonoInput = document.getElementById('telefono');

    function validarTelefonoChileno(telefono) {
        // Regex para validar números chilenos
        // Acepta formatos: +56912345678, +56 9 12345678, 912345678, 09 12345678
        const regex = /^(\+?56|0)?(9\d{8})$/;
        return regex.test(telefono.replace(/\s+/g, '')); // Elimina espacios antes de validar
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const telefono = telefonoInput.value;

        if (!validarTelefonoChileno(telefono)) {
            alert('Por favor, ingrese un número de teléfono válido.');
            return;
        }

        // Formatea el número antes de enviarlo (opcional)
        const telefonoFormateado = '+56' + telefono.replace(/\D/g, '').slice(-9);

        fetch('/solicitar-servicio/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({telefono: telefonoFormateado}),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                form.style.display = 'none';
                mensajeExito.style.display = 'block';
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Ocurrió un error al procesar la solicitud');
        });
    });

    // Opcional: Formatear el número mientras el usuario escribe
    telefonoInput.addEventListener('input', function(e) {
        let numero = e.target.value.replace(/\D/g, '');
        if (numero.length > 9) {
            numero = numero.slice(0, 9);
        }
        if (numero.length > 1) {
            numero = '+56' + numero;
        }
        e.target.value = numero;
    });
});