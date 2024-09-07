// Cargar productos desde el archivo JSON
document.addEventListener('DOMContentLoaded', () => {
    fetch('data/data.json')
        .then(response => response.json())
        .then(products => {
            if (Array.isArray(products) && products.length) {
                const productList = document.getElementById('productList');
                products.forEach(product => {
                    productList.innerHTML += `
                        <div class="product">
                            <img src="assets/${product.image}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p>$${product.price}</p>
                            <button onclick="addToCart('${product.id}')">Añadir al Carrito</button>
                        </div>
                    `;
                });
            } else {
                document.getElementById('productList').innerHTML = '<p>No hay productos disponibles.</p>';
            }
        })
        .catch(error => {
            console.error('Error cargando los productos:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar los productos.',
            });
        });
});
