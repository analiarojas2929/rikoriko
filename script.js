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
    pdfContainer.style.padding = '15px';
    pdfContainer.style.background = '#1a1a1a';
    pdfContainer.style.fontFamily = 'Arial, sans-serif';
    pdfContainer.style.color = '#ffffff';
    pdfContainer.style.width = '100%';
    pdfContainer.style.boxSizing = 'border-box';
    
    // Header del PDF con logo mejorado
    const header = document.createElement('div');
    header.style.textAlign = 'center';
    header.style.marginBottom = '20px';
    header.style.paddingBottom = '15px';
    header.style.background = 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%)';
    header.style.borderRadius = '15px';
    header.style.border = '3px solid #FF6B35';
    header.style.padding = '20px';
    header.style.boxShadow = '0 6px 20px rgba(255, 107, 53, 0.4)';
    
    // Decoración superior
    const topDecor = document.createElement('div');
    topDecor.innerHTML = '⭐ 🍔 ⭐ 🍟 ⭐';
    topDecor.style.fontSize = '18px';
    topDecor.style.marginBottom = '12px';
    topDecor.style.letterSpacing = '8px';
    header.appendChild(topDecor);
    
    // Logo en texto mejorado
    const logo = document.createElement('div');
    logo.style.marginBottom = '12px';
    logo.innerHTML = `
        <div style="margin-bottom: 8px;">
            <span style="font-size: 44px; font-weight: 900; font-family: 'Impact', 'Arial Black', sans-serif; color: #FF6B35; text-shadow: 3px 3px 0px #000, -1px -1px 0px #000, 0 0 15px rgba(255, 107, 53, 0.6); letter-spacing: 2px;">Riko</span>
            <span style="font-size: 44px; font-weight: 900; font-family: 'Impact', 'Arial Black', sans-serif; color: #FFC107; text-shadow: 3px 3px 0px #000, -1px -1px 0px #000, 0 0 15px rgba(255, 193, 7, 0.6); letter-spacing: 2px;">Riko</span>
        </div>
        <div style="font-size: 18px; margin: 8px 0;">🍟</div>
        <div style="background: linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFC107 100%); color: white; font-size: 12px; font-weight: bold; padding: 6px 20px; border-radius: 12px; border: 2px solid #000; display: inline-block; box-shadow: 2px 2px 0px #000; letter-spacing: 2px;">FAST FOOD CART</div>
    `;
    header.appendChild(logo);
    
    const subtitle = document.createElement('h1');
    subtitle.textContent = '🍔 NUESTRA CARTA 🍟';
    subtitle.style.color = '#FFC107';
    subtitle.style.fontSize = '26px';
    subtitle.style.marginTop = '15px';
    subtitle.style.marginBottom = '12px';
    subtitle.style.textShadow = '2px 2px 4px rgba(0,0,0,0.9)';
    subtitle.style.fontWeight = '900';
    subtitle.style.letterSpacing = '1px';
    header.appendChild(subtitle);
    
    // Línea divisora decorativa
    const divider = document.createElement('div');
    divider.style.height = '3px';
    divider.style.background = 'linear-gradient(90deg, transparent, #FF6B35, #FFC107, #FF6B35, transparent)';
    divider.style.margin = '12px 0';
    divider.style.borderRadius = '2px';
    header.appendChild(divider);
    
    const contact = document.createElement('div');
    contact.style.background = 'rgba(255, 107, 53, 0.1)';
    contact.style.padding = '12px';
    contact.style.borderRadius = '10px';
    contact.style.marginTop = '12px';
    contact.style.border = '2px solid rgba(255, 193, 7, 0.3)';
    contact.innerHTML = `
        <p style="margin: 6px 0; color: #ffffff; font-size: 12px; font-weight: bold;">📱 <span style="color: #FFC107;">WhatsApp:</span> +56 9 4687 6119</p>
        <p style="margin: 6px 0; color: #ffffff; font-size: 12px; font-weight: bold;">📍 <span style="color: #FFC107;">Dirección:</span> El vergel alto 1936, Valparaíso</p>
    `;
    header.appendChild(contact);
    
    // Decoración inferior
    const bottomDecor = document.createElement('div');
    bottomDecor.innerHTML = '⭐ 🍕 ⭐ � ⭐';
    bottomDecor.style.fontSize = '18px';
    bottomDecor.style.marginTop = '12px';
    bottomDecor.style.letterSpacing = '8px';
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
        categoryDiv.style.marginBottom = '20px';
        categoryDiv.style.pageBreakInside = 'avoid';
        categoryDiv.style.pageBreakBefore = index > 0 ? 'always' : 'auto';
        categoryDiv.style.pageBreakAfter = 'auto';
        categoryDiv.style.breakInside = 'avoid';
        categoryDiv.style.background = 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%)';
        categoryDiv.style.padding = '16px';
        categoryDiv.style.borderRadius = '12px';
        categoryDiv.style.border = '3px solid #FF6B35';
        categoryDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';
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
        corner.style.width = '32px';
        corner.style.height = '32px';
        corner.style.background = 'linear-gradient(135deg, #FF6B35, #FFC107)';
        corner.style.borderRadius = '50%';
        corner.style.border = '2px solid #000';
        corner.style.display = 'flex';
        corner.style.alignItems = 'center';
        corner.style.justifyContent = 'center';
        corner.style.fontSize = '16px';
        corner.style.boxShadow = '0 3px 8px rgba(0,0,0,0.4)';
        corner.textContent = '⭐';
        categoryDiv.appendChild(corner);
        
        // Título de categoría
        const categoryTitle = category.querySelector('h3').textContent;
        const categoryIcon = categoryIcons[categoryTitle] || '🍽️';
        
        const titleElement = document.createElement('h2');
        titleElement.innerHTML = `${categoryIcon} ${categoryTitle} ${categoryIcon}`;
        titleElement.style.color = '#FFC107';
        titleElement.style.fontSize = '22px';
        titleElement.style.marginTop = '0';
        titleElement.style.marginBottom = '14px';
        titleElement.style.paddingBottom = '10px';
        titleElement.style.background = 'linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.2), transparent)';
        titleElement.style.borderBottom = '2px solid #FF6B35';
        titleElement.style.textShadow = '2px 2px 4px rgba(0,0,0,0.9)';
        titleElement.style.fontWeight = '900';
        titleElement.style.letterSpacing = '1px';
        titleElement.style.textAlign = 'center';
        titleElement.style.borderRadius = '6px';
        titleElement.style.padding = '8px';
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
            itemDiv.style.marginBottom = '12px';
            itemDiv.style.padding = '14px';
            itemDiv.style.background = 'linear-gradient(135deg, #252525 0%, #1a1a1a 100%)';
            itemDiv.style.borderRadius = '10px';
            itemDiv.style.border = '2px solid';
            itemDiv.style.borderColor = itemIndex % 2 === 0 ? '#FF6B35' : '#FFC107';
            itemDiv.style.position = 'relative';
            itemDiv.style.overflow = 'hidden';
            itemDiv.style.boxShadow = '0 3px 10px rgba(0,0,0,0.4)';
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
            itemInfo.style.paddingRight = '15px';
            itemInfo.style.position = 'relative';
            itemInfo.style.zIndex = '1';
            
            const itemName = item.querySelector('h4').textContent;
            const itemDesc = item.querySelector('p').textContent;
            const itemPrice = item.querySelector('.price').textContent;
            
            const nameElement = document.createElement('div');
            nameElement.innerHTML = `<span style="font-size: 14px; margin-right: 6px;">🔸</span>${itemName}`;
            nameElement.style.fontWeight = 'bold';
            nameElement.style.color = '#ffffff';
            nameElement.style.fontSize = '16px';
            nameElement.style.marginBottom = '6px';
            nameElement.style.textShadow = '1px 1px 3px rgba(0,0,0,0.8)';
            itemInfo.appendChild(nameElement);
            
            const descElement = document.createElement('div');
            descElement.textContent = itemDesc;
            descElement.style.color = '#cccccc';
            descElement.style.fontSize = '13px';
            descElement.style.lineHeight = '1.4';
            descElement.style.fontStyle = 'italic';
            descElement.style.padding = '4px 0 4px 20px';
            itemInfo.appendChild(descElement);
            
            const priceElement = document.createElement('div');
            priceElement.textContent = itemPrice;
            priceElement.style.fontWeight = '900';
            priceElement.style.color = '#ffffff';
            priceElement.style.fontSize = '18px';
            priceElement.style.background = 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFC107 100%)';
            priceElement.style.padding = '10px 18px';
            priceElement.style.borderRadius = '10px';
            priceElement.style.border = '3px solid #000';
            priceElement.style.whiteSpace = 'nowrap';
            priceElement.style.textShadow = '1px 1px 3px rgba(0,0,0,0.9)';
            priceElement.style.boxShadow = '0 3px 10px rgba(0,0,0,0.4)';
            priceElement.style.minWidth = '90px';
            priceElement.style.textAlign = 'center';
            priceElement.style.position = 'relative';
            priceElement.style.zIndex = '1';
            
            itemDiv.appendChild(itemInfo);
            itemDiv.appendChild(priceElement);
            itemsContainer.appendChild(itemDiv);
        });
        
        categoryDiv.appendChild(itemsContainer);
        pdfContainer.appendChild(categoryDiv);
    });
    
    // Footer mejorado (compacto para que quepa completo)
    const footer = document.createElement('div');
    footer.style.marginTop = '20px';
    footer.style.paddingTop = '15px';
    footer.style.background = 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%)';
    footer.style.textAlign = 'center';
    footer.style.padding = '15px';
    footer.style.borderRadius = '12px';
    footer.style.border = '3px solid #FF6B35';
    footer.style.boxShadow = '0 5px 15px rgba(255, 107, 53, 0.4)';
    footer.style.pageBreakInside = 'avoid';
    footer.style.breakInside = 'avoid';
    
    // Decoración de horario
    const scheduleDecor = document.createElement('div');
    scheduleDecor.innerHTML = '⏰ ⏰ ⏰';
    scheduleDecor.style.fontSize = '16px';
    scheduleDecor.style.marginBottom = '10px';
    scheduleDecor.style.letterSpacing = '12px';
    footer.appendChild(scheduleDecor);
    
    const scheduleTitle = document.createElement('h3');
    scheduleTitle.textContent = 'HORARIO DE ATENCIÓN';
    scheduleTitle.style.color = '#FFC107';
    scheduleTitle.style.marginTop = '0';
    scheduleTitle.style.marginBottom = '12px';
    scheduleTitle.style.fontSize = '20px';
    scheduleTitle.style.textShadow = '2px 2px 4px rgba(0,0,0,0.9)';
    scheduleTitle.style.fontWeight = '900';
    scheduleTitle.style.letterSpacing = '1px';
    footer.appendChild(scheduleTitle);
    
    // Contenedor de horarios con diseño mejorado
    const scheduleContainer = document.createElement('div');
    scheduleContainer.style.background = 'rgba(255, 107, 53, 0.1)';
    scheduleContainer.style.padding = '12px';
    scheduleContainer.style.borderRadius = '10px';
    scheduleContainer.style.border = '2px solid rgba(255, 193, 7, 0.3)';
    scheduleContainer.style.marginBottom = '12px';
    scheduleContainer.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; margin: 6px 0; padding: 6px; background: rgba(0,0,0,0.2); border-radius: 5px;">
            <span style="color: #FFC107; font-weight: bold; font-size: 13px; min-width: 150px; text-align: right; margin-right: 10px;">📅 Martes a Jueves:</span>
            <span style="color: #ffffff; font-size: 13px; font-weight: bold;">10:00 AM - 10:00 PM</span>
        </div>
        <div style="display: flex; align-items: center; justify-content: center; margin: 6px 0; padding: 6px; background: rgba(0,0,0,0.2); border-radius: 5px;">
            <span style="color: #FFC107; font-weight: bold; font-size: 13px; min-width: 150px; text-align: right; margin-right: 10px;">🎉 Viernes y Sábado:</span>
            <span style="color: #ffffff; font-size: 13px; font-weight: bold;">5:00 PM - 2:00 AM</span>
        </div>
        <div style="display: flex; align-items: center; justify-content: center; margin: 6px 0; padding: 6px; background: rgba(0,0,0,0.2); border-radius: 5px;">
            <span style="color: #FFC107; font-weight: bold; font-size: 13px; min-width: 150px; text-align: right; margin-right: 10px;">☀️ Domingo:</span>
            <span style="color: #ffffff; font-size: 13px; font-weight: bold;">5:00 PM - 10:00 PM</span>
        </div>
    `;
    footer.appendChild(scheduleContainer);
    
    // Día cerrado con énfasis
    const closedDay = document.createElement('div');
    closedDay.style.background = 'linear-gradient(135deg, #FF6B35, #F7931E)';
    closedDay.style.padding = '10px 20px';
    closedDay.style.borderRadius = '8px';
    closedDay.style.border = '3px solid #000';
    closedDay.style.margin = '12px auto';
    closedDay.style.maxWidth = '250px';
    closedDay.style.boxShadow = '0 3px 10px rgba(0,0,0,0.5)';
    closedDay.innerHTML = '<p style="margin: 0; color: #ffffff; font-size: 15px; font-weight: 900; text-shadow: 2px 2px 4px rgba(0,0,0,0.9);">🚫 Lunes: CERRADO</p>';
    footer.appendChild(closedDay);
    
    // Separador decorativo
    const separator = document.createElement('div');
    separator.style.height = '2px';
    separator.style.background = 'linear-gradient(90deg, transparent, #FF6B35, #FFC107, #FF6B35, transparent)';
    separator.style.margin = '12px 0';
    separator.style.borderRadius = '2px';
    footer.appendChild(separator);
    
    // Mensaje de agradecimiento
    const thankYou = document.createElement('div');
    thankYou.style.background = 'rgba(255, 193, 7, 0.1)';
    thankYou.style.padding = '12px';
    thankYou.style.borderRadius = '8px';
    thankYou.style.marginBottom = '12px';
    thankYou.innerHTML = `
        <p style="margin: 0; color: #FFC107; font-size: 14px; font-weight: bold; text-shadow: 1px 1px 3px rgba(0,0,0,0.8); font-style: italic;">
            "¡Gracias por preferirnos!" 🙏
        </p>
        <p style="margin: 6px 0 0 0; color: #ffffff; font-size: 11px;">
            Síguenos en redes sociales
        </p>
    `;
    footer.appendChild(thankYou);
    
    // Copyright y pie de página
    const copyright = document.createElement('p');
    copyright.style.marginTop = '12px';
    copyright.style.color = '#999';
    copyright.style.fontSize = '11px';
    copyright.style.borderTop = '1px solid #444';
    copyright.style.paddingTop = '10px';
    copyright.style.fontWeight = 'bold';
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
            backgroundColor: '#1a1a1a'
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
