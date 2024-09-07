// JavaScript/script.js

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    displayCart();
});

const fetchProducts = async () => {
    try {
        // Asegúrate de que la ruta del archivo JSON sea correcta
        const response = await fetch('./data/data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        Swal.fire({
            title: 'Error',
            text: 'No se pudo cargar la lista de productos.',
            icon: 'error'
        });
    }
};

const displayProducts = (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(product => `
        <div class="product">
            <img src="assets/${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        </div>
    `).join('');
};
