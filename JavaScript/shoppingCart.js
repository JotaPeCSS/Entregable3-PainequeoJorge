// shoppingCart.js

// Función para obtener el carrito de compras desde localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Función para guardar el carrito de compras en localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para actualizar el carrito en la página
function updateCart() {
    const cart = getCart();
    const cartList = document.getElementById('cart-list');
    const totalElement = document.getElementById('total');
    
    cartList.innerHTML = ''; // Limpiar el carrito antes de actualizar
    let total = 0;

    cart.forEach(item => {
        // Crear un elemento de carrito para cada ítem
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>Producto: ${item.id}</p>
            <p>Color: ${item.color}</p>
            <p>Tamaño: ${item.size}</p>
            <p>Cantidad: <span class="quantity">${item.quantity}</span></p>
            <p>Precio: $${(item.price * item.quantity).toFixed(2)}</p>
            <button class="adjust-quantity" id="decrement-${item.id}" data-id="${item.id}">-</button>
            <button class="adjust-quantity" id="increment-${item.id}" data-id="${item.id}">+</button>
            <button class="remove-item" data-id="${item.id}">Eliminar</button>
        `;
        cartList.appendChild(cartItem);

        // Calcular el total
        total += item.price * item.quantity;
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;

    // Añadir event listeners a los botones de ajuste de cantidad y eliminar
    document.querySelectorAll('.adjust-quantity').forEach(button => {
        button.addEventListener('click', handleQuantityAdjustment);
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', handleRemoveItem);
    });
}

// Función para manejar la adición de un producto al carrito
function addToCart(item) {
    const cart = getCart();
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id && cartItem.color === item.color && cartItem.size === item.size);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += item.quantity;
    } else {
        // Aquí deberías obtener el precio del producto de alguna manera. Por ahora, uso un valor fijo.
        const productPrice = 20; // Cambiar esto por el precio real del producto
        cart.push({ ...item, price: productPrice });
    }

    saveCart(cart);
    updateCart();
}

// Función para manejar el ajuste de cantidad en el carrito
function handleQuantityAdjustment(event) {
    const button = event.target;
    const productId = button.getAttribute('data-id');
    const cart = getCart();
    const item = cart.find(cartItem => cartItem.id === productId);

    if (!item) return;

    if (button.id.startsWith('increment')) {
        item.quantity += 1;
    } else if (button.id.startsWith('decrement') && item.quantity > 1) {
        item.quantity -= 1;
    }

    saveCart(cart);
    updateCart();
}

// Función para manejar la eliminación de un ítem del carrito
function handleRemoveItem(event) {
    const button = event.target;
    const productId = button.getAttribute('data-id');
    let cart = getCart();
    cart = cart.filter(cartItem => cartItem.id !== productId);

    saveCart(cart);
    updateCart();
}

// Función para vaciar el carrito
function emptyCart() {
    localStorage.removeItem('cart');
    updateCart();
}

// Configurar el evento para vaciar el carrito
document.getElementById('empty-cart').addEventListener('click', emptyCart);

// Cargar el carrito al inicio
document.addEventListener('DOMContentLoaded', updateCart);
