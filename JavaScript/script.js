// JavaScript/script.js

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

const fetchProducts = async () => {
    try {
        const response = await fetch('./data/data.json');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
};

const displayProducts = (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar antes de agregar
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const img = document.createElement('img');
        img.src = `assets/${product.image}`;
        img.alt = product.name;

        const name = document.createElement('h3');
        name.textContent = product.name;

        const price = document.createElement('p');
        price.textContent = `$${product.price.toFixed(2)}`;

        const button = document.createElement('button');
        button.textContent = 'Agregar al Carrito';
        button.addEventListener('click', () => addToCart(product.id));

        productDiv.appendChild(img);
        productDiv.appendChild(name);
        productDiv.appendChild(price);
        productDiv.appendChild(button);

        productList.appendChild(productDiv);
    });
};
