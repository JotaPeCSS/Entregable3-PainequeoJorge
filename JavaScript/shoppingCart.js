// shoppingCart.js

// Función para añadir producto al carrito
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProductIndex = cart.findIndex(item => item.id === productId);

    // Verifica el total de productos en el carrito
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (totalQuantity >= 10) {
        Swal.fire({
            icon: 'warning',
            title: '¡Límite Alcanzado!',
            text: 'No puedes añadir más de 10 productos en total.',
        });
        return;
    }

    if (existingProductIndex > -1) {
        // Si el producto ya está en el carrito, incrementamos la cantidad
        if (cart[existingProductIndex].quantity < 10) {
            cart[existingProductIndex].quantity += 1;
        } else {
            Swal.fire({
                icon: 'warning',
                title: '¡Límite Alcanzado para este Producto!',
                text: 'No puedes añadir más de 10 unidades del mismo producto.',
            });
            return;
        }
    } else {
        // Si el producto no está en el carrito, lo añadimos con cantidad 1
        cart.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();  // Actualiza el carrito después de añadir el producto
}

// Función para actualizar el carrito
function updateCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartList = document.getElementById('cartList');
    let cartTotal = document.getElementById('cartTotal');
    
    cartList.innerHTML = '';
    let total = 0;

    fetch('./data/data.json')
        .then(response => response.json())
        .then(products => {
            if (Array.isArray(products) && products.length) {
                cart.forEach(cartItem => {
                    let product = products.find(p => p.id === cartItem.id);
                    if (product) {
                        cartList.innerHTML += `
                            <li>
                                ${product.name} - $${product.price} x ${cartItem.quantity}
                                <button onclick="removeFromCart('${cartItem.id}')">Eliminar</button>
                            </li>
                        `;
                        total += product.price * cartItem.quantity;
                    }
                });
                cartTotal.textContent = `Total: $${total}`;
            } else {
                cartList.innerHTML = '<li>No hay productos en el carrito.</li>';
            }
        })
        .catch(error => {
            console.error('Error actualizando el carrito:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el carrito.',
            });
        });
}

// Función para eliminar producto del carrito
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let updatedCart = cart.filter(item => item.id !== productId);
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCart();  // Actualiza el carrito después de eliminar el producto
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
            updateCart();  // Actualiza el carrito después de vaciarlo
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
        title: '¿Estás seguro?',
        text: "¿Deseas finalizar la compra?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, finalizar compra'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('cart');
            updateCart();  // Actualiza el carrito después de finalizar la compra
            Swal.fire(
                'Gracias',
                'Tu compra ha sido finalizada.',
                'success'
            );
        }
    });
}

// Actualiza el carrito al cargar la página
updateCart();
