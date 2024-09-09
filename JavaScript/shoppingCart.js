// shoppingCart.js

// Función para agregar un producto al carrito
function addToCart(productId, productName, productPrice, productColor) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.id === productId && item.color === productColor);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ id: productId, name: productName, price: productPrice, color: productColor, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCart();
}

// Función para actualizar el carrito
function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartList = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    let total = 0;

    cartList.innerHTML = ''; // Limpiar el carrito antes de agregar los ítems

    cartItems.forEach(item => {
        const itemDiv = document.createElement('li');
        itemDiv.innerHTML = `
            ${item.name} (${item.color}) - $${item.price.toFixed(2)} x ${item.quantity}
            <button onclick="removeFromCart('${item.id}', '${item.color}')">Eliminar</button>
        `;
        cartList.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    cartSummary.innerHTML = `Total: $${total.toFixed(2)}`;
    cartEmptyMessage.style.display = cartItems.length ? 'none' : 'block';
}

// Función para eliminar un producto del carrito
function removeFromCart(productId, productColor) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => !(item.id === productId && item.color === productColor));

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCart();
}

// Función para vaciar el carrito
function emptyCart() {
    localStorage.removeItem('cartItems');
    updateCart();
}

// Función para finalizar la compra
function checkout() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length === 0) {
        Swal.fire('El carrito está vacío', '', 'info');
        return;
    }

    // Simulación del proceso de compra
    Swal.fire({
        title: '¡Compra finalizada!',
        text: `Total: $${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        localStorage.removeItem('cartItems');
        updateCart();
    });
}

// Event listeners
document.getElementById('empty-cart-btn').addEventListener('click', emptyCart);
document.getElementById('checkout-btn').addEventListener('click', checkout);

// Actualizar el carrito al cargar la página
window.onload = updateCart;
