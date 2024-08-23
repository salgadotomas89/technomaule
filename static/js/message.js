document.addEventListener('DOMContentLoaded', (event) => {
    const marquee = document.querySelector('.marquee span');
    marquee.addEventListener('animationiteration', () => {
        setTimeout(() => {
            marquee.style.animation = 'none';
            marquee.offsetHeight; /* trigger reflow */
            marquee.style.animation = null;
        }, 0);
    });
});