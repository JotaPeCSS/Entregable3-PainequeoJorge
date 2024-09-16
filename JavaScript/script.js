// Función para cargar los productos desde el archivo JSON
async function loadProducts() {
    try {
        const response = await fetch('data/data.json');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Función para mostrar los productos en la página
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price.toFixed(2)}</p>
            <div class="color-options" data-product-id="${product.id}">
                ${product.colors.map(color => 
                    `<div class="color-option" style="background-color: ${color};" data-color="${color}"></div>`
                ).join('')}
            </div>
            <button data-product-id="${product.id}">Añadir al carrito</button>
        `;
        productList.appendChild(productElement);
    });

    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', selectColor);
    });

    document.querySelectorAll('.product button').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Función para seleccionar un color
function selectColor(event) {
    const selectedOption = event.target;
    const colorOptions = selectedOption.parentElement.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => option.classList.remove('selected'));
    selectedOption.classList.add('selected');
}

// Función para añadir un producto al carrito
function addToCart(event) {
    const productId = event.target.getAttribute('data-product-id');
    const color = document.querySelector(`.color-options[data-product-id="${productId}"] .color-option.selected`);
    const size = prompt('Ingrese la talla (S, M, L, XL):');
    
    if (!size) {
        alert('Debe ingresar una talla.');
        return;
    }
    
    const colorValue = color ? color.getAttribute('data-color') : null;
    const product = { id: productId, color: colorValue, size: size, quantity: 1 };
    addProductToCart(product);
}

// Función para añadir un producto al carrito en localStorage
function addProductToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(p => p.id === product.id && p.color === product.color && p.size === product.size);
    
    if (index > -1) {
        cart[index].quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Función para actualizar el carrito en la interfaz
function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const cartEmptyMessage = document.getElementById('cart-empty-message');

    cartItemsList.innerHTML = '';
    if (cartItems.length === 0) {
        cartEmptyMessage.style.display = 'block';
        cartSummary.innerHTML = '';
        return;
    }

    cartEmptyMessage.style.display = 'none';
    let total = 0;

    cartItems.forEach(item => {
        const productElement = document.createElement('li');
        productElement.textContent = `Producto ${item.id} ${item.color ? `(Color: ${item.color})` : ''} ${item.size ? `(Tamaño: ${item.size})` : ''} x${item.quantity}`;
        cartItemsList.appendChild(productElement);

        total += item.quantity * 25.00; // Assuming each product costs $25.00 (adjust this as needed)
    });

    cartSummary.innerHTML = `Total: $${total.toFixed(2)}`;
}

// Función para vaciar el carrito
function emptyCart() {
    localStorage.removeItem('cart');
    updateCart();
}

// Función para proceder a la compra
function checkout() {
    localStorage.removeItem('cart');
    Swal.fire('¡Gracias por tu compra!', 'Tu carrito ha sido vaciado.', 'success');
    updateCart();
}

// Eventos
document.getElementById('empty-cart-btn').addEventListener('click', emptyCart);
document.getElementById('checkout-btn').addEventListener('click', checkout);

// Cargar productos al iniciar
loadProducts();
