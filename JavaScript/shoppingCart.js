let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity}
            <button onclick="removeFromCart(${item.id})">Eliminar</button>
            <button onclick="changeQuantity(${item.id}, 1)">+1</button>
            <button onclick="changeQuantity(${item.id}, -1)">-1</button>
        `;
        cartItems.appendChild(listItem);
    });

    localStorage.setItem('cart', JSON.stringify(cart));

    if (cart.length > 0) {
        document.getElementById('empty-cart').style.display = 'inline';
        document.getElementById('checkout').style.display = 'inline';
    } else {
        document.getElementById('empty-cart').style.display = 'none';
        document.getElementById('checkout').style.display = 'none';
    }
}

function addToCart(productId) {
    fetch('./data/data.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (cart.reduce((acc, item) => acc + item.quantity, 0) >= 10) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Límite de productos alcanzado',
                    text: 'No puedes añadir más de 10 productos en total.',
                    confirmButtonText: 'Cerrar',
                    background: '#fff3cd',
                    color: '#856404'
                });
                return;
            }

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            updateCart();
        })
        .catch(error => {
            console.error("Error al añadir el producto al carrito:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error al añadir al carrito',
                text: error.message,
                confirmButtonText: 'Cerrar',
                background: '#f8d7da',
                color: '#721c24'
            });
        });
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function changeQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += delta;

        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

document.getElementById('empty-cart').addEventListener('click', () => {
    Swal.fire({
        icon: 'warning',
        title: 'Carrito Vacío',
        text: '¿Estás seguro de que deseas vaciar el carrito?',
        showCancelButton: true,
        confirmButtonText: 'Vaciar',
        cancelButtonText: 'Cancelar',
        background: '#fff3cd',
        color: '#856404'
    }).then(result => {
        if (result.isConfirmed) {
            cart = [];
            updateCart();
            Swal.fire({
                icon: 'success',
                title: 'Carrito Vacío',
                text: 'El carrito ha sido vaciado.',
                confirmButtonText: 'Cerrar',
                background: '#d4edda',
                color: '#155724'
            });
        }
    });
});

document.getElementById('checkout').addEventListener('click', () => {
    Swal.fire({
        icon: 'success',
        title: 'Compra realizada',
        text: 'Gracias por tu compra. El carrito se ha vaciado.',
        confirmButtonText: 'Cerrar',
        background: '#d4edda',
        color: '#155724'
    }).then(() => {
        cart = [];
        updateCart();
    });
});

updateCart();
