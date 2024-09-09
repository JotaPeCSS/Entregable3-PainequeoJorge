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
            text: 'Este producto ya está en el carrito con el mismo color.',
            icon: 'info',
            confirmButtonColor: '#4CAF50'
        });
        return;
    }

    cartItems.push({ id: productId, name: productName, price: productPrice, color: productColor });
    localStorage.setItem('cart', JSON.stringify(cartItems));

    Swal.fire({
        title: 'Añadido al carrito',
        text: `El producto ${productName} ha sido añadido al carrito.`,
        icon: 'success',
        confirmButtonColor: '#4CAF50'
    });

    renderCart();
}

// Función para vaciar el carrito
function emptyCart() {
    Swal.fire({
        title: 'Vaciar Carrito',
        text: '¿Estás seguro de que quieres vaciar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4CAF50',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then(result => {
        if (result.isConfirmed) {
            localStorage.removeItem('cart');
            renderCart();
            Swal.fire({
                title: 'Carrito Vacío',
                text: 'El carrito ha sido vaciado.',
                icon: 'success',
                confirmButtonColor: '#4CAF50'
            });
        }
    });
}

// Función para finalizar la compra
function checkout() {
    Swal.fire({
        title: 'Finalizar Compra',
        text: '¿Estás seguro de que quieres finalizar la compra?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4CAF50',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, comprar',
        cancelButtonText: 'Cancelar'
    }).then(result => {
        if (result.isConfirmed) {
            localStorage.removeItem('cart');
            renderCart();
            Swal.fire({
                title: 'Compra Realizada',
                text: 'Gracias por tu compra.',
                icon: 'success',
                confirmButtonColor: '#4CAF50'
            });
        }
    });
}

// Inicializar los eventos
document.getElementById('empty-cart-btn').addEventListener('click', emptyCart);
document.getElementById('checkout-btn').addEventListener('click', checkout);

// Cargar el carrito al iniciar
window.onload = renderCart;
