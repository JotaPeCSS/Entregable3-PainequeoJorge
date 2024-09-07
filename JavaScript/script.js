document.addEventListener("DOMContentLoaded", () => {
    fetch('./data/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(products => {
            displayProducts(products);
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar productos',
                text: error.message,
                confirmButtonText: 'Cerrar',
                background: '#f8d7da',
                color: '#721c24'
            });
        });
});

function displayProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="./assets/${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Añadir al Carrito</button>
        `;
        productContainer.appendChild(productDiv);
    });
}
