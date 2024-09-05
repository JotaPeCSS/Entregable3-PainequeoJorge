document.addEventListener('DOMContentLoaded', updateCart);

function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <p>Producto: ${item.product}</p>
                <p>Color: ${item.color}</p>
                <p>Talla: ${item.size}</p>
                <p>Cantidad: ${item.quantity}</p>
                <button class="remove-item" data-id="${item.id}">Eliminar</button>
                <button class="adjust-quantity" data-id="${item.id}" data-action="decrement">-</button>
                <button class="adjust-quantity" data-id="${item.id}" data-action="increment">+</button>
            </div>
        `;
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            removeFromCart(this.getAttribute('data-id'));
        });
    });

    document.querySelectorAll('.adjust-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const action = this.getAttribute('data-action');
            adjustQuantity(id, action);
        });
    });
}

function removeFromCart(id) {
    // Código para eliminar un producto del carrito
}

function adjustQuantity(id, action) {
    // Código para ajustar la cantidad de un producto en el carrito
}
