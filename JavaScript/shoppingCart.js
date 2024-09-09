// shoppingCart.js

// Función para renderizar el carrito
function renderCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.getElementById('cart-items');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const cartSummary = document.getElementById('cart-summary');

    cartItemsList.innerHTML = '';
    if (cartItems.length === 0) {
        cartEmptyMessage.style.display = 'block';
        cartSummary.textContent = '';
        return;
    }

    cartEmptyMessage.style.display = 'none';

    let total = 0;
    cartItems.forEach(item => {
        const itemLi = document.createElement('li');
        itemLi.textContent = `${item.name} - $${item.price} (${item.color})`;
        cartItemsList.appendChild(itemLi);
        total += item.price;
    });

    cartSummary.textContent = `Total: $${total.toFixed(2)}`;
}

// Función para añadir productos al carrito
function addToCart(productId, productName, productPrice, productColor) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verificar si el producto ya está en el carrito con el mismo color
    const existingItemIndex = cartItems.findIndex(item => item.id === productId && item.color === productColor);
    
    if (existingItemIndex !== -1) {
        Swal.fire({
            title: 'Producto ya en el carrito',
            text: `El producto ${productName} con color ${productColor} ya está en el carrito.`,
            icon: 'info',
            confirmButtonText: 'Ok'
        });
        return;
    }

    cartItems.push({ id: productId, name: productName, price: productPrice, color: productColor });
    localStorage.setItem('cart', JSON.stringify(cartItems));

    Swal.fire({
        title: 'Añadido al Carrito',
        text: `${productName} (${productColor}) ha sido añadido al carrito.`,
        icon: 'success',
        confirmButtonText: 'Ok'
    });

    renderCart();
}

// Función para vaciar el carrito
function emptyCart() {
    localStorage.removeItem('cart');
    renderCart();
    Swal.fire({
        title: 'Carrito Vacío',
        text: 'El carrito ha sido vaciado.',
        icon: 'info',
        confirmButtonText: 'Ok'
    });
}

// Función para finalizar compra
function checkout() {
    Swal.fire({
        title: 'Finalizar Compra',
        text: '¿Estás seguro de que quieres finalizar la compra?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, finalizar',
        cancelButtonText: 'Cancelar'
    }).then(result => {
        if (result.isConfirmed) {
            localStorage.removeItem('cart');
            renderCart();
            Swal.fire({
                title: 'Compra Finalizada',
                text: 'Gracias por tu compra.',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        }
    });
}

// Event listeners
document.getElementById('empty-cart-btn').addEventListener('click', emptyCart);
document.getElementById('checkout-btn').addEventListener('click', checkout);

// Renderizar carrito al cargar la página
window.onload = renderCart;
