// shoppingCart.js

const getCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

const updateCart = () => {
    const cart = getCart();
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // Clear existing cart items

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>El carrito está vacío</p>';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <p>${item.name}</p>
            <p>Color: ${item.color}</p>
            <p>Tamaño: ${item.size}</p>
            <p>Cantidad: 
                <button class="adjust-quantity" data-id="${item.id}" data-color="${item.color}" data-size="${item.size}" data-action="decrement">-</button>
                <span id="quantity-${item.id}-${item.color}-${item.size}">${item.quantity}</span>
                <button class="adjust-quantity" data-id="${item.id}" data-color="${item.color}" data-size="${item.size}" data-action="increment">+</button>
            </p>
            <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
            <button class="remove-item" data-id="${item.id}" data-color="${item.color}" data-size="${item.size}">Remove</button>
        `;

        cartContainer.appendChild(cartItem);
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const color = e.target.dataset.color;
            const size = e.target.dataset.size;
            removeFromCart(productId, color, size);
        });
    });

    document.querySelectorAll('.adjust-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const color = e.target.dataset.color;
            const size = e.target.dataset.size;
            const action = e.target.dataset.action;
            adjustQuantity(productId, color, size, action);
        });
    });

    updateCartTotal();
};

const addToCart = (id, name, price, color, size) => {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === id && item.color === color && item.size === size);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({ id, name, price, color, size, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
};

const removeFromCart = (id, color, size) => {
    let cart = getCart();
    cart = cart.filter(item => !(item.id === id && item.color === color && item.size === size));

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
};

const adjustQuantity = (id, color, size, action) => {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === id && item.color === color && item.size === size);

    if (itemIndex > -1) {
        if (action === 'increment') {
            cart[itemIndex].quantity += 1;
        } else if (action === 'decrement') {
            cart[itemIndex].quantity = Math.max(1, cart[itemIndex].quantity - 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
};

const updateCartTotal = () => {
    const cart = getCart();
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    document.getElementById('cart-total').innerText = `Total: $${total.toFixed(2)}`;
};

document.getElementById('empty-cart').addEventListener('click', () => {
    localStorage.removeItem('cart');
    updateCart();
});

document.getElementById('checkout').addEventListener('click', () => {
    Swal.fire('Compra realizada', 'Gracias por tu compra', 'success');
});
