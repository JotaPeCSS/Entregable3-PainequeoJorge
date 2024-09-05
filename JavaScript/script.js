// script.js

// Función para cargar los productos desde el archivo JSON
async function loadProducts() {
    try {
        const response = await fetch('./data/data.json');
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }
        const data = await response.json();
        displayProducts(data);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Función para mostrar los productos en la página
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar la lista de productos antes de agregar nuevos

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="./images/${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price.toFixed(2)}</p>
            <div class="options">
                <label for="color-${product.id}">Color:</label>
                <select id="color-${product.id}" class="color-select">
                    ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
                </select>
                
                <label for="size-${product.id}">Tamaño:</label>
                <select id="size-${product.id}" class="size-select">
                    ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                </select>

                <label for="quantity-${product.id}">Cantidad:</label>
                <button class="adjust-quantity" id="decrement-${product.id}" data-id="${product.id}">-</button>
                <span id="quantity-${product.id}" class="quantity">1</span>
                <button class="adjust-quantity" id="increment-${product.id}" data-id="${product.id}">+</button>

                <button class="add-to-cart" data-id="${product.id}">Añadir al Carrito</button>
            </div>
        `;
        productList.appendChild(productElement);
    });

    // Añadir event listeners a los botones
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });

    document.querySelectorAll('.adjust-quantity').forEach(button => {
        button.addEventListener('click', handleQuantityAdjustment);
    });
}

// Función para manejar la adición de productos al carrito
function handleAddToCart(event) {
    const button = event.target;
    const productId = button.getAttribute('data-id');
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).textContent);
    const color = document.getElementById(`color-${productId}`).value;
    const size = document.getElementById(`size-${productId}`).value;

    const item = {
        id: productId,
        quantity,
        color,
        size,
    };

    addToCart(item);
}

// Función para manejar el ajuste de cantidad
function handleQuantityAdjustment(event) {
    const button = event.target;
    const productId = button.getAttribute('data-id');
    const quantityElement = document.getElementById(`quantity-${productId}`);
    let quantity = parseInt(quantityElement.textContent);

    if (button.id.startsWith('increment')) {
        quantity += 1;
    } else if (button.id.startsWith('decrement') && quantity > 1) {
        quantity -= 1;
    }

    quantityElement.textContent = quantity;
}

// Cargar los productos al inicio
document.addEventListener('DOMContentLoaded', loadProducts);
