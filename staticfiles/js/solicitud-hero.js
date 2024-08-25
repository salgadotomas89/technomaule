document.addEventListener('DOMContentLoaded', function() {
    console.log('hola hola')
    const form = document.getElementById('solicitud-form');
    const mensajeExito = document.getElementById('mensaje-exito');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const telefono = document.getElementById('telefono').value;

        fetch('/solicitar-servicio/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({telefono: telefono}),
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
});