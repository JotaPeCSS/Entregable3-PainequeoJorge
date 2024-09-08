// JavaScript/shoppingCart.js

const cart = JSON.parse(localStorage.getItem('cart')) || [];

const updateCartUI = () => {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    cartItems.innerHTML = cart.map(item => `
        <li>
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
            <button onclick="updateQuantity(${item.id}, -1)">-</button>
            <button onclick="updateQuantity(${item.id}, 1)">+</button>
            <button onclick="removeFromCart(${item.id})">Eliminar</button>
        </li>
    `).join('');
    totalAmount.textContent = calculateTotal().toFixed(2);
};

const addToCart = (productId) => {
    fetch('./data/data.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            const existingProduct = cart.find(p => p.id === productId);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        })
        .catch(error => console.error('Error al añadir producto al carrito:', error));
};

const updateQuantity = (productId, delta) => {
    const product = cart.find(p => p.id === productId);
    if (product) {
        product.quantity += delta;
        if (product.quantity <= 0) {
            cart.splice(cart.indexOf(product), 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    }
};

const removeFromCart = (productId) => {
    const index = cart.findIndex(p => p.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    }
};

const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const emptyCart = () => {
    if (cart.length === 0) {
        Swal.fire({
            title: 'Carrito Vacío',
            text: 'No hay productos en el carrito para vaciar.',
            icon: 'info',
            confirmButtonText: 'OK'
        });
    } else {
        localStorage.removeItem('cart');
        cart.length = 0; // Vaciar el array del carrito
        updateCartUI();
    }
};

const checkout = () => {
    const total = calculateTotal();
    Swal.fire({
        title: 'Confirmar Compra',
        text: `El total de su compra es $${total.toFixed(2)}. ¿Desea continuar con la compra?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, Comprar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Limpiar carrito y mostrar mensaje de agradecimiento
            emptyCart();
            Swal.fire({
                title: 'Gracias por tu compra!',
                text: 'Tu pedido ha sido procesado exitosamente.',
                icon: 'success'
            });
        }
    });
};

document.getElementById('empty-cart-btn').addEventListener('click', emptyCart);
document.getElementById('checkout-btn').addEventListener('click', checkout);

updateCartUI();
