document.addEventListener('DOMContentLoaded', function() {
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceImages = document.querySelectorAll('.service-image');

    function isMobile() {
        return window.innerWidth < 768;
    }

    function updateActiveService(service) {
        if (!isMobile()) {
            serviceItems.forEach(i => i.classList.remove('active'));
            serviceImages.forEach(img => img.classList.remove('active'));
            
            document.querySelector(`.service-item[data-service="${service}"]`).classList.add('active');
            document.getElementById(`${service}-image`).classList.add('active');
        }
    }

    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (!isMobile()) {
                const service = this.getAttribute('data-service');
                updateActiveService(service);
            }
        });

        item.addEventListener('click', function() {
            if (!isMobile()) {
                const service = this.getAttribute('data-service');
                updateActiveService(service);
            }
        });
    });

    function handleResize() {
        if (isMobile()) {
            serviceItems.forEach(i => i.classList.remove('active'));
        } else {
            updateActiveService('software');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on load
});