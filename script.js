// ========== NAVEGACIÓN Y MENÚ ==========

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            const navLinks = document.getElementById('navLinks');
            const hamburger = document.getElementById('hamburger');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

function scrollToMenu() {
    const menuSection = document.getElementById('menu');
    window.scrollTo({ top: menuSection.offsetTop - 80, behavior: 'smooth' });
}

// ========== CARRUSEL DE GALERÍA ==========
let currentSlide = 0;
const totalSlides = 7;

document.addEventListener('DOMContentLoaded', function () {
    initCarousel();
    setInterval(() => moveCarousel(1), 5000);
});

function initCarousel() {
    const dotsContainer = document.getElementById('carouselDots');
    if (!dotsContainer) return;
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
    if (currentSlide >= totalSlides) currentSlide = 0;
    else if (currentSlide < 0) currentSlide = totalSlides - 1;
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
    track.style.transform = `translateX(${-currentSlide * 100}%)`;
    dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSlide));
}

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel-wrapper');
    if (!carousel) return;
    carousel.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
    carousel.addEventListener('touchend', (e) => { touchEndX = e.changedTouches[0].screenX; handleSwipe(); });
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) moveCarousel(1);
    if (touchEndX > touchStartX + 50) moveCarousel(-1);
}

// ========== GENERACIÓN DE PDF ==========

function downloadMenu() {
    const link = document.createElement('a');
    link.href = 'Menu_RikoRiko.pdf';
    link.download = 'Menu_RikoRiko.pdf';
    link.click();
}

// ========== ANIMACIONES DE SCROLL ==========

