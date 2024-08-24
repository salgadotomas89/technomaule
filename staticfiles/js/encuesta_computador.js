document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('encuestaForm');
    const preguntas = document.querySelectorAll('.pregunta');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressBar = document.querySelector('.progress-bar');
    let currentQuestion = 0;

    function showQuestion(n) {
        preguntas[currentQuestion].classList.remove('active');
        preguntas[n].classList.add('active');
        currentQuestion = n;

        if (currentQuestion === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inline-block';
        }

        if (currentQuestion === preguntas.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }

        updateProgressBar();
    }

    function updateProgressBar() {
        const progress = ((currentQuestion + 1) / preguntas.length) * 100;
        progressBar.style.width = progress + '%';
        progressBar.setAttribute('aria-valuenow', progress);
    }

    prevBtn.addEventListener('click', function() {
        showQuestion(currentQuestion - 1);
    });

    nextBtn.addEventListener('click', function() {
        if (validateCurrentQuestion()) {
            showQuestion(currentQuestion + 1);
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateCurrentQuestion()) {
            procesarRespuestas();
        }
    });

    function validateCurrentQuestion() {
        const currentInputs = preguntas[currentQuestion].querySelectorAll('input[type="radio"], select');
        let isValid = false;
        currentInputs.forEach(input => {
            if ((input.type === 'radio' && input.checked) || (input.type === 'select-one' && input.value !== '')) {
                isValid = true;
            }
        });
        if (!isValid) {
            alert('Por favor, responde la pregunta antes de continuar.');
        }
        return isValid;
    }

    function procesarRespuestas() {
        const usoPrincipal = document.querySelector('input[name="usoPrincipal"]:checked').value;
        const presupuesto = document.querySelector('select[name="presupuesto"]').value;
        const portabilidad = document.querySelector('input[name="portabilidad"]:checked').value;

        const recomendaciones = obtenerRecomendaciones(usoPrincipal, presupuesto, portabilidad);
        mostrarRecomendaciones(recomendaciones);
    }

    function obtenerRecomendaciones(uso, presupuesto, portabilidad) {
        // Aquí puedes definir tus recomendaciones basadas en las respuestas
        // Este es un ejemplo simple, deberías expandirlo según tus necesidades
        const recomendaciones = {
            oficina: {
                bajo: {
                    si: [
                        { nombre: "Notebook básico Lenovo", url: "https://www.example.com/lenovo-basic" },
                        { nombre: "HP Stream", url: "https://www.example.com/hp-stream" }
                    ],
                    no: [
                        { nombre: "Desktop Dell Inspiron", url: "https://www.example.com/dell-inspiron" },
                        { nombre: "Acer Aspire TC", url: "https://www.example.com/acer-aspire" }
                    ]
                },
                medio: {
                    si: [
                        { nombre: "MacBook Air", url: "https://www.example.com/macbook-air" },
                        { nombre: "Dell XPS 13", url: "https://www.example.com/dell-xps-13" }
                    ],
                    no: [
                        { nombre: "iMac 24\"", url: "https://www.example.com/imac-24" },
                        { nombre: "HP Pavilion Desktop", url: "https://www.example.com/hp-pavilion" }
                    ]
                }
            },
            diseño: {
                medio: {
                    si: [
                        { nombre: "MacBook Pro 13\"", url: "https://www.example.com/macbook-pro-13" },
                        { nombre: "Dell XPS 15", url: "https://www.example.com/dell-xps-15" }
                    ],
                    no: [
                        { nombre: "iMac 27\"", url: "https://www.example.com/imac-27" },
                        { nombre: "HP ENVY Desktop", url: "https://www.example.com/hp-envy" }
                    ]
                },
                alto: {
                    si: [
                        { nombre: "MacBook Pro 16\"", url: "https://www.example.com/macbook-pro-16" },
                        { nombre: "Razer Blade 15", url: "https://www.example.com/razer-blade-15" }
                    ],
                    no: [
                        { nombre: "Mac Studio", url: "https://www.example.com/mac-studio" },
                        { nombre: "Alienware Aurora", url: "https://www.example.com/alienware-aurora" }
                    ]
                }
            }
            // ... Añade más recomendaciones para otros usos, presupuestos y portabilidad
        };

        return recomendaciones[uso]?.[presupuesto]?.[portabilidad] || [];
    }

    function mostrarRecomendaciones(recomendaciones) {
        const resultadosDiv = document.getElementById('resultados');
        const recomendacionesDiv = document.getElementById('recomendaciones');
        recomendacionesDiv.innerHTML = '';

        if (recomendaciones.length === 0) {
            recomendacionesDiv.innerHTML = '<p>Lo sentimos, no tenemos recomendaciones específicas para tu combinación de preferencias. Por favor, contáctanos para una asesoría personalizada.</p>';
        } else {
            const lista = document.createElement('ul');
            lista.className = 'list-group';
            recomendaciones.forEach(rec => {
                const item = document.createElement('li');
                item.className = 'list-group-item';
                item.innerHTML = `<a href="${rec.url}" target="_blank">${rec.nombre}</a>`;
                lista.appendChild(item);
            });
            recomendacionesDiv.appendChild(lista);
        }

        // Ocultar el formulario y mostrar los resultados
        document.getElementById('encuestaForm').style.display = 'none';
        resultadosDiv.style.display = 'block';
    }

    showQuestion(currentQuestion);
});