const cart = [];

function addToCart(product) {
    cart.push(product);
    renderCart();
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `<p>${item.name} - $${item.price}</p>`;
        cartItemsContainer.appendChild(cartItemElement);
    });

    updateCartCount();
    updateCartTotal();
}

function updateCartCount() {
    const cartCount = cart.length;
    document.getElementById('cart-count').textContent = cartCount;
}

function updateCartTotal() {
    let total = cart.reduce((acc, item) => acc + item.price, 0);
    document.getElementById('total-amount').textContent = total.toFixed(2);
}
