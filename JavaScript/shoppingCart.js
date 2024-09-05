// shoppingCart.js

// Cargar los elementos del carrito desde localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Limpiar contenido previo

    let total = 0;

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';

        // Mostrar información del producto
        const productDiv = document.createElement('div');
        productDiv.textContent = `Producto: ${item.id}, Color: ${item.color}, Tamaño: ${item.size}, Cantidad: ${item.quantity}`;
        cartItemDiv.appendChild(productDiv);

        // Botón de ajuste de cantidad
        const decrementButton = document.createElement('button');
        decrementButton.className = 'adjust-quantity';
        decrementButton.id = `decrement-${item.id}`;
        decrementButton.textContent = '-';
        decrementButton.addEventListener('click', () => adjustQuantity(item.id, item.color, item.size, -1));
        cartItemDiv.appendChild(decrementButton);

        const quantitySpan = document.createElement('span');
        quantitySpan.id = `quantity-${item.id}`;
        quantitySpan.textContent = item.quantity;
        cartItemDiv.appendChild(quantitySpan);

        const incrementButton = document.createElement('button');
        incrementButton.className = 'adjust-quantity';
        incrementButton.id = `increment-${item.id}`;
        incrementButton.textContent = '+';
        incrementButton.addEventListener('click', () => adjustQuantity(item.id, item.color, item.size, 1));
        cartItemDiv.appendChild(incrementButton);

        // Botón para eliminar del carrito
        const removeButton = document.createElement('button');
        removeButton.className = 'remove-from-cart';
        removeButton.textContent = 'Eliminar';
        removeButton.addEventListener('click', () => removeFromCart(item.id, item.color, item.size));
        cartItemDiv.appendChild(removeButton);

        cartItems.appendChild(cartItemDiv);

        // Calcular el total
        total += item.quantity * getProductPrice(item.id);
    });

    document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
}

// Ajustar la cantidad de un producto en el carrito
function adjustQuantity(productId, color, size, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId && item.color === color && item.size === size);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId, color, size);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        }
    }
}

// Eliminar un producto del carrito
function removeFromCart(productId, color, size) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => !(item.id === productId && item.color === color && item.size === size));
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Obtener el precio del producto desde el JSON
function getProductPrice(productId) {
    return 10.00; // Placeholder, deberías recuperar el precio real del JSON o de otra fuente.
}

// Vaciar el carrito
document.getElementById('clear-cart').addEventListener('click', () => {
    localStorage.removeItem('cart');
    loadCart();
});

// Pagar el carrito
document.getElementById('checkout').addEventListener('click', () => {
    Swal.fire('Gracias por su compra', '', 'success');
    localStorage.removeItem('cart');
    loadCart();
});

// Inicializar el carrito
document.addEventListener('DOMContentLoaded', loadCart);
