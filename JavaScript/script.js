// JavaScript/script.js

const fetchProducts = async () => {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        displayProducts(data);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
};

const displayProducts = (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(product => `
        <div class="product">
            <img src="assets/${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Agregar al carrito</button>
        </div>
    `).join('');
};

document.addEventListener('DOMContentLoaded', fetchProducts);
