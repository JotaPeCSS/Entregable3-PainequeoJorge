// script.js

document.addEventListener("DOMContentLoaded", () => {
    fetch('../data/data.json')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        })
        .catch(error => console.error("Error al cargar los productos:", error));
});

// Función para mostrar los productos en la lista
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="./assets/${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Añadir al Carrito</button>
        `;

        productList.appendChild(productCard);
    });
}
