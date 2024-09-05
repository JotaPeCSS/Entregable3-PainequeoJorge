// script.js

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    document.getElementById('toggle-cart').addEventListener('click', toggleCart);
});

const loadProducts = async () => {
    try {
        const response = await fetch('./data/data.json');
        const data = await response.json();
        displayProducts(data);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
};

const displayProducts = (products) => {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = ''; // Clear existing products

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
            <img src="./images/${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
            <select class="color-selector">
                ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
            </select>
            <select class="size-selector">
                ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
            </select>
            <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
        `;

        productsContainer.appendChild(productElement);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const productName = e.target.dataset.name;
            const productPrice = e.target.dataset.price;
            const color = e.target.closest('.product').querySelector('.color-selector').value;
            const size = e.target.closest('.product').querySelector('.size-selector').value;
            addToCart(productId, productName, productPrice, color, size);
        });
    });
};

const toggleCart = () => {
    const cartContainer = document.getElementById('cart');
    cartContainer.classList.toggle('active');
};

const addToCart = (id, name, price, color, size) => {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === id && item.color === color && item.size === size);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({ id, name, price, color, size, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
};
