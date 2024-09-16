// shoppingCart.js

function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const cartEmptyMessage = document.getElementById('cart-empty-message');

    if (cart.length === 0) {
        cartEmptyMessage.style.display = 'block';
        cartItems.innerHTML = '';
        cartSummary.innerHTML = '';
        return;
    }

    cartEmptyMessage.style.display = 'none';
    cartItems.innerHTML = cart.map(item => `
        <li>${item.name} x ${item.quantity} - $${item.price * item.quantity}</li>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartSummary.innerHTML = `Total: $${total}`;
}

function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    Swal.fire({
        icon: 'success',
        title: 'Producto añadido',
        text: `${product.name} ha sido añadido al carrito`
    });
}

function emptyCart() {
    localStorage.removeItem('cart');
    updateCartUI();
    Swal.fire({
        icon: 'info',
        title: 'Carrito vaciado',
        text: 'El carrito ha sido vaciado.'
    });
}

function checkout() {
    localStorage.removeItem('cart');
    updateCartUI();
    Swal.fire({
        icon: 'success',
        title: 'Compra completada',
        text: 'Gracias por su compra. Su carrito ha sido vaciado.'
    });
}

updateCartUI(); // Inicializar la interfaz del carrito al cargar la página
