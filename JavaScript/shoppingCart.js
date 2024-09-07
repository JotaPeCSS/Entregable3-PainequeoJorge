// Función para añadir producto al carrito
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Función para actualizar el carrito
function updateCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartList = document.getElementById('cartList');
    let cartTotal = document.getElementById('cartTotal');
    
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach(productId => {
        // Aquí asumimos que tienes una función para obtener el producto por ID
        fetch('data.json')
            .then(response => response.json())
            .then(products => {
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
    });

    cartTotal.textContent = `Total: $${total}`;
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
    localStorage.removeItem('cart');
    updateCart();
});

// Función para finalizar la compra
document.getElementById('checkout').addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres finalizar la compra?')) {
        localStorage.removeItem('cart');
        updateCart();
        alert('Gracias por tu compra!');
    }
});

// Actualizar carrito al iniciar
updateCart();
