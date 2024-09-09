// JavaScript/script.js

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

const fetchProducts = async () => {
    try {
        const response = await fetch('./data/data.json');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
};

const displayProducts = (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(product => `
        <div class="product">
            <img src="assets/${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <div>
                <label for="color-${product.id}">Color:</label>
                <select id="color-${product.id}" onchange="updateColor(${product.id})">
                    ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
                </select>
            </div>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        </div>
    `).join('');
};

let selectedColor = {};

const updateColor = (productId) => {
    const colorSelect = document.getElementById(`color-${productId}`);
    selectedColor[productId] = colorSelect.value;
};

const addToCart = (productId) => {
    fetch('./data/data.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            const color = selectedColor[productId] || product.colors[0]; // Default to the first color if none selected
            const existingProduct = cart.find(p => p.id === productId && p.color === color);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ ...product, color, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        })
        .catch(error => console.error('Error al añadir producto al carrito:', error));
};
