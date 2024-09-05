document.addEventListener('DOMContentLoaded', () => {
    fetchProductsAndDisplay();
});

async function fetchProductsAndDisplay() {
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
    container.innerHTML = products.map(product => `
        <div class="product">
            <img src="./images/${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price.toFixed(2)}</p>
            <label for="color-${product.id}">Color:</label>
            <select id="color-${product.id}">
                ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
            </select>
            <label for="size-${product.id}">Tamaño:</label>
            <select id="size-${product.id}">
                ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
            </select>
            <button onclick="addToCart('${product.id}')">Añadir al Carrito</button>
        </div>
    `).join('');
}

function addToCart(productId) {
    const color = document.getElementById(`color-${productId}`).value;
    const size = document.getElementById(`size-${productId}`).value;
    const quantity = 1; // Default quantity

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId && item.color === color && item.size === size);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: productId, color, size, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}
