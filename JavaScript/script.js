// script.js

async function fetchProducts() {
    try {
        const response = await fetch('data/data.json');
        if (!response.ok) throw new Error('Error al cargar los productos');
        
        const data = await response.json();
        displayProducts(data);
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al cargar los productos. Intenta nuevamente más tarde.'
        });
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productHTML = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.price} USD</p>
                <div class="color-options">
                    ${product.colors.map(color => `<span class="color-option" style="background-color: ${color};"></span>`).join('')}
                </div>
                <button onclick='addToCart(${JSON.stringify(product)})'>Añadir al Carrito</button>
            </div>
        `;
        productList.innerHTML += productHTML;
    });
}

fetchProducts();
