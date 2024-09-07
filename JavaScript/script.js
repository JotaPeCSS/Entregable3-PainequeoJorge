// Función para cargar los productos desde el archivo JSON
function loadProducts() {
    fetch('data/data.json')  // Ruta correcta del archivo JSON
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('productList');
            productList.innerHTML = '';

            products.forEach(product => {
                productList.innerHTML += `
                    <div class="product">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>Precio: $${product.price}</p>
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
}

// Llamar a la función para cargar productos al iniciar
loadProducts();
