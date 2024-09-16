
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Actualiza la interfaz de usuario del carrito
const updateCartUI = () => {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>El carrito está vacío</p>';
        checkoutBtn.disabled = true; // Desactivar el botón de COMPRAR
    } else {
        cartItems.innerHTML = cart.map(item => `
            <li>
                ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
                <button onclick="removeFromCart(${item.id})">Eliminar</button>
            </li>
        `).join('');
        checkoutBtn.disabled = false; // Activar el botón de COMPRAR
    }
    totalAmount.textContent = calculateTotal().toFixed(2);
};

// Añade un producto al carrito
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

// Actualiza la cantidad de un producto en el carrito
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

// Elimina un producto del carrito
const removeFromCart = (productId) => {
    const index = cart.findIndex(p => p.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    }
};

// Calcula el total del carrito
const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Vacía el carrito
const emptyCart = () => {
    localStorage.removeItem('cart');
    cart.length = 0; // Vaciar el array del carrito
    updateCartUI();
};

// Procedimiento de compra
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
                title: '¡Gracias por tu compra!',
                text: 'Tu pedido ha sido procesado exitosamente. ¿Te gustaría recibir más ofertas y noticias? Déjanos tu correo electrónico para mantenerte informado.',
                input: 'email',
                inputLabel: 'Correo Electrónico',
                inputPlaceholder: 'Tu correo electrónico',
                showCancelButton: true,
                confirmButtonText: 'Enviar',
                cancelButtonText: 'No, gracias',
                inputValidator: (value) => {
                    if (!value) {
                        return 'Por favor, ingresa tu correo electrónico';
                    } else if (!/\S+@\S+\.\S+/.test(value)) {
                        return 'Por favor, ingresa un correo electrónico válido';
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const email = result.value;
                    // Aquí podrías hacer algo con el correo, como enviarlo a un servidor
                    Swal.fire({
                        title: '¡Gracias!',
                        text: 'Tu correo electrónico ha sido registrado. Recibirás noticias y ofertas pronto.',
                        icon: 'success'
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({
                        title: '¡Gracias!',
                        text: 'Tu pedido ha sido procesado exitosamente.',
                        icon: 'success'
                    });
                }
            });
        }
    });
};

// Event listeners para botones
document.getElementById('empty-cart-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        Swal.fire({
            title: 'Carrito Vacío',
            text: 'No hay productos en el carrito para vaciar.',
            icon: 'info'
        });
    } else {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Al vaciar el carrito, todos los productos serán eliminados.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, vaciar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                emptyCart();
            }
        });
    }
});

document.getElementById('checkout-btn').addEventListener('click', checkout);

// Inicializar la interfaz del carrito al cargar
updateCartUI();
