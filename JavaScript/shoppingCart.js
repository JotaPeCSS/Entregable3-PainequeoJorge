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
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Vas a vaciar el carrito.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('cart');
            cart.length = 0; // Clear cart array
            updateCartUI();
            Swal.fire(
                'Vaciado!',
                'El carrito ha sido vaciado.',
                'success'
            );
        }
    });
});

document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Carrito vacío',
            text: 'El carrito está vacío.',
        });
        return;
    }
    
    Swal.fire({
        title: 'Confirmar compra',
        text: '¿Deseas finalizar la compra?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, comprar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Simular el proceso de compra
            localStorage.removeItem('cart');
            cart.length = 0; // Clear cart array
            updateCartUI();
            Swal.fire(
                'Compra completada!',
                'Gracias por tu compra!',
                'success'
            );
        }
    });
});

updateCartUI();
