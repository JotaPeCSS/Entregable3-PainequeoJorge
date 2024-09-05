document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    document.getElementById('empty-cart').addEventListener('click', emptyCart);
    document.getElementById('pay').addEventListener('click', pay);
});

function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    let total = 0;

    cartItemsContainer.innerHTML = cart.map(item => {
        const product = findProductById(item.id);
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <p>${product.name} - Color: ${item.color} - Tamaño: ${item.size}</p>
                <p>Cantidad: ${item.quantity} - Total: $${itemTotal.toFixed(2)}</p>
                <button class="gray-button" onclick="changeQuantity('${item.id}', '${item.color}', '${item.size}', -1)">-</button>
                <button class="gray-button" onclick="changeQuantity('${item.id}', '${item.color}', '${item.size}', 1)">+</button>
            </div>
        `;
    }).join('');

    document.getElementById('cart-total').innerText = `Total: $${total.toFixed(2)}`;
}

function findProductById(id) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    return products.find(product => product.id === id);
}

function changeQuantity(productId, color, size, delta) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId && item.color === color && item.size === size);
    
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            const index = cart.indexOf(item);
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

function emptyCart() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esto vaciará tu carrito de compras.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('cart');
            updateCart();
            Swal.fire(
                'Vacío',
                'Tu carrito ha sido vaciado.',
                'success'
            );
        }
    });
}

function pay() {
    Swal.fire({
        title: 'Gracias por tu compra',
        text: 'Tu compra ha sido realizada con éxito.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        localStorage.removeItem('cart');
        updateCart();
    });
}
