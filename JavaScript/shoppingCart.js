document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const shoppingCart = document.getElementById('shopping-cart');
    const emptyCartButton = document.getElementById('empty-cart');
    const checkoutButton = document.getElementById('checkout');

    cartIcon.addEventListener('click', () => {
        shoppingCart.classList.toggle('hidden');
    });

    emptyCartButton.addEventListener('click', () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Vas a vaciar el carrito!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, vaciar'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('cart');
                updateCart(); // Actualiza el carrito después de vaciarlo
                Swal.fire(
                    'Vacío!',
                    'Tu carrito ha sido vaciado.',
                    'success'
                );
            }
        });
    });

    checkoutButton.addEventListener('click', () => {
        Swal.fire({
            title: '¡Compra realizada!',
            text: 'Gracias por tu compra.',
            icon: 'success'
        }).then(() => {
            localStorage.removeItem('cart');
            updateCart(); // Actualiza el carrito después de la compra
        });
    });

    document.addEventListener('cartUpdated', updateCart);
    updateCart();
});

function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');

    cartItems.innerHTML = '';
    let totalAmount = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span>${item.product} - ${item.color} - ${item.size}</span>
            <span>$${item.price.toFixed(2)}</span>
        `;
        cartItems.appendChild(itemElement);
        totalAmount += item.price;
    });

    totalAmountElement.textContent = totalAmount.toFixed(2);
}
