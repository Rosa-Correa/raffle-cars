    
    
     /* ==========================================================================
   CONFIGURACIÓN Y VARIABLES
   ========================================================================== */
document.getElementById("year").textContent = new Date().getFullYear();

let carrito = []; 
let total = 0;
const WHATSAPP_NUMBER = "573000000000"; // <-- Cambia por tu número real

const carritoContainer = document.getElementById("carrito-items");
const totalSpan = document.getElementById("total");
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

/* ==========================================================================
   LÓGICA DEL CARRITO
   ========================================================================== */

function addToCart(nombre, precio) {
    // 1. Verificar si el combo ya está en el carrito
    const yaExiste = carrito.find(item => item.nombre === nombre);

    if (yaExiste) {
        alert("Este combo ya está en tu carrito. ¡Elige uno diferente!");
        return; // Salimos de la función para que no se agregue
    }

    // 2. Si no existe, procedemos a agregarlo
    console.log("Agregando combo único:", nombre, precio);
    
    carrito.push({ nombre, precio });
    total += precio;
    
    renderizarCarrito();
}

function renderizarCarrito() {
    if (!carritoContainer) return;

    // Limpiamos el contenedor
    carritoContainer.innerHTML = "";

    // Dibujamos cada item
    carrito.forEach((item) => {
        const div = document.createElement("div");
        div.className = "cart-item"; // Usamos la clase que definimos en CSS
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom:5px; font-size:14px;">
                <span><strong>${item.nombre}</strong></span>
                <span>$${item.precio.toLocaleString()}</span>
            </div>
        `;
        carritoContainer.appendChild(div);
    });

    // Actualizamos el total en el HTML
    totalSpan.textContent = total.toLocaleString();
}

function vaciarCarrito() {
    carrito = [];
    total = 0;
    renderizarCarrito();
}
/* ==========================================================================
   MENÚ MÓVIL (Versión Corregida)
   ========================================================================== */

if (menuToggle && navLinks) {
    // 1. Un solo evento para abrir/cerrar
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('is-open'); // Activa la animación de la X
    });

    // 2. Cerrar el menú automáticamente al tocar un link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('is-open'); // Vuelve a ser hamburguesa
        });
    });
}