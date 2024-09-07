// Función para cargar productos
function loadProducts() {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la carga de productos');
            }
            return response.json();
        })
        .then(products => {
            displayProducts(products);
        })
        .catch(error => {
            console.error('Error cargando los productos:', error);
            document.getElementById('productList').innerHTML = 'No se pudieron cargar los productos.';
        });
}

// Función para mostrar productos en la interfaz
function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(product => {
        productList.innerHTML += `
            <div class="product">
                <h3>${product.name}</h3>
                <p>Precio: $${product.price}</p>
                <button onclick="addToCart('${product.id}')">Añadir al Carrito</button>
            </div>
        `;
    });
}

// Llama a la función para cargar productos al iniciar
loadProducts();
