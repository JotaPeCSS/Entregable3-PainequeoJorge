const cart = [];

document.getElementById('cart-icon').addEventListener('click', () => {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.classList.toggle('hidden');
});

document.getElementById('clear-cart').addEventListener('click', () => {
    clearCart();
    updateCart();
});

document.getElementById('checkout').addEventListener('click', () => {
    Swal.fire({
        title: '¡Compra realizada!',
        text: 'Gracias por tu compra.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
    clearCart();
    updateCart();
});

function addToCart(productId) {
    const productElement = document.querySelector(`#product-container .product:nth-child(${productId})`);
    const color = productElement.querySelector('.color-select').value;
    const size = productElement.querySelector('.size-select').value;

    const product = {
        id: productId,
        color,
        size,
        // Supongamos que obtienes el nombre y el precio del producto aquí
        name: 'Nombre del Producto', // Debería reemplazarse con el nombre real del producto
        price: 10.00 // Debería reemplazarse con el precio real del producto
    };

    const existingProductIndex = cart.findIndex(p => p.id === product.id && p.color === product.color && p.size === product.size);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = ''; // Limpiar el contenedor del carrito
    let total = 0;

    cart.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'cart-item';

        productDiv.innerHTML = `
            <p>${product.name} - ${product.size} - ${product.color}</p>
            <p>Precio: $${product.price} x ${product.quantity}</p>
            <button onclick="changeQuantity(${product.id}, '${product.color}', '${product.size}', -1)">-</button>
            <button onclick="changeQuantity(${product.id}, '${product.color}', '${product.size}', 1)">+</button>
        `;

        cartItems.appendChild(productDiv);

        total += product.price * product.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
}

function changeQuantity(productId, color, size, change) {
    const productIndex = cart.findIndex(p => p.id === productId && p.color === color && p.size === size);

    if (productIndex > -1) {
        cart[productIndex].quantity += change;
        if (cart[productIndex].quantity <= 0) {
            cart.splice(productIndex, 1);
        }
        updateCart();
    }
}

function clearCart() {
    cart.length = 0;
    updateCart();
}
