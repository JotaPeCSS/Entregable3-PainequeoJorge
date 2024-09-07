// shoppingCart.js

document.addEventListener('DOMContentLoaded', () => {
    // Obtén el carrito del localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Función para actualizar la vista del carrito
    function updateCart() {
        const cartContainer = document.getElementById('cart-items');
        const totalAmount = document.getElementById('total-amount');
        cartContainer.innerHTML = ''; // Limpia el contenido actual

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>El carrito está vacío.</p>';
            totalAmount.textContent = '0';
            return;
        }

        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name} (${item.size}, ${item.color}) x${item.quantity}</span>
                <span>$${item.price * item.quantity}</span>
                <button class="remove-item" data-index="${cart.indexOf(item)}">Eliminar</button>
            `;
            cartContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        totalAmount.textContent = total.toFixed(2);
    }

    // Función para manejar la eliminación de productos del carrito
    function handleRemoveItem(event) {
        if (!event.target.classList.contains('remove-item')) return;

        const index = event.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    // Función para vaciar el carrito
    function clearCart() {
        localStorage.removeItem('cart');
        updateCart();
    }

    // Evento para manejar el clic en el botón de vaciar carrito
    document.getElementById('clear-cart').addEventListener('click', clearCart);

    // Evento para manejar la eliminación de productos
    document.getElementById('cart-items').addEventListener('click', handleRemoveItem);

    updateCart(); // Inicializa el carrito en la carga de la página
});
