// ========== NAVEGACIÓN Y MENÚ ==========

// Smooth scroll para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Cerrar menú hamburguesa si está abierto
            const navLinks = document.getElementById('navLinks');
            const hamburger = document.getElementById('hamburger');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Menú Hamburguesa Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Función para scroll al menú
function scrollToMenu() {
    const menuSection = document.getElementById('menu');
    const offsetTop = menuSection.offsetTop - 80;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

// ========== CARRUSEL DE GALERÍA ==========
let currentSlide = 0;
const totalSlides = 7; // Número total de imágenes en la galería

// Inicializar carrusel cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    // Auto-play del carrusel cada 5 segundos
    setInterval(() => {
        moveCarousel(1);
    }, 5000);
});

function initCarousel() {
    const dotsContainer = document.getElementById('carouselDots');
    if (!dotsContainer) return;
    
    // Crear los puntos indicadores
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function moveCarousel(direction) {
    currentSlide += direction;
    
    // Loop infinito
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.dot');
    
    if (!track) return;
    
    // Mover el carrusel
    const offset = -currentSlide * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    // Actualizar dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Soporte para gestos táctiles (swipe) en móviles
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-wrapper');
    if (!carousel) return;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        moveCarousel(1); // Swipe izquierda
    }
    if (touchEndX > touchStartX + 50) {
        moveCarousel(-1); // Swipe derecha
    }
}

// ========== GENERACIÓN DE PDF ==========

function downloadMenu() {
    // Descarga el PDF generado por el script de Python
    const link = document.createElement('a');
    link.href = 'Menu_RikoRiko.pdf';
    link.download = 'Menu_RikoRiko.pdf';
    link.click();
}

// ========== ANIMACIONES DE SCROLL ==========

// Animación al hacer scroll
window.addEventListener('scroll', () => {
    const menuCategories = document.querySelectorAll('.menu-category');
    
    menuCategories.forEach(category => {
        const categoryTop = category.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (categoryTop < windowHeight - 100) {
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
        }
    });
});

// Inicializar opacidad de categorías para animación
document.addEventListener('DOMContentLoaded', () => {
    const menuCategories = document.querySelectorAll('.menu-category');
    menuCategories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Navbar transparente al hacer scroll
let lastScroll = 0;
const navbar = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});