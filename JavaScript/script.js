// script.js

// Carga los productos al inicio cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    fetch('./data/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los productos');
            }
            return response.json();
        })
        .then(products => {
            const productList = document.getElementById('product-list');

            // Verifica si se obtuvieron productos
            if (Array.isArray(products) && products.length) {
                products.forEach(product => {
                    // Asegúrate de que las imágenes y los productos existan
                    productList.innerHTML += `
                        <div class="product">
                            <img src="./assets/${product.image}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p>$${product.price}</p>
                            <button onclick="addToCart('${product.id}')">Añadir al Carrito</button>
                        </div>
                    `;
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se encontraron productos disponibles.',
                });
            }
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
