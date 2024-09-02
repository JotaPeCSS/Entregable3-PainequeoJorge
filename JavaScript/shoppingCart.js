// Obtener el carrito de compras del localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(cart);
    }
    return [];
}

// Actualizar la vista del carrito de compras
function updateCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    cartItems.innerHTML = '';
    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <li>${item.product} (${item.color}, ${item.size}) - $${item.price} x ${item.quantity}</li>
        `;
    });

    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', updateCart);
