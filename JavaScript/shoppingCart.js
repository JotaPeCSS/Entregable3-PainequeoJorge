// Actualizar carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});

// Función para actualizar el carrito en la interfaz
function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const cartEmptyMessage = document.getElementById('cart-empty-message');

    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartEmptyMessage.style.display = 'block';
        cartSummary.innerHTML = '';
    } else {
        cartEmptyMessage.style.display = 'none';

        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)} x ${item.quantity} 
                (Color: <span style="background-color: ${item.selectedColor}; display: inline-block; width: 20px; height: 20px; border-radius: 50%;"></span>)
                Tamaño: ${item.size}
                <button onclick="removeFromCart(${item.id})">Eliminar</button>
            `;
            cartItems.appendChild(cartItem);
        });

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartSummary.innerHTML = `Total: $${total.toFixed(2)}`;
    }
}

// Eliminar producto del carrito
function removeFromCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== productId);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCart();
}

// Vaciar carrito
function emptyCart() {
    localStorage.removeItem('cart');
    updateCart();
}

// Finalizar compra
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        Swal.fire('¡Carrito vacío!', 'No hay productos para comprar.', 'info');
        return;
    }

    // Simular el proceso de compra
    localStorage.removeItem('cart');
    updateCart();
    Swal.fire('¡Compra realizada!', 'Gracias por tu compra.', 'success');
}
