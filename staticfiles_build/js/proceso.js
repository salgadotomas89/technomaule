document.addEventListener('DOMContentLoaded', function() {
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({ 
            startOnLoad: true,
            theme: 'default',
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true,
                curve: 'basis'
            },
            securityLevel: 'loose'
        });

        // Función para ajustar el tamaño del diagrama
        function resizeMermaidDiagram() {
            var diagrams = document.querySelectorAll('.mermaid');
            diagrams.forEach(function(diagram) {
                diagram.style.width = '100%';
                diagram.style.height = 'auto';
            });
            mermaid.init(undefined, diagrams);
        }

        // Ejecutar al cargar y al cambiar el tamaño de la ventana
        resizeMermaidDiagram();
        window.addEventListener('resize', resizeMermaidDiagram);
    } else {
        console.error('Mermaid no está cargado. Asegúrate de incluir la biblioteca correctamente.');
    }
});