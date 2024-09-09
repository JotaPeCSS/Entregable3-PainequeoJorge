// JavaScript/shoppingCart.js

// Función para actualizar el carrito en la UI
function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartList = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const cartEmptyMessage = document.getElementById('cart-empty-message');

    cartList.innerHTML = ''; // Limpiar la lista antes de actualizar

    if (cartItems.length === 0) {
        cartEmptyMessage.style.display = 'block';
        cartSummary.innerHTML = '';
    } else {
        cartEmptyMessage.style.display = 'none';
        let total = 0;

        cartItems.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)} - <span style="background-color: ${item.color}; display: inline-block; width: 20px; height: 20px; border-radius: 50%;"></span>
                <button onclick="removeFromCart('${item.id}', '${item.color}')">Eliminar</button>
            `;
            cartList.appendChild(cartItem);
            total += item.price;
        });

        cartSummary.innerHTML = `Total: $${total.toFixed(2)}`;
    }
}

// Función para añadir al carrito
function addToCart(productId, productName, productPrice, productColor) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({ id: productId, name: productName, price: productPrice, color: productColor });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCart();
}

// Función para eliminar del carrito
function removeFromCart(productId, color) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => !(item.id === productId && item.color === color));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCart();
}

// Función para vaciar el carrito
document.getElementById('empty-cart-btn').addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    updateCart();
});

// Función para finalizar la compra
document.getElementById('checkout-btn').addEventListener('click', () => {
    Swal.fire({
        title: '¡Compra realizada!',
        text: 'Gracias por tu compra.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        localStorage.removeItem('cartItems');
        updateCart();
    });
});

// Actualizar el carrito al cargar la página
window.onload = updateCart;
