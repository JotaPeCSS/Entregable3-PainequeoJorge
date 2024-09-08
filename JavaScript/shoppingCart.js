// JavaScript/shoppingCart.js

const cart = JSON.parse(localStorage.getItem('cart')) || [];

const updateCartUI = () => {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    
    if (cart.length === 0) {
        // Mostrar mensaje de carrito vacío
        emptyCartMessage.style.display = 'block';
        cartItems.innerHTML = '';
    } else {
        // Ocultar mensaje de carrito vacío
        emptyCartMessage.style.display = 'none';
        cartItems.innerHTML = cart.map(item => `
            <li>
                ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
                <button onclick="removeFromCart(${item.id})">Eliminar</button>
            </li>
        `).join('');
    }
    
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
            text: 'El carrito ya está vacío.',
            icon: 'info',
            confirmButtonText: 'OK'
        });
        return;
    }
    
    Swal.fire({
        title: 'Confirmar Vacío de Carrito',
        text: '¿Estás seguro de que deseas vaciar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, Vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('cart');
            cart.length = 0; // Vaciar el array del carrito
            updateCartUI();
        }
    });
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
            // Limpiar carrito y mostrar mensaje de agradecimiento y suscripción
            emptyCart();
            Swal.fire({
                title: 'Gracias por tu compra!',
                text: 'Tu pedido ha sido procesado exitosamente. ¿Te gustaría recibir más ofertas? Déjanos tu correo para recibir noticias.',
                icon: 'success',
                input: 'email',
                inputPlaceholder: 'Ingresa tu correo electrónico',
                confirmButtonText: 'Enviar',
                showCancelButton: true,
                cancelButtonText: 'No, gracias'
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    // Aquí puedes manejar el envío del correo electrónico
                    Swal.fire('¡Gracias!', 'Tu correo ha sido registrado para recibir más ofertas.', 'success');
                }
            });
        }
    });
};

document.getElementById('empty-cart-btn').addEventListener('click', emptyCart);
document.getElementById('checkout-btn').addEventListener('click', checkout);

// Llamar a updateCartUI para inicializar la interfaz del carrito
updateCartUI();
