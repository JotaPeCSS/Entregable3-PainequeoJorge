// script.js

// Carga los productos al inicio
document.addEventListener('DOMContentLoaded', () => {
    fetch('./data/data.json')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                productList.innerHTML += `
                    <div class="product">
                        <img src="./assets/${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>$${product.price}</p>
                        <button onclick="addToCart('${product.id}')">Añadir al Carrito</button>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('Error cargando los productos:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar los productos.',
            });
        });
});
