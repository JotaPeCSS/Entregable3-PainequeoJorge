document.addEventListener('DOMContentLoaded', loadProducts);

function loadProducts() {
    fetch('./data/data.json')
        .then(response => response.json())
        .then(data => {
            const productContainer = document.getElementById('product-container');
            productContainer.innerHTML = '';

            data.forEach(product => {
                let colorOptions = product.colors.map(color => `<option value="${color}">${color}</option>`).join('');
                let sizeOptions = product.sizes.map(size => `<option value="${size}">${size}</option>`).join('');

                productContainer.innerHTML += `
                    <div class="product">
                        <img src="./images/${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>Precio: $${product.price.toFixed(2)}</p>
                        <select class="color-selector">${colorOptions}</select>
                        <select class="size-selector">${sizeOptions}</select>
                        <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
                    </div>
                `;
            });

            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    const color = this.previousElementSibling.previousElementSibling.value;
                    const size = this.previousElementSibling.value;
                    addToCart(productId, color, size);
                });
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

function addToCart(productId, color, size) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = { id: productId, color, size, quantity: 1 };

    const existingProductIndex = cart.findIndex(item => item.id === productId && item.color === color && item.size === size);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    Swal.fire('Producto añadido', 'El producto ha sido añadido al carrito.', 'success');
}
