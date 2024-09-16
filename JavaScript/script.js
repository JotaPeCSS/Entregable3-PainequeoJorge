document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

async function loadProducts() {
    try {
        const response = await fetch('data/data.json');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Error cargando productos:', error);
    }
}

function renderProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <div class="color-options">
                ${product.colors.map(color => `
                    <span class="color-option" style="background-color: ${color};" data-color="${color}"></span>
                `).join('')}
            </div>
            <label for="size-${product.id}">Tamaño:</label>
            <select id="size-${product.id}" class="size-selector">
                ${['S', 'M', 'L', 'XL'].map(size => `
                    <option value="${size}">${size}</option>
                `).join('')}
            </select>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        productList.appendChild(productElement);
    });
}

function addToCart(productId) {
    const selectedColor = document.querySelector(`.product:nth-child(${productId}) .color-option.selected`);
    const color = selectedColor ? selectedColor.dataset.color : '';
    const size = document.querySelector(`#size-${productId}`).value;

    const product = {
        id: productId,
        name: `Producto ${productId}`, // Placeholder, use product name from your JSON
        price: 10.00, // Placeholder, use product price from your JSON
        selectedColor: color,
        size: size,
        quantity: 1
    };

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}
