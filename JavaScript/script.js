// script.js

// Función para mostrar productos
async function loadProducts() {
    try {
        const response = await fetch('data/data.json');
        const products = await response.json();
        const productsContainer = document.getElementById('products-container');

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <img src="assets/${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <div class="color-options">
                    ${product.colors.map(color => `
                        <div class="color-option" style="background-color: ${color};" onclick="selectColor('${product.id}', '${color}')"></div>
                    `).join('')}
                </div>
                <button onclick="addToCart('${product.id}', '${product.name}', ${product.price}, '${product.colors[0]}')">Añadir al Carrito</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Cargar productos al iniciar
window.onload = loadProducts;
