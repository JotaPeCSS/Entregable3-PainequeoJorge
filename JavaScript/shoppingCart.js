// Función para actualizar el carrito en la interfaz
function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const cartEmptyMessage = document.getElementById('cart-empty-message');

    cartItemsList.innerHTML = '';
    if (cartItems.length === 0) {
        cartEmptyMessage.style.display = 'block';
        cartSummary.innerHTML = '';
        return;
    }

    cartEmptyMessage.style.display = 'none';
    let total = 0;

    cartItems.forEach(item => {
        const productElement = document.createElement('li');
        productElement.textContent = `Producto ${item.id} ${item.color ? `(Color: ${item.color})` : ''} ${item.size ? `(Tamaño: ${item.size})` : ''} x${item.quantity}`;
        cartItemsList.appendChild(productElement);

        total += item.quantity * 25.00; // Assuming each product costs $25.00 (adjust this as needed)
    });

    cartSummary.innerHTML = `Total: $${total.toFixed(2)}`;
}

// Función para vaciar el carrito
function emptyCart() {
    localStorage.removeItem('cart');
    updateCart();
}

// Función para proceder a la compra
function checkout() {
    localStorage.removeItem('cart');
    Swal.fire('¡Gracias por tu compra!', 'Tu carrito ha sido vaciado.', 'success');
    updateCart();
}

// Eventos
document.getElementById('empty-cart-btn').addEventListener('click', emptyCart);
document.getElementById('checkout-btn').addEventListener('click', checkout);

// Inicializar el carrito al cargar la página
updateCart();
