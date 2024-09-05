document.addEventListener('DOMContentLoaded', () => {
    fetchProductsAndDisplay();
    updateCartIcon();
    document.getElementById('cart-icon').addEventListener('click', toggleCart);
    document.getElementById('empty-cart').addEventListener('click', emptyCart);
    document.getElementById('pay').addEventListener('click', pay);
});

async function fetchProductsAndDisplay() {
    try {
        const response = await fetch('./data/data.json');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        Swal.fire({
            title: 'Error',
            text: 'No se pudieron cargar los productos.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}

function displayProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = products.map(product => `
        <div class="product">
            <img src="./images/${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price.toFixed(2)}</p>
            <label for="color-${product.id}">Color:</label>
            <select id="color-${product.id}">
                ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
            </select>
            <label for="size-${product.id}">Tamaño:</label>
            <select id="size-${product.id}">
                ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
            </select>
            <button onclick="addToCart('${product.id}')">Añadir al Carrito</button>
        </div>
    `).join('');
}

function addToCart(productId) {
    const color = document.getElementById(`color-${productId}`).value;
    const size = document.getElementById(`size-${productId}`).value;
    const quantity = 1; // Default quantity

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId && item.color === color && item.size === size);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: productId, color, size, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    updateCartIcon();
}

function toggleCart() {
    const cart = document.getElementById('shopping-cart');
    const isHidden = cart.classList.contains('hidden');
    if (isHidden) {
        cart.classList.remove('hidden');
        updateCart();
    } else {
        cart.classList.add('hidden');
    }
}

function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalQuantity;
}

function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    let total = 0;

    cartItemsContainer.innerHTML = cart.map(item => {
        const product = findProductById(item.id);
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <p>${product.name} - Color: ${item.color} - Tamaño: ${item.size}</p>
                <p>Cantidad: ${item.quantity} - Total: $${itemTotal.toFixed(2)}</p>
                <button class="gray-button" onclick="changeQuantity('${item.id}', '${item.color}', '${item.size}', -1)">-</button>
                <button class="gray-button" onclick="changeQuantity('${item.id}', '${item.color}', '${item.size}', 1)">+</button>
            </div>
        `;
    }).join('');

    const cartTotal = document.createElement('div');
    cartTotal.id = 'cart-total';
    cartTotal.innerText = `Total: $${total.toFixed(2)}`;
    cartItemsContainer.appendChild(cartTotal);
}

function findProductById(id) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    return products.find(product => product.id === id);
}

function changeQuantity(productId, color, size, delta) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId && item.color === color && item.size === size);
    
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            const index = cart.indexOf(item);
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
        updateCartIcon();
    }
}

function emptyCart() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esto vaciará tu carrito de compras.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('cart');
            updateCart();
            updateCartIcon();
            Swal.fire(
                'Vacío',
                'Tu carrito ha sido vaciado.',
                'success'
            );
        }
    });
}

function pay() {
    Swal.fire({
        title: 'Gracias por tu compra',
        text: 'Tu compra ha sido realizada con éxito.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        localStorage.removeItem('cart');
        updateCart();
        updateCartIcon();
    });
}
