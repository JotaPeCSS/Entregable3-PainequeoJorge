// script.js

// Función para mostrar productos
async function loadProducts() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const products = await response.json();
        const productList = document.getElementById('product-list');

        productList.innerHTML = ''; // Limpiar la lista antes de agregar productos

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <img src="assets/${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <div class="color-options">
                    ${product.colors.map(color => `
                        <div class="color-option" style="background-color: ${color};" data-product-id="${product.id}" onclick="selectColor('${product.id}', '${color}', this)"></div>
                    `).join('')}
                </div>
                <button onclick="addToCart('${product.id}', '${product.name}', ${product.price}, '${product.colors[0]}')">Añadir al Carrito</button>
            `;
            productList.appendChild(productDiv);
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Cargar productos al iniciar
window.onload = loadProducts;

// Función para seleccionar color
function selectColor(productId, color, element) {
    const colorOptions = document.querySelectorAll(`.color-option[data-product-id="${productId}"]`);
    colorOptions.forEach(option => option.classList.remove('selected'));
    element.classList.add('selected');
    // Cambiar el color seleccionado en la UI si es necesario
    console.log(`Color ${color} seleccionado para el producto ${productId}`);
}
