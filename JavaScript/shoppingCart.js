// JavaScript/shoppingCart.js

const cart = JSON.parse(localStorage.getItem('cart')) || [];

const updateCartUI = () => {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartItems.innerHTML = '';
    } else {
        emptyCartMessage.style.display = 'none';
        cartItems.innerHTML = cart.map(item => `
            <li>
                ${item.name} (${item.color}) - $${item.price.toFixed(2)} x ${item.quantity}
                <button onclick="updateQuantity(${item.id}, '${item.color}', -1)">-</button>
                <button onclick="updateQuantity(${item.id}, '${item.color}', 1)">+</button>
                <button onclick="removeFromCart(${item.id}, '${item.color}')">Eliminar</button>
            </li>
        `).join('');
    }
    
    totalAmount.textContent = calculateTotal().toFixed(2);
};

const updateQuantity = (productId, color, delta) => {
    const product = cart.find(p => p.id === productId && p.color === color);
    if (product) {
        product.quantity += delta;
        if (product.quantity <= 0) {
            cart.splice(cart.indexOf(product), 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    }
};

const removeFromCart = (productId, color) => {
    const index = cart.findIndex(p => p.id === productId && p.color === color);
    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    }
};

const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

document.getElementById('empty-cart-btn').addEventListener('click', () => {
    localStorage.removeItem('cart');
    cart.length = 0; // Clear cart array
    updateCartUI();
});

document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('El carrito está vacío.');
        return;
    }
    
    // Simular el proceso de compra
    localStorage.removeItem('cart');
    cart.length = 0; // Clear cart array
    updateCartUI();
    alert('Gracias por tu compra!');
});
