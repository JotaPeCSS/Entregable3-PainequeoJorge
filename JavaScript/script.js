// Función para cargar los productos desde el archivo JSON
function loadProducts() {
    fetch('data/data.json')  // Ruta correcta del archivo JSON
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('productList');
            productList.innerHTML = '';

            products.forEach(product => {
                productList.innerHTML += `
                    <div class="product">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>Precio: $${product.price}</p>
                        <button onclick="addToCart('${product.id}')">Añadir al Carrito</button>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('Error cargando los productos:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar los productos.',
            });
        });
}

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
    updateCart();
}

// Función para actualizar el carrito
function updateCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartList = document.getElementById('cartList');
    let cartTotal = document.getElementById('cartTotal');
    
    cartList.innerHTML = '';
    let total = 0;

    fetch('data/data.json')  // Ruta correcta del archivo JSON
        .then(response => response.json())
        .then(products => {
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
        });
}

// Función para eliminar producto del carrito
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let updatedCart = cart.filter(item => item.id !== productId);
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
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
            updateCart();
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

// Llamar a la función para cargar productos al iniciar
loadProducts();
