// script.js

document.addEventListener('DOMContentLoaded', () => {
    fetch('data/data.json')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        })
        .catch(error => console.error('Error loading the products:', error));
});

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear existing products

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Precio: $${product.price}</p>
            <div class="product-colors">
                ${product.colors.map(color => `
                    <span class="color-${color}" data-color="${color}" onclick="selectColor(this)"></span>
                `).join('')}
            </div>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Agregar al Carrito</button>
        `;
        productList.appendChild(productElement);
    });
}

function selectColor(element) {
    const selectedColor = element.getAttribute('data-color');
    const colorElements = document.querySelectorAll('.product-colors span');
    colorElements.forEach(span => span.classList.remove('selected'));
    element.classList.add('selected');
}

function addToCart(id, name, price) {
    const selectedColor = document.querySelector('.product-colors span.selected')?.getAttribute('data-color') || 'default';
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ id, name, price, color: selectedColor });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';

    if (cartItems.length === 0) {
        document.getElementById('cart-empty-message').style.display = 'block';
        return;
    }

    document.getElementById('cart-empty-message').style.display = 'none';

    let total = 0;
    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.name} - $${item.price} - Color: ${item.color}
            <button onclick="removeFromCart(${item.id})">Eliminar</button>
        `;
        cartList.appendChild(listItem);
        total += item.price;
    });

    document.getElementById('cart-summary').innerHTML = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(id) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCart();
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    Swal.fire({
        title: 'Confirmación de Compra',
        text: "¿Estás seguro de que quieres finalizar la compra?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4CAF50',
        cancelButtonColor: '#f44336',
        confirmButtonText: 'Sí, finalizar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('cart');
            updateCart();
            Swal.fire({
                title: 'Compra realizada',
                text: 'Gracias por tu compra',
                icon: 'success',
                confirmButtonColor: '#4CAF50'
            });
        }
    });
});

document.getElementById('empty-cart-btn').addEventListener('click', () => {
    Swal.fire({
        title: 'Vaciar Carrito',
        text: "¿Estás seguro de que quieres vaciar el carrito?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f44336',
        cancelButtonColor: '#4CAF50',
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('cart');
            updateCart();
            Swal.fire({
                title: 'Carrito vacío',
                text: 'Tu carrito ha sido vaciado',
                icon: 'info',
                confirmButtonColor: '#4CAF50'
            });
        }
    });
});
