document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    const cartIcon = document.getElementById('cart-icon');
    const cartContainer = document.getElementById('cart-container');
    const cartCount = document.getElementById('cart-count');

    cartIcon.addEventListener('click', () => {
        cartContainer.style.display = (cartContainer.style.display === 'none' || cartContainer.style.display === '') ? 'block' : 'none';
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-product-id');
            const product = getProductData(productId);
            addToCart(product);
        });
    });
});

function loadProducts() {
    fetch('./data/data.json')
        .then(response => response.json())
        .then(data => {
            console.log('Productos cargados:', data);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
}

function getProductData(productId) {
    const products = [
        { id: 1, name: 'Gorra', price: 10, image: './images/gorra.png' },
        { id: 2, name: 'Camiseta', price: 20, image: './images/camiseta.png' },
        { id: 3, name: 'Chaqueta', price: 30, image: './images/chaqueta.png' }
    ];

    return products.find(product => product.id === parseInt(productId));
}

function addToCart(product) {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');
    cartItemElement.innerHTML = `
        <p>${product.name} - $${product.price}</p>
    `;
    cartItemsContainer.appendChild(cartItemElement);
    updateCartCount();
    updateCartTotal();
    toggleCartVisibility();
}

function updateCartCount() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = cartItemsContainer.children.length;
    document.getElementById('cart-count').textContent = cartCount;
}

function updateCartTotal() {
    const cartItemsContainer = document.getElementById('cart-items');
    let total = 0;
    cartItemsContainer.querySelectorAll('.cart-item').forEach(item => {
        const price = parseFloat(item.textContent.split('$')[1]);
        total += price;
    });
    document.getElementById('total-amount').textContent = total.toFixed(2);
}

function toggleCartVisibility() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.style.display = 'block';
}
