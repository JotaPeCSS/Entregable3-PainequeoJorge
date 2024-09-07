document.addEventListener('DOMContentLoaded', () => {
    // Cargar productos desde data.json
    fetch('./data/data.json')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                loadProducts(data);
            } else {
                throw new Error('El formato de los datos no es un array');
            }
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
            alert('No se pudieron cargar los productos. Revisa la consola para más detalles.');
        });
});

// Función para cargar productos
function loadProducts(products) {
    const productsContainer = document.getElementById('products-container');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        
        // Crear contenido del producto
        productElement.innerHTML = `
            <img src="./images/${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>${product.price} USD</p>
            <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">Añadir al carrito</button>
        `;
        
        productsContainer.appendChild(productElement);
    });

    // Añadir evento de clic a los botones "Añadir al carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            addToCart(e.target.dataset);
        });
    });
}

// Función para añadir productos al carrito
function addToCart(productData) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.id === productData.id && item.size === productData.size && item.color === productData.color);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({
            id: productData.id,
            name: productData.name,
            price: parseFloat(productData.price),
            image: productData.image,
            size: productData.size,
            color: productData.color,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartView();
}

// Función para actualizar la vista del carrito
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