window.addEventListener('scroll', () => {
    document.querySelectorAll('.menu-category').forEach(category => {
        if (category.getBoundingClientRect().top < window.innerHeight - 100) {
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.menu-category').forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

let lastScroll = 0;
const navbar = document.querySelector('header');

window.addEventListener('scroll', () => {
    lastScroll = window.pageYOffset;
});

// =============================================
//  SISTEMA DE CARRITO - RIKO RIKO
// =============================================

const cart = {};

function parsePrice(str) {
    return parseInt(str.replace(/\$|\./g, '').replace(',', '').trim(), 10) || 0;
}

function formatPrice(n) {
    return '$' + n.toLocaleString('es-CL');
}

// Inyectar botones en cada menu-item al cargar
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.menu-item').forEach((item, idx) => {
        const nameEl  = item.querySelector('.item-info h4');
        const priceEl = item.querySelector('.price');
        if (!nameEl || !priceEl) return;

        const name  = nameEl.textContent.trim();
        const price = parsePrice(priceEl.textContent);
        const id    = 'item_' + idx;

        item.dataset.cartId    = id;
        item.dataset.cartName  = name;
        item.dataset.cartPrice = price;

        const wrapper = document.createElement('div');
        wrapper.className = 'item-add-btn';

        const addBtn = document.createElement('button');
        addBtn.className   = 'btn-agregar';
        addBtn.textContent = '+ Agregar';
        addBtn.onclick = () => addItem(id, name, price, item);

        const qtyCtrl = document.createElement('div');
        qtyCtrl.className    = 'item-qty-ctrl';
        qtyCtrl.style.display = 'none';
        qtyCtrl.innerHTML = `
            <button class="qty-btn" onclick="changeQtyMenu('${id}', -1, this)">&#8722;</button>
            <span class="qty-value" id="qty-val-${id}">1</span>
            <button class="qty-btn" onclick="changeQtyMenu('${id}', 1, this)">&#43;</button>
        `;

        wrapper.appendChild(addBtn);
        wrapper.appendChild(qtyCtrl);
        // Insertar entre el price y el final, junto al precio
        const priceElRef = item.querySelector('.price');
        if (priceElRef) {
            priceElRef.style.flexShrink = '0';
            item.insertBefore(wrapper, priceElRef.nextSibling);
        } else {
            item.appendChild(wrapper);
        }
    });
});

function addItem(id, name, price, itemEl) {
    cart[id] = { name, price, qty: 1 };
    itemEl.querySelector('.btn-agregar').style.display  = 'none';
    itemEl.querySelector('.item-qty-ctrl').style.display = 'flex';
    renderCart();
    const total = Object.values(cart).reduce((s, i) => s + i.qty, 0);
    if (total === 1) openCart();
}

function changeQtyMenu(id, delta, btn) {
    if (!cart[id]) return;
    cart[id].qty += delta;
    const item = document.querySelector('[data-cart-id="' + id + '"]');
    if (cart[id].qty <= 0) {
        delete cart[id];
        if (item) {
            item.querySelector('.btn-agregar').style.display = '';
            item.querySelector('.item-qty-ctrl').style.display = 'none';
        }
    } else {
        const valEl = document.getElementById('qty-val-' + id);
        if (valEl) valEl.textContent = cart[id].qty;
    }
    renderCart();
}

function clearCart() {
    Object.keys(cart).forEach(id => {
        const item = document.querySelector('[data-cart-id="' + id + '"]');
        if (item) {
            item.querySelector('.btn-agregar').style.display = '';
            item.querySelector('.item-qty-ctrl').style.display = 'none';
        }
    });
    Object.keys(cart).forEach(k => delete cart[k]);
    renderCart();
}

function renderCart() {
    const body    = document.getElementById('cartItems');
    const footer  = document.getElementById('cartFooter');
    const badge   = document.getElementById('cartCount');
    const totalEl = document.getElementById('cartTotal');

    const items      = Object.entries(cart);
    const totalUnits = items.reduce((s, [, v]) => s + v.qty, 0);
    const totalPrice = items.reduce((s, [, v]) => s + v.price * v.qty, 0);

    if (totalUnits > 0) {
        badge.textContent    = totalUnits;
        badge.style.display  = 'inline-block';
    } else {
        badge.style.display = 'none';
    }

    if (items.length === 0) {
        body.innerHTML = '<div class="cart-empty" id="cartEmpty"><span>&#127828;</span><p>Agrega productos desde el men&uacute;</p></div>';
        footer.classList.remove('visible');
        return;
    }

    body.innerHTML = items.map(([id, v]) =>
        '<div class="cart-item">' +
            '<span class="cart-item-name">' + v.name + '</span>' +
            '<div class="cart-item-qty">' +
                '<button class="cart-item-qty-btn" onclick="cartQty(\'' + id + '\', -1)">&#8722;</button>' +
                '<span class="cart-item-qty-num">' + v.qty + '</span>' +
                '<button class="cart-item-qty-btn" onclick="cartQty(\'' + id + '\', 1)">&#43;</button>' +
            '</div>' +
            '<span class="cart-item-subtotal">' + formatPrice(v.price * v.qty) + '</span>' +
            '<button class="cart-item-remove" onclick="cartQty(\'' + id + '\', -999)" title="Quitar">&#10005;</button>' +
        '</div>'
    ).join('');

    totalEl.textContent = formatPrice(totalPrice);
    footer.classList.add('visible');
    buildWhatsappLink(items, totalPrice);
}

function cartQty(id, delta) {
    if (!cart[id]) return;
    if (delta === -999 || cart[id].qty + delta <= 0) {
        const menuItem = document.querySelector('[data-cart-id="' + id + '"]');
        if (menuItem) {
            menuItem.querySelector('.btn-agregar').style.display = '';
            menuItem.querySelector('.item-qty-ctrl').style.display = 'none';
        }
        delete cart[id];
    } else {
        cart[id].qty += delta;
        const valEl = document.getElementById('qty-val-' + id);
        if (valEl) valEl.textContent = cart[id].qty;
    }
    renderCart();
}

let whatsappUrl = '';

function buildWhatsappLink(items, total) {
    const lines = items.map(([, v]) => '  - ' + v.qty + 'x ' + v.name + ' - ' + formatPrice(v.price * v.qty)).join('\n');
    const msg = encodeURIComponent(
        'Pedido El Riko Riko\n\n' + lines + '\n\nTotal: ' + formatPrice(total) + '\n\nPueden confirmar disponibilidad? Gracias!'
    );
    whatsappUrl = 'https://wa.me/56946876119?text=' + msg;
}

function sendToWhatsapp() {
    if (Object.keys(cart).length === 0) return;
    if (whatsappUrl) window.open(whatsappUrl, '_blank');
}

function toggleCart() {
    const drawer   = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartBackdrop');
    if (drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        backdrop.classList.remove('open');
        document.body.style.overflow = '';
    } else {
        openCart();
    }
}

function openCart() {
    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('cartBackdrop').classList.add('open');
    document.body.style.overflow = 'hidden';
}
