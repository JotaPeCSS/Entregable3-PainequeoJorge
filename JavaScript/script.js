// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Función para cargar productos desde el archivo JSON
    function loadProducts() {
        fetch('./data/data.json')
            .then(response => response.json())
            .then(data => {
                const productsContainer = document.getElementById('products-container');
                productsContainer.innerHTML = ''; // Limpia el contenido actual

                data.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.className = 'product';
                    productElement.innerHTML = `
                        <img src="./images/${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>$${product.price}</p>
                        <label for="size-${product.id}">Tamaño:</label>
                        <select id="size-${product.id}">
                            ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                        </select>
                        <label for="color-${product.id}">Color:</label>
                        <select id="color-${product.id}">
                            ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
                        </select>
                        <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
                    `;
                    productsContainer.appendChild(productElement);
                });

                // Evento para añadir productos al carrito
                document.querySelectorAll('.add-to-cart').forEach(button => {
                    button.addEventListener('click', (event) => {
                        const productId = event.target.dataset.id;
                        const product = data.find(p => p.id === productId);
                        const size = document.getElementById(`size-${productId}`).value;
                        const color = document.getElementById(`color-${productId}`).value;

                        const cart = JSON.parse(localStorage.getItem('cart')) || [];
                        const existingItem = cart.find(item => item.id === productId && item.size === size && item.color === color);

                        if (existingItem) {
                            existingItem.quantity += 1;
                        } else {
                            cart.push({
                                id: productId,
                                name: product.name,
                                price: product.price,
                                size: size,
                                color: color,
                                quantity: 1
                            });
                        }

                        localStorage.setItem('cart', JSON.stringify(cart));

                        // Mostrar SweetAlert2
                        Swal.fire({
                            title: 'Producto añadido al carrito',
                            text: `${product.name} (${size}, ${color}) ha sido añadido al carrito.`,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });

                        // Desplegar el carrito
                        document.getElementById('cart').style.display = 'block';
                        // Actualizar el carrito
                        document.dispatchEvent(new Event('DOMContentLoaded'));
                    });
                });
            })
            .catch(error => {
                console.error('Error al cargar los productos:', error);
            });
    }

    loadProducts();
});
