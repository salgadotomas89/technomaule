document.addEventListener('DOMContentLoaded', function() {
    const imageContainer = document.querySelector('#nosotros .image-container');
    const overlay = imageContainer.querySelector('.overlay');

    imageContainer.addEventListener('mouseenter', function() {
        overlay.style.opacity = '1';
    });

    imageContainer.addEventListener('mouseleave', function() {
        overlay.style.opacity = '0';
    });
});