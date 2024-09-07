// Mostrar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateCartView();
});

// Mostrar/ocultar el carrito
document.getElementById('cart-icon').addEventListener('click', () => {
    const cartContainer = document.getElementById('cart-container');
    const isOpen = cartContainer.style.transform === 'translateX(0%)';
    cartContainer.style.transform = isOpen ? 'translateX(100%)' : 'translateX(0%)';
});

// Actualizar la vista del carrito
function updateCartView() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        
        itemElement.innerHTML = `
            <img src="./images/${item.image}" alt="${item.name}" style="width: 50px; height: 50px;"/>
            <span>${item.name} ${item.size} ${item.color} x${item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)} USD</span>
            <button class="remove-item" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">Eliminar</button>
        `;
        
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    totalElement.textContent = `Total: ${total.toFixed(2)} USD`;
    
    // Añadir eventos a los botones "Eliminar"
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const size = e.target.dataset.size;
            const color = e.target.dataset.color;
            removeFromCart(productId, size, color);
        });
    });
}

// Función para eliminar un producto del carrito
function removeFromCart(productId, size, color) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => !(item.id === productId && item.size === size && item.color === color));
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartView();
}

// Función para vaciar el carrito
document.getElementById('empty-cart').addEventListener('click', () => {
    localStorage.removeItem('cart');
    updateCartView();
});
