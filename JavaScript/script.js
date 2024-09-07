document.addEventListener('DOMContentLoaded', () => {
    fetch('./data/data.json')
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        })
        .catch(error => console.error('Error cargando productos:', error));
});

function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(product => {
        productList.innerHTML += `
            <li>
                <img src="./assets/${product.image}" alt="${product.name}" width="100">
                <div>
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button onclick="addToCart('${product.id}')">Agregar al Carrito</button>
                </div>
            </li>
        `;
    });
}
