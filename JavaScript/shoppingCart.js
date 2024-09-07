// Función para añadir producto al carrito
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

// Función para actualizar el carrito
function updateCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartList = document.getElementById('cartList');
    let cartTotal = document.getElementById('cartTotal');
    
    cartList.innerHTML = '';
    let total = 0;

    fetch('data.json')
        .then(response => response.json())
        .then(products => {
            cart.forEach(productId => {
                let product = products.find(p => p.id === productId);
                if (product) {
                    cartList.innerHTML += `
                        <li>
                            ${product.name} - $${product.price}
                            <button onclick="removeFromCart('${productId}')">Eliminar</button>
                        </li>
                    `;
                    total += product.price;
                }
            });
            cartTotal.textContent = `Total: $${total}`;
        });
}

// Función para eliminar producto del carrito
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(id => id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Función para vaciar el carrito
document.getElementById('emptyCart').addEventListener('click', () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Esto eliminará todos los productos del carrito!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, vaciar carrito'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('cart');
            updateCart();
            Swal.fire(
                'Vacío',
                'El carrito ha sido vaciado.',
                'success'
            );
        }
    });
});

// Función para finalizar la compra
document.getElementById('checkout').addEventListener('click', () => {
    Swal.fire({
        title: 'Finalizar Compra',
        text: "¿Estás seguro de que quieres finalizar la compra?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, finalizar compra'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('cart');
            updateCart();
            Swal.fire(
                'Gracias',
                '¡Gracias por tu compra!',
                'success'
            );
        }
    });
});

// Actualizar carrito al iniciar
updateCart();
