// shoppingCart.js

// Carrito de compras
let cart = [];

// Límite máximo de productos permitidos en el carrito
const MAX_CART_ITEMS = 10;

// Función para añadir productos al carrito
function addToCart(productId) {
    fetch('./data/data.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);

            // Verificar si el carrito tiene el producto
            const cartItem = cart.find(item => item.id === productId);

            const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

            if (totalQuantity >= MAX_CART_ITEMS) {
                Swal.fire({
                    icon: 'error',
                    title: 'Límite alcanzado',
                    text: 'No puedes añadir más de 10 productos al carrito'
                });
            } else {
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
            }
        })
        .catch(error => console.error("Error al añadir al carrito:", error));
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
            `;

            cartElement.appendChild(cartItemElement);
        });
    }
}
