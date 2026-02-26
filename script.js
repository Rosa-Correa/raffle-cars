    /* ==========================================================================
   CONFIGURACIÓN Y VARIABLES
   ========================================================================== */
document.getElementById("year").textContent = new Date().getFullYear();

// CARGA INICIAL: Intentamos recuperar el carrito guardado
let carrito = JSON.parse(localStorage.getItem('carritoSorteo')) || [];
// Recalculamos el total basado en lo que se recuperó
let total = carrito.reduce((sum, item) => sum + item.precio, 0);

const WHATSAPP_NUMBER = "573000000000"; // <-- ASEGÚRATE DE QUE ESTE SEA TU NÚMERO

const carritoContainer = document.getElementById("carrito-items");
const totalSpan = document.getElementById("total");
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

/* ==========================================================================
   LÓGICA DEL CARRITO
   ========================================================================== */

function addToCart(nombre, precio) {
    const yaExiste = carrito.find(item => item.nombre === nombre);

    if (yaExiste) {
        alert("Este combo ya está en tu carrito. ¡Elige uno diferente!");
        return;
    }

    carrito.push({ nombre, precio });
    total += precio;
    
    // GUARDAR en memoria del navegador
    actualizarMemoria();
    renderizarCarrito();
}

function renderizarCarrito() {
    if (!carritoContainer) return;

    carritoContainer.innerHTML = "";

    carrito.forEach((item) => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom:5px; font-size:14px;">
                <span><strong>${item.nombre}</strong></span>
                <span>$${item.precio.toLocaleString()}</span>
            </div>
        `;
        carritoContainer.appendChild(div);
    });

    totalSpan.textContent = total.toLocaleString();
}

function actualizarMemoria() {
    localStorage.setItem('carritoSorteo', JSON.stringify(carrito));
}

function vaciarCarrito() {
    carrito = [];
    total = 0;
    localStorage.removeItem('carritoSorteo');
    renderizarCarrito();
}

/* ==========================================================================
   FUNCIÓN DE PAGO (WHATSAPP)
   ========================================================================== */

function enviarWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. ¡Elige un combo primero!");
        return;
    }

    let mensaje = "¡Hola! 👋 Quiero comprar estos combos para el sorteo:%0A%0A";
    
    carrito.forEach((item, index) => {
        mensaje += `${index + 1}. *${item.nombre}* - $${item.precio.toLocaleString()}%0A`;
    });

    mensaje += `%0A*Total a pagar: $${total.toLocaleString()}*`;
    mensaje += "%0A%0A¿Cuáles son los pasos para el pago?";

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;
    
    // Abrir en pestaña nueva
    window.open(url, '_blank');
}

/* ==========================================================================
   MENÚ MÓVIL
   ========================================================================== */

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('is-open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('is-open');
        });
    });
}

// INICIALIZACIÓN: Dibujar el carrito apenas cargue la página
renderizarCarrito();
