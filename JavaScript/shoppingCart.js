// Obtener los productos almacenados en localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Guardar los productos en localStorage
function saveCartItems(cartItems) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Actualizar la visualización del carrito
function updateCart() {
    const cartItemsContainer = document.querySelector('#cart-items');
    const cartItems = getCartItems();
    cartItemsContainer.innerHTML = ''; // Limpiamos el contenido previo

    // Si el carrito está vacío, mostramos un mensaje
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        cartItems.forEach(item => {
            const productElement = document.createElement('div');
            productElement.classList.add('cart-item');
            productElement.innerHTML = `
                <img src="./images/${item.id}.png" alt="${item.name}">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>Precio: $${item.price.toFixed(2)}</p>
                    <p>Cantidad: 
                        <button class="adjust-quantity" data-id="${item.id}" data-action="decrement">-</button>
                        <span>${item.quantity}</span>
                        <button class="adjust-quantity" data-id="${item.id}" data-action="increment">+</button>
                    </p>
                </div>
            `;
            cartItemsContainer.appendChild(productElement);
        });
    }

    // Actualizamos el resumen del carrito (total)
    updateCartSummary();
}

// Calcular el total del carrito
function calculateTotal() {
    const cartItems = getCartItems();
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Actualizar el resumen del carrito
function updateCartSummary() {
    const totalElement = document.querySelector('.cart-summary p');
    const total = calculateTotal();
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Vaciar el carrito
function clearCart() {
    localStorage.removeItem('cart');
    updateCart();
}

// Añadir un producto al carrito
function addToCart(productId, productName, productPrice) {
    let cartItems = getCartItems();
    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    saveCartItems(cartItems);
    updateCart();
}

// Ajustar la cantidad de productos en el carrito
function adjustQuantity(productId, action) {
    let cartItems = getCartItems();
    const item = cartItems.find(item => item.id === productId);

    if (item) {
        if (action === 'increment') {
            item.quantity++;
        } else if (action === 'decrement' && item.quantity > 1) {
            item.quantity--;
        }
    }

    saveCartItems(cartItems);
    updateCart();
}

// Evento para ajustar la cantidad (+/-) en el carrito
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('adjust-quantity')) {
        const productId = e.target.getAttribute('data-id');
        const action = e.target.getAttribute('data-action');
        adjustQuantity(productId, action);
    }
});

// Evento para vaciar el carrito
document.querySelector('.btn-vaciar').addEventListener('click', function () {
    clearCart();
});

// Evento para pagar el carrito
document.querySelector('.btn-pagar').addEventListener('click', function () {
    const cartItems = getCartItems();

    if (cartItems.length === 0) {
        Swal.fire('El carrito está vacío', 'Por favor, agrega productos antes de pagar.', 'warning');
        return;
    }

    Swal.fire('Pago realizado', 'Gracias por tu compra!', 'success');
    clearCart();
});

// Inicializamos el carrito al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    updateCart();
});
