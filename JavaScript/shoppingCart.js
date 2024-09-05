document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    document.getElementById('empty-cart').addEventListener('click', emptyCart);
    document.getElementById('checkout').addEventListener('click', checkout);
});

function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    let total = 0;

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="./images/${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Color: ${item.color}</p>
                <p>Talla: ${item.size}</p>
                <p>Precio: $${item.price}</p>
                <button class="adjust-quantity" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span id="quantity-${item.id}">${item.quantity}</span>
                <button class="adjust-quantity" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button onclick="removeFromCart(${item.id})">Eliminar</button>
            </div>
        `;
        cartContainer.appendChild(cartItem);

        total += item.price * item.quantity;
    });

    document.getElementById('total').textContent = total.toFixed(2);
}

function updateQuantity(productId, delta) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity += delta;
        if (cartItems[itemIndex].quantity <= 0) {
            cartItems.splice(itemIndex, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCart();
    }
}

function removeFromCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCart();
}

function emptyCart() {
    localStorage.removeItem('cart');
    updateCart();
}

function checkout() {
    Swal.fire({
        title: '¡Compra realizada!',
        text: 'Gracias por tu compra',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        emptyCart();
    });
}
