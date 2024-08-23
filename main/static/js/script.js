document.addEventListener('DOMContentLoaded', (event) => {
    const navbar = document.querySelector('.navbar');
    const topBar = document.querySelector('.top-bar');
    let lastScrollTop = 0;
    const scrollThreshold = 50; // Ajusta este valor según sea necesario

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Scrolling down
            navbar.classList.add('navbar-scrolled');
            topBar.classList.add('top-bar-hidden');
        } else if (scrollTop < lastScrollTop && navbar.classList.contains('navbar-scrolled')) {
            // Scrolling up
            if (scrollTop <= scrollThreshold) {
                navbar.classList.remove('navbar-scrolled');
                topBar.classList.remove('top-bar-hidden');
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);


    const marquee = document.querySelector('.marquee span');
    marquee.addEventListener('animationiteration', () => {
        setTimeout(() => {
            marquee.style.animation = 'none';
            marquee.offsetHeight; /* trigger reflow */
            marquee.style.animation = null;
        }, 0);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const topBarHeight = topBar.offsetHeight;
            const navbarHeight = navbar.offsetHeight;
            const totalOffset = topBarHeight + navbarHeight;

            window.scrollTo({
                top: targetElement.offsetTop - totalOffset,
                behavior: 'smooth'
            });
        });
    });
});