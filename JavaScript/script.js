// Función para cargar productos desde el archivo JSON
async function loadProducts() {
    try {
        const response = await fetch('data.json');
        const products = await response.json();
        const productList = document.getElementById('productList');
        
        productList.innerHTML = products.map(product => `
            <div class="product">
                <h3>${product.name}</h3>
                <p>Precio: $${product.price}</p>
                <button onclick="addToCart('${product.id}')">Añadir al Carrito</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error cargando los productos:', error);
    }
}

// Cargar productos al iniciar
loadProducts();
