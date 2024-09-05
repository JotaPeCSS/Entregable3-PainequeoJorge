// script.js

// Cargar los productos desde data.json
async function loadProducts() {
    try {
        const response = await fetch('./data/data.json');
        if (!response.ok) throw new Error('Error en la carga de productos');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Mostrar los productos en el HTML
function displayProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // Limpiar contenido previo

    products.forEach(product => {
        // Crear un contenedor para el producto
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        // Agregar la imagen del producto
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        productDiv.appendChild(img);

        // Agregar nombre del producto
        const name = document.createElement('h3');
        name.textContent = product.name;
        productDiv.appendChild(name);

        // Agregar precio del producto
        const price = document.createElement('p');
        price.textContent = `$${product.price.toFixed(2)}`;
        productDiv.appendChild(price);

        // Agregar opciones de color
        const colorSelect = document.createElement('select');
        colorSelect.id = `${product.id}-color`;
        product.colors.forEach(color => {
            const option = document.createElement('option');
            option.value = color;
            option.textContent = color.charAt(0).toUpperCase() + color.slice(1);
            colorSelect.appendChild(option);
        });
        productDiv.appendChild(colorSelect);

        // Agregar opciones de talla
        const sizeSelect = document.createElement('select');
        sizeSelect.id = `${product.id}-size`;
        product.sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = size.toUpperCase();
            sizeSelect.appendChild(option);
        });
        productDiv.appendChild(sizeSelect);

        // Botón para agregar al carrito
        const addButton = document.createElement('button');
        addButton.className = 'add-to-cart';
        addButton.textContent = 'Agregar al carrito';
        addButton.addEventListener('click', () => {
            const selectedColor = document.getElementById(`${product.id}-color`).value;
            const selectedSize = document.getElementById(`${product.id}-size`).value;
            addToCart(product.id, selectedColor, selectedSize);
        });
        productDiv.appendChild(addButton);

        // Agregar el producto al contenedor
        container.appendChild(productDiv);
    });
}

// Función para agregar al carrito
function addToCart(productId, color, size) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = { id: productId, color, size, quantity: 1 };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    Swal.fire('Producto añadido', '', 'success');
}

// Inicializar la carga de productos
document.addEventListener('DOMContentLoaded', loadProducts);
