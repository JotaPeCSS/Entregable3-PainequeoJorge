document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

async function loadProducts() {
    try {
        const response = await fetch('./data/data.json');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

function displayProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="./images/${product.image}" alt="${product.name}">
            <div class="product-details">
                <h3>${product.name}</h3>
                <p>Precio: $${product.price}</p>
                <label for="color-${product.id}">Color:</label>
                <select id="color-${product.id}" name="color">
                    ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
                </select>
                <label for="size-${product.id}">Talla:</label>
                <select id="size-${product.id}" name="size">
                    ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                </select>
                <button onclick="addToCart(${product.id})">Añadir al Carrito</button>
            </div>
        `;
        container.appendChild(productElement);
    });
}

function addToCart(productId) {
    // Implementa la lógica para añadir productos al carrito
}
