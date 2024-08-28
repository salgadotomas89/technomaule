document.addEventListener('DOMContentLoaded', (event) => {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    const scrollThreshold = 50; // Ajusta este valor según sea necesario

    if (navbar) {
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                // Scrolling down
                navbar.classList.add('navbar-scrolled');
            } else if (scrollTop < lastScrollTop && navbar.classList.contains('navbar-scrolled')) {
                // Scrolling up
                if (scrollTop <= scrollThreshold) {
                    navbar.classList.remove('navbar-scrolled');
                }
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
    }

    const marquee = document.querySelector('.marquee span');
    if (marquee) {
        marquee.addEventListener('animationiteration', () => {
            setTimeout(() => {
                marquee.style.animation = 'none';
                marquee.offsetHeight; /* trigger reflow */
                marquee.style.animation = null;
            }, 0);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement && navbar) {
                const navbarHeight = navbar.offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Log para depuración
    console.log('Script cargado. Navbar:', navbar ? 'encontrado' : 'no encontrado');
});