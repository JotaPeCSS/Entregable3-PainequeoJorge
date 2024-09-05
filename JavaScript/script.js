// Función para cargar los productos desde el archivo JSON
async function loadProducts() {
    try {
        const response = await fetch('./data/data.json');
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Función para mostrar los productos en el DOM
function displayProducts(products) {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = ''; // Limpiamos antes de agregar

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="./images/${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button data-id="${product.id}" class="add-to-cart-btn">Agregar al Carrito</button>
        `;
        productList.appendChild(productItem);
    });
}

// Inicializar productos y agregar eventos
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    // Evento para agregar producto al carrito
    document.querySelector('.product-list').addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = e.target.getAttribute('data-id');
            addToCart(productId);
        }
    });

    // Evento para vaciar carrito
    document.querySelector('.btn-vaciar').addEventListener('click', () => {
        clearCart();
    });

    // Evento para pagar
    document.querySelector('.btn-pagar').addEventListener('click', () => {
        payCart();
    });
});

// Función para agregar un producto al carrito
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productExists = cart.find(item => item.id === productId);

    if (productExists) {
        productExists.quantity++;
    } else {
        const product = { id: productId, quantity: 1 };
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Función para actualizar el carrito
function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('#cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');
        productElement.innerHTML = `
            <img src="./images/${item.id}.png" alt="Producto">
            <div class="item-info">
                <h4>Producto ${item.id}</h4>
                <p>Cantidad: <button class="adjust-quantity" data-id="${item.id}" data-action="decrement">-</button>
                <span>${item.quantity}</span>
                <button class="adjust-quantity" data-id="${item.id}" data-action="increment">+</button></p>
            </div>
        `;
        cartItemsContainer.appendChild(productElement);
    });

    document.querySelector('.cart-summary p').innerText = `Total: $${calculateTotal().toFixed(2)}`;
}

// Función para calcular el total del carrito
function calculateTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    cart.forEach(item => {
        const product = getProductById(item.id);
        total += product.price * item.quantity;
    });

    return total;
}

// Obtener producto por ID (debería cargar desde el archivo JSON)
function getProductById(id) {
    // Aquí simularíamos la búsqueda en el JSON
    const products = [
        { id: '1', name: 'Gorra', price: 10.99 },
        { id: '2', name: 'Camiseta', price: 15.99 },
        { id: '3', name: 'Chaqueta', price: 25.99 }
    ];
    return products.find(product => product.id === id);
}

// Función para vaciar el carrito
function clearCart() {
    localStorage.removeItem('cart');
    updateCart();
}

// Función para pagar el carrito
function payCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        Swal.fire('El carrito está vacío', 'Por favor, agrega productos antes de pagar.', 'warning');
        return;
    }

    Swal.fire('Pago realizado', 'Gracias por tu compra!', 'success');
    clearCart();
}

// Evento para ajustar la cantidad de productos (+/-)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('adjust-quantity')) {
        const productId = e.target.getAttribute('data-id');
        const action = e.target.getAttribute('data-action');

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = cart.find(item => item.id === productId);

        if (action === 'increment') {
            product.quantity++;
        } else if (action === 'decrement' && product.quantity > 1) {
            product.quantity--;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
});
