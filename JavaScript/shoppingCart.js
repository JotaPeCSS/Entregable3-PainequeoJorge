// JavaScript/shoppingCart.js

document.addEventListener('DOMContentLoaded', () => {
    displayCart();
});

const updateCartTotal = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    document.getElementById('cart-total').innerText = `Total: $${total.toFixed(2)}`;
};

const displayCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <span>Quantity: ${item.quantity}</span>
            <button onclick="updateQuantity(${item.id}, -1)">-</button>
            <button onclick="updateQuantity(${item.id}, 1)">+</button>
            <button onclick="removeFromCart(${item.id})">Eliminar</button>
        </div>
    `).join('');
    updateCartTotal();
};

const addToCart = (id) => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === id);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
};

const removeFromCart = (id) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
};

const updateQuantity = (id, change) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity += change;

        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        } else {
            cart = cart.map(item => item.id === id ? cartItem : item);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
};

// Function to handle checkout
const checkout = () => {
    Swal.fire({
        title: '¡Compra realizada!',
        text: 'Gracias por tu compra.',
        icon: 'success'
    }).then(() => {
        localStorage.removeItem('cart');
        displayCart();
    });
};

// Export functions to be used in script.js
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.checkout = checkout;
