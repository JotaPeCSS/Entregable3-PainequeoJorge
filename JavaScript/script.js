const url = './data/data.json';

async function loadProducts() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

function displayProducts(products) {
    const container = document.querySelector('.products-container');
    container.innerHTML = '';
    products.forEach(product => {
        container.innerHTML += `
            <div class="product">
                <img src="./images/${product.product}.png" alt="${product.product}">
                <h2>${product.product}</h2>
                <p>Color: ${product.color}</p>
                <p>Tamaño: ${product.size}</p>
                <p>Precio: $${product.price}</p>
                <button data-id="${product.id}" class="add-to-cart">Agregar al carrito</button>
            </div>
        `;
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function addToCart(event) {
    const id = event.target.getAttribute('data-id');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    fetch(url)
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === id);
            if (product) {
                const cartItem = cart.find(item => item.id === id);
                if (cartItem) {
                    cartItem.quantity += 1;
                } else {
                    cart.push({ ...product, quantity: 1 });
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                Swal.fire('¡Producto agregado!', '', 'success');
                updateCart();
            }
        })
        .catch(error => console.error('Error al agregar el producto:', error));
}

function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    cartItems.innerHTML = '';
    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <li>${item.product} (${item.color}, ${item.size}) - $${item.price} x ${item.quantity}</li>
        `;
    });

    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    document.getElementById('checkout-btn').addEventListener('click', () => {
        Swal.fire('¡Compra realizada con éxito!', '', 'success');
        localStorage.removeItem('cart');
        updateCart();
    });
});
