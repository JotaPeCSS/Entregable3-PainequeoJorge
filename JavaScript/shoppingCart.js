// shoppingCart.js

let cart = [];

// Función para añadir productos al carrito
function addToCart(productId) {
    fetch('../data/data.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            const cartItem = cart.find(item => item.id === productId);

            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            Swal.fire({
                icon: 'success',
                title: 'Producto agregado',
                text: `Has añadido ${product.name} al carrito`,
                timer: 1500,
                showConfirmButton: false
            });

            updateCartDisplay();
        })
        .catch(error => console.error("Error al añadir al carrito:", error));
}

// Función para restar productos del carrito
function removeFromCart(productId) {
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
        } else {
            cart = cart.filter(item => item.id !== productId);
        }
        updateCartDisplay();
    }
}

// Función para mostrar el contenido del carrito
function updateCartDisplay() {
    const cartElement = document.getElementById('shopping-cart');
    cartElement.innerHTML = '';

    if (cart.length === 0) {
        cartElement.innerHTML = '<p>El carrito está vacío</p>';
    } else {
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');

            cartItemElement.innerHTML = `
                <p>${item.name} x ${item.quantity}</p>
                <p>Total: $${item.price * item.quantity}</p>
                <button onclick="addToCart(${item.id})">+</button>
                <button onclick="removeFromCart(${item.id})">-</button>
            `;

            cartElement.appendChild(cartItemElement);
        });
    }
}

// Función para vaciar el carrito
function clearCart() {
    cart = [];
    updateCartDisplay();
}

// Función para simular la compra
function buyProducts() {
    if (cart.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Carrito vacío',
            text: 'No hay productos en el carrito para comprar'
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Compra realizada',
            text: 'Tu compra ha sido procesada con éxito',
            timer: 1500,
            showConfirmButton: false
        });
        clearCart();
    }
}

// Event listeners para los botones de comprar y vaciar carrito
document.getElementById('buy-btn').addEventListener('click', buyProducts);
document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
