// JavaScript/shoppingCart.js

// Función para mostrar el carrito
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>El carrito está vacío.</p>';
        totalAmount.textContent = '0.00';
        return;
    }

    cartContainer.innerHTML = cart.map(item => {
        const { id, name, price, quantity } = item;
        return `
            <div class="cart-item">
                <span>${name}</span>
                <span>$${price.toFixed(2)}</span>
                <span>${quantity}</span>
                <span>$${(price * quantity).toFixed(2)}</span>
                <button onclick="removeFromCart(${id})">Eliminar</button>
                <button onclick="updateQuantity(${id}, 1)">+1</button>
                <button onclick="updateQuantity(${id}, -1)">-1</button>
            </div>
        `;
    }).join('');

    // Calcula el total
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    totalAmount.textContent = total.toFixed(2);
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    displayCart();
}

// Función para actualizar la cantidad de un producto en el carrito
function updateQuantity(productId, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.map(item => {
        if (item.id === productId) {
            item.quantity += change;
        }
        return item;
    }).filter(item => item.quantity > 0);
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    displayCart();
}

// Añadir productos al carrito
function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Manejar evento de carga de la página
document.addEventListener('DOMContentLoaded', () => {
    displayCart();

    // Manejar el botón de vaciar carrito
    document.getElementById('clear-cart').addEventListener('click', () => {
        localStorage.removeItem('cart');
        displayCart();
    });

    // Manejar el botón de finalizar compra
    document.getElementById('checkout').addEventListener('click', () => {
        const totalAmount = document.getElementById('total-amount').textContent;
        Swal.fire({
            title: '¡Gracias por tu compra!',
            text: `El monto total de la compra es $${totalAmount}`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            localStorage.removeItem('cart');
            displayCart();
        });
    });
});
