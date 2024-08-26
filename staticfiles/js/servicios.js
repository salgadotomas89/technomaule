document.addEventListener('DOMContentLoaded', function() {
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceImages = document.querySelectorAll('.service-image');

    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const service = this.getAttribute('data-service');
            updateActiveService(service);
        });

        item.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            updateActiveService(service);
        });
    });

    function updateActiveService(service) {
        // Remove active class from all items and images
        serviceItems.forEach(i => i.classList.remove('active'));
        serviceImages.forEach(img => img.classList.remove('active'));
        
        // Add active class to hovered/clicked item and corresponding image
        document.querySelector(`.service-item[data-service="${service}"]`).classList.add('active');
        document.getElementById(`${service}-image`).classList.add('active');
    }
});