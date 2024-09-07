// JavaScript/script.js

// Función para cargar productos desde el archivo JSON
async function fetchProducts() {
    try {
        const response = await fetch('./data/data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Función para mostrar los productos en el HTML
function displayProducts(products) {
    const productContainer = document.getElementById('product-list');
    productContainer.innerHTML = products.map(product => `
        <div class="product">
            <img src="./assets/${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Agregar al carrito</button>
        </div>
    `).join('');
}

// Manejar evento de carga de la página
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});
