document.addEventListener('DOMContentLoaded', updateCart);

function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <p>Producto ID: ${item.id}</p>
                <p>Color: ${item.color}</p>
                <p>Talla: ${item.size}</p>
                <p>Cantidad: ${item.quantity}</p>
                <button class="remove-item" data-id="${item.id}" data-color="${item.color}" data-size="${item.size}">Eliminar</button>
                <button class="adjust-quantity" data-id="${item.id}" data-color="${item.color}" data-size="${item.size}" data-action="decrement">-</button>
                <button class="adjust-quantity" data-id="${item.id}" data-color="${item.color}" data-size="${item.size}" data-action="increment">+</button>
            </div>
        `;
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            removeFromCart(this.getAttribute('data-id'), this.getAttribute('data-color'), this.getAttribute('data-size'));
        });
    });

    document.querySelectorAll('.adjust-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const color = this.getAttribute('data-color');
            const size = this.getAttribute('data-size');
            const action = this.getAttribute('data-action');
            adjustQuantity(id, color, size, action);
        });
    });
}

function removeFromCart(id, color, size) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => !(item.id === id && item.color === color && item.size === size));
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function adjustQuantity(id, color, size, action) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === id && item.color === color && item.size === size);

    if (item) {
        if (action === 'increment') {
            item.quantity += 1;
        } else if (action === 'decrement') {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                removeFromCart(id, color, size);
                return;
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}
