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

// Función para descargar el menú como PDF
function downloadMenu() {
    // Crear un elemento temporal para mostrar mensaje
    const downloadBtn = document.querySelector('.btn-download');
    const originalText = downloadBtn.innerHTML;
    
    downloadBtn.innerHTML = '⏳ Generando PDF...';
    downloadBtn.disabled = true;

    // Usar html2pdf.js para generar el PDF
    // Primero necesitamos cargar la librería
    if (typeof html2pdf === 'undefined') {
        loadHtml2Pdf().then(() => {
            generatePDF(downloadBtn, originalText);
        });
    } else {
        generatePDF(downloadBtn, originalText);
    }
}

// Cargar la librería html2pdf dinámicamente
function loadHtml2Pdf() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Generar el PDF
function generatePDF(button, originalText) {
    // Crear contenedor temporal para el PDF
    const pdfContainer = document.createElement('div');
    pdfContainer.style.padding = '10px';
    pdfContainer.style.background = 'linear-gradient(135deg, #FFF8E7 0%, #FFE8CC 100%)';
    pdfContainer.style.fontFamily = 'Arial, sans-serif';
    pdfContainer.style.color = '#1a1a1a';
    pdfContainer.style.width = '100%';
    pdfContainer.style.boxSizing = 'border-box';
    
    // Header del PDF con diseño retro
    const header = document.createElement('div');
    header.style.textAlign = 'center';
    header.style.marginBottom = '12px';
    header.style.paddingBottom = '10px';
    header.style.background = 'linear-gradient(135deg, #FFFAF0 0%, #FFF8E7 100%)';
    header.style.borderRadius = '12px';
    header.style.border = '3px dashed #D2691E';
    header.style.padding = '12px';
    header.style.boxShadow = '4px 4px 0px rgba(210, 105, 30, 0.3)';
    header.style.position = 'relative';
    
    // Decoración superior
    const topDecor = document.createElement('div');
    topDecor.innerHTML = '🍔 • 🍟 • 🌭 • 🍕 • 🥤';
    topDecor.style.fontSize = '16px';
    topDecor.style.marginBottom = '8px';
    topDecor.style.letterSpacing = '3px';
    header.appendChild(topDecor);
    
    // Logo en texto retro
    const logo = document.createElement('div');
    logo.style.marginBottom = '8px';
    logo.innerHTML = `
        <div style="margin-bottom: 5px;">
            <span style="font-size: 36px; font-weight: 900; font-family: 'Impact', 'Arial Black', sans-serif; color: #FF6B35; text-shadow: 3px 3px 0px rgba(0, 0, 0, 0.2); letter-spacing: 2px;">Riko</span>
            <span style="font-size: 36px; font-weight: 900; font-family: 'Impact', 'Arial Black', sans-serif; color: #D2691E; text-shadow: 3px 3px 0px rgba(0, 0, 0, 0.2); letter-spacing: 2px;">Riko</span>
        </div>
        <div style="font-size: 16px; margin: 5px 0;">🍟</div>
        <div style="background: linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFC107 100%); color: white; font-size: 10px; font-weight: 900; padding: 4px 15px; border-radius: 12px; border: 2px solid #1a1a1a; display: inline-block; box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.3); letter-spacing: 2px; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">FAST FOOD CART</div>
    `;
    header.appendChild(logo);
    
    const subtitle = document.createElement('h1');
    subtitle.textContent = '• MENÚ •';
    subtitle.style.color = '#D2691E';
    subtitle.style.fontSize = '24px';
    subtitle.style.marginTop = '10px';
    subtitle.style.marginBottom = '8px';
    subtitle.style.textShadow = '2px 2px 0px rgba(0,0,0,0.15)';
    subtitle.style.fontWeight = '900';
    subtitle.style.letterSpacing = '3px';
    subtitle.style.fontFamily = "'Impact', 'Arial Black', sans-serif";
    header.appendChild(subtitle);
    
    // Línea divisora decorativa
    const divider = document.createElement('div');
    divider.style.height = '3px';
    divider.style.background = 'repeating-linear-gradient(90deg, #D2691E, #D2691E 10px, transparent 10px, transparent 20px)';
    divider.style.margin = '8px 0';
    divider.style.border = '2px dashed #D2691E';
    divider.style.borderLeft = 'none';
    divider.style.borderRight = 'none';
    header.appendChild(divider);
    
    const contact = document.createElement('div');
    contact.style.background = '#FFFAF0';
    contact.style.padding = '8px';
    contact.style.borderRadius = '10px';
    contact.style.marginTop = '8px';
    contact.style.border = '2px dashed #FF6B35';
    contact.style.boxShadow = '2px 2px 0px rgba(210, 105, 30, 0.2)';
    contact.innerHTML = `
        <p style="margin: 4px 0; color: #1a1a1a; font-size: 11px; font-weight: 900;">📱 <span style="color: #FF6B35;">WhatsApp:</span> +56 9 4687 6119</p>
        <p style="margin: 4px 0; color: #1a1a1a; font-size: 11px; font-weight: 900;">📍 <span style="color: #D2691E;">Dirección:</span> El vergel alto 1936, Valparaíso</p>
    `;
    header.appendChild(contact);
    
    // Decoración inferior
    const bottomDecor = document.createElement('div');
    bottomDecor.innerHTML = '🍔 • 🍕 • 🌮 • 🍟 • 🥤';
    bottomDecor.style.fontSize = '14px';
    bottomDecor.style.marginTop = '8px';
    bottomDecor.style.letterSpacing = '3px';
    header.appendChild(bottomDecor);
    
    pdfContainer.appendChild(header);
    
    // Obtener todas las categorías del menú
    const categories = document.querySelectorAll('.menu-category');
    
    // Iconos para cada categoría
    const categoryIcons = {
        'Hamburguesas': '🍔',
        'Completos': '🌭',
        'Papas Fritas': '🍟',
        'Bebidas': '🥤',
        'Extras': '➕',
        'Combos': '🎉'
    };
    
    categories.forEach((category, index) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'menu-category-pdf';
        categoryDiv.style.marginBottom = '10px';
        categoryDiv.style.pageBreakInside = 'avoid';
        categoryDiv.style.pageBreakBefore = index > 0 ? 'always' : 'auto';
        categoryDiv.style.pageBreakAfter = 'auto';
        categoryDiv.style.breakInside = 'avoid';
        categoryDiv.style.background = 'linear-gradient(135deg, #FFFAF0 0%, #FFF8E7 100%)';
        categoryDiv.style.padding = '10px';
        categoryDiv.style.borderRadius = '12px';
        categoryDiv.style.border = '3px dashed #D2691E';
        categoryDiv.style.boxShadow = '4px 4px 0px rgba(210, 105, 30, 0.3)';
        categoryDiv.style.position = 'relative';
        categoryDiv.style.width = '100%';
        
        // Eliminar el pageBreakAfter de la última categoría para que el footer quede junto
        if (index === categories.length - 1) {
            categoryDiv.style.pageBreakAfter = 'auto';
        }
        
        // Decoración de esquina
        const corner = document.createElement('div');
        corner.style.position = 'absolute';
        corner.style.top = '-8px';
        corner.style.right = '-8px';
        corner.style.width = '35px';
        corner.style.height = '35px';
        corner.style.background = 'linear-gradient(135deg, #FF6B35, #FFC107)';
        corner.style.borderRadius = '50%';
        corner.style.border = '3px solid #1a1a1a';
        corner.style.display = 'flex';
        corner.style.alignItems = 'center';
        corner.style.justifyContent = 'center';
        corner.style.fontSize = '16px';
        corner.style.boxShadow = '2px 2px 0px rgba(0,0,0,0.3)';
        corner.textContent = '🍔';
        categoryDiv.appendChild(corner);
        
        // Título de categoría
        const categoryTitle = category.querySelector('h3').textContent;
        const categoryIcon = categoryIcons[categoryTitle] || '🍽️';
        
        const titleElement = document.createElement('h2');
        titleElement.innerHTML = `${categoryIcon} ${categoryTitle} ${categoryIcon}`;
        titleElement.style.color = '#D2691E';
        titleElement.style.fontSize = '20px';
        titleElement.style.marginTop = '0';
        titleElement.style.marginBottom = '10px';
        titleElement.style.paddingBottom = '8px';
        titleElement.style.background = '#FFE8CC';
        titleElement.style.borderBottom = '3px dashed #D2691E';
        titleElement.style.textShadow = '2px 2px 0px rgba(0,0,0,0.1)';
        titleElement.style.fontWeight = '900';
        titleElement.style.letterSpacing = '2px';
        titleElement.style.textAlign = 'center';
        titleElement.style.borderRadius = '8px';
        titleElement.style.padding = '8px';
        titleElement.style.fontFamily = "'Impact', 'Arial Black', sans-serif";
        categoryDiv.appendChild(titleElement);
        
        // Items de la categoría
        const itemsContainer = document.createElement('div');
        const items = category.querySelectorAll('.menu-item');
        
        items.forEach((item, itemIndex) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'menu-item-pdf';
            itemDiv.style.display = 'flex';
            itemDiv.style.justifyContent = 'space-between';
            itemDiv.style.alignItems = 'center';
            itemDiv.style.marginBottom = '8px';
            itemDiv.style.padding = '10px';
            itemDiv.style.background = '#ffffff';
            itemDiv.style.borderRadius = '8px';
            itemDiv.style.border = '2px dashed';
            itemDiv.style.borderColor = itemIndex % 2 === 0 ? '#FF6B35' : '#FFC107';
            itemDiv.style.position = 'relative';
            itemDiv.style.overflow = 'hidden';
            itemDiv.style.boxShadow = '3px 3px 0px rgba(210, 105, 30, 0.2)';
            itemDiv.style.pageBreakInside = 'avoid';
            itemDiv.style.breakInside = 'avoid';
            
            // Brillo decorativo (simplificado)
            const shine = document.createElement('div');
            shine.style.position = 'absolute';
            shine.style.top = '0';
            shine.style.left = '-100%';
            shine.style.width = '50%';
            shine.style.height = '100%';
            shine.style.background = 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)';
            itemDiv.appendChild(shine);
            
            const itemInfo = document.createElement('div');
            itemInfo.style.flex = '1';
            itemInfo.style.paddingRight = '10px';
            itemInfo.style.position = 'relative';
            itemInfo.style.zIndex = '1';
            
            const itemName = item.querySelector('h4').textContent;
            const itemDesc = item.querySelector('p').textContent;
            const itemPrice = item.querySelector('.price').textContent;
            
            const nameElement = document.createElement('div');
            nameElement.innerHTML = `<span style="font-size: 14px; margin-right: 5px;">🍴</span>${itemName}`;
            nameElement.style.fontWeight = '900';
            nameElement.style.color = '#1a1a1a';
            nameElement.style.fontSize = '14px';
            nameElement.style.marginBottom = '4px';
            nameElement.style.textShadow = '1px 1px 0px rgba(255, 107, 53, 0.2)';
            nameElement.style.fontFamily = "'Arial Black', sans-serif";
            itemInfo.appendChild(nameElement);
            
            const descElement = document.createElement('div');
            descElement.textContent = itemDesc;
            descElement.style.color = '#555';
            descElement.style.fontSize = '10px';
            descElement.style.lineHeight = '1.3';
            descElement.style.fontStyle = 'italic';
            descElement.style.padding = '2px 0 2px 19px';
            itemInfo.appendChild(descElement);
            
            const priceElement = document.createElement('div');
            priceElement.textContent = itemPrice;
            priceElement.style.fontWeight = '900';
            priceElement.style.color = '#ffffff';
            priceElement.style.fontSize = '16px';
            priceElement.style.background = 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFC107 100%)';
            priceElement.style.padding = '8px 14px';
            priceElement.style.borderRadius = '8px';
            priceElement.style.border = '2px solid #1a1a1a';
            priceElement.style.whiteSpace = 'nowrap';
            priceElement.style.textShadow = '1px 1px 0px rgba(0,0,0,0.3)';
            priceElement.style.boxShadow = '2px 2px 0px rgba(0,0,0,0.2)';
            priceElement.style.minWidth = '80px';
            priceElement.style.textAlign = 'center';
            priceElement.style.position = 'relative';
            priceElement.style.zIndex = '1';
            priceElement.style.fontFamily = "'Impact', 'Arial Black', sans-serif";
            
            itemDiv.appendChild(itemInfo);
            itemDiv.appendChild(priceElement);
            itemsContainer.appendChild(itemDiv);
        });
        
        categoryDiv.appendChild(itemsContainer);
        pdfContainer.appendChild(categoryDiv);
    });
    
    // Footer con diseño retro
    const footer = document.createElement('div');
    footer.style.marginTop = '12px';
    footer.style.background = 'linear-gradient(135deg, #FFFAF0 0%, #FFF8E7 100%)';
    footer.style.textAlign = 'center';
    footer.style.padding = '10px';
    footer.style.borderRadius = '12px';
    footer.style.border = '3px dashed #D2691E';
    footer.style.boxShadow = '4px 4px 0px rgba(210, 105, 30, 0.3)';
    footer.style.pageBreakInside = 'avoid';
    footer.style.breakInside = 'avoid';
    
    // Título de horario
    const scheduleTitle = document.createElement('h3');
    scheduleTitle.textContent = '⏰ HORARIO DE ATENCIÓN';
    scheduleTitle.style.color = '#D2691E';
    scheduleTitle.style.marginTop = '0';
    scheduleTitle.style.marginBottom = '8px';
    scheduleTitle.style.fontSize = '16px';
    scheduleTitle.style.textShadow = '2px 2px 0px rgba(0,0,0,0.1)';
    scheduleTitle.style.fontWeight = '900';
    scheduleTitle.style.fontFamily = "'Impact', 'Arial Black', sans-serif";
    footer.appendChild(scheduleTitle);
    
    // Contenedor de horarios retro
    const scheduleContainer = document.createElement('div');
    scheduleContainer.style.background = '#FFE8CC';
    scheduleContainer.style.padding = '8px';
    scheduleContainer.style.borderRadius = '10px';
    scheduleContainer.style.border = '2px dashed #FF6B35';
    scheduleContainer.style.marginBottom = '8px';
    scheduleContainer.innerHTML = `
        <p style="margin: 4px 0; color: #1a1a1a; font-size: 11px; font-weight: 900;">
            📅 Martes a Jueves: 10:00 AM - 10:00 PM
        </p>
        <p style="margin: 4px 0; color: #1a1a1a; font-size: 11px; font-weight: 900;">
            🎉 Viernes y Sábado: 5:00 PM - 2:00 AM
        </p>
        <p style="margin: 4px 0; color: #1a1a1a; font-size: 11px; font-weight: 900;">
            ☀️ Domingo: 5:00 PM - 10:00 PM
        </p>
        <p style="margin: 6px 0 4px 0; color: #FF6B35; font-size: 12px; font-weight: 900; text-shadow: 1px 1px 0px rgba(0,0,0,0.1);">
            🚫 Lunes: CERRADO
        </p>
    `;
    footer.appendChild(scheduleContainer);
    
    // Separador retro
    const separator = document.createElement('div');
    separator.style.height = '2px';
    separator.style.background = 'repeating-linear-gradient(90deg, #D2691E, #D2691E 10px, transparent 10px, transparent 20px)';
    separator.style.margin = '8px 0';
    separator.style.border = '1px dashed #D2691E';
    separator.style.borderLeft = 'none';
    separator.style.borderRight = 'none';
    footer.appendChild(separator);
    
    // Redes sociales retro
    const socialMedia = document.createElement('div');
    socialMedia.style.background = '#FFFAF0';
    socialMedia.style.padding = '8px';
    socialMedia.style.borderRadius = '10px';
    socialMedia.style.marginBottom = '8px';
    socialMedia.style.border = '2px dashed #FFC107';
    socialMedia.innerHTML = `
        <p style="margin: 0 0 6px 0; color: #D2691E; font-size: 13px; font-weight: 900; text-shadow: 1px 1px 0px rgba(0,0,0,0.1); font-family: 'Impact', 'Arial Black', sans-serif;">
            📱 SÍGUENOS EN REDES SOCIALES
        </p>
        <p style="margin: 3px 0; color: #E4405F; font-size: 10px; font-weight: 900;">
            📷 Instagram: @riko.clacruz
        </p>
        <p style="margin: 3px 0; color: #4267B2; font-size: 10px; font-weight: 900;">
            👍 Facebook: riko.riko.cerro.cruz
        </p>
        <p style="margin: 3px 0; color: #25D366; font-size: 10px; font-weight: 900;">
            💬 WhatsApp: +56 9 4687 6119
        </p>
    `;
    footer.appendChild(socialMedia);
    
    // Copyright
    const copyright = document.createElement('p');
    copyright.style.margin = '6px 0 0 0';
    copyright.style.color = '#888';
    copyright.style.fontSize = '9px';
    copyright.style.fontWeight = '700';
    copyright.textContent = '© 2025 Riko Riko - Todos los derechos reservados';
    footer.appendChild(copyright);
    
    pdfContainer.appendChild(footer);
    
    // Configuración del PDF simplificada
    const opt = {
        margin: 10,
        filename: 'Menu_RikoRiko.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#FFF8E7'
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait'
        },
        pagebreak: { 
            mode: ['avoid-all', 'css'],
            before: '.menu-category-pdf'
        }
    };

    // Crear el PDF
    html2pdf().set(opt).from(pdfContainer).save().then(() => {
        button.innerHTML = '✅ ¡Descargado!';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }).catch(error => {
        console.error('Error al generar PDF:', error);
        button.innerHTML = '❌ Error al descargar';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    });
}

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
