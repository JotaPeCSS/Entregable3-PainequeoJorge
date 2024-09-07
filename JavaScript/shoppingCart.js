// JavaScript/shoppingCart.js

// Función para agregar un producto al carrito
const addToCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = fetchProductById(productId);

    if (product) {
        const existingProductIndex = cart.findIndex(item => item.id === productId);
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        Swal.fire({
            title: 'Producto agregado',
            text: `${product.name} ha sido añadido al carrito.`,
            icon: 'success'
        });
    } else {
        Swal.fire({
            title: 'Error',
            text: 'No se pudo agregar el producto al carrito.',
            icon: 'error'
        });
    }
};

// Función para mostrar los productos en el carrito
const displayCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartAside = document.getElementById('cart');

    if (cart.length === 0) {
        cartAside.style.display = 'none';
    } else {
        cartAside.style.display = 'block';
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="assets/${item.image}" alt="${item.name}" />
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
                <button onclick="increaseQuantity(${item.id})">+</button>
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <button onclick="removeFromCart(${item.id})">Eliminar</button>
            </div>
        `).join('');
    }
};

// Función para aumentar la cantidad de un producto en el carrito
const increaseQuantity = (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex > -1) {
        cart[productIndex].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
};

// Función para disminuir la cantidad de un producto en el carrito
const decreaseQuantity = (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex > -1) {
        if (cart[productIndex].quantity > 1) {
            cart[productIndex].quantity -= 1;
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            cart.splice(productIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        displayCart();
    }
};

// Función para eliminar un producto del carrito
const removeFromCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    displayCart();
};

// Función para vaciar el carrito
const emptyCart = () => {
    localStorage.removeItem('cart');
    displayCart();
    Swal.fire({
        title: 'Carrito vacío',
        text: 'El carrito ha sido vaciado.',
        icon: 'info'
    });
};

// Función para finalizar la compra
const checkout = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    Swal.fire({
        title: 'Confirmar Compra',
        text: `El total de su compra es $${totalAmount.toFixed(2)}. ¿Desea proceder con la compra?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Comprar',
        cancelButtonText: 'Cancelar'
    }).then(result => {
        if (result.isConfirmed) {
            localStorage.removeItem('cart');
            displayCart();
            Swal.fire({
                title: 'Gracias por su compra',
                text: 'Su compra ha sido procesada.',
                icon: 'success'
            });
        }
    });
};

// Función auxiliar para obtener un producto por ID
const fetchProductById = async (productId) => {
    try {
        const response = await fetch('./data/products.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        return products.find(product => product.id === productId);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        return null;
    }
};

// Event listeners para los botones
document.getElementById('empty-cart-btn').addEventListener('click', emptyCart);
document.getElementById('checkout-btn').addEventListener('click', checkout);
document.getElementById('view-cart-btn').addEventListener('click', () => {
    const cartAside = document.getElementById('cart');
    cartAside.style.display = cartAside.style.display === 'none' ? 'block' : 'none';
});
