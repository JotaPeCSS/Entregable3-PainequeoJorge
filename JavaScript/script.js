document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product');
            const productId = productElement.getAttribute('data-id');
            const productPrice = parseFloat(productElement.getAttribute('data-price'));
            const productColor = productElement.querySelector('.product-color').value;
            const productSize = productElement.querySelector('.product-size').value;
            const productName = productElement.querySelector('h3').textContent;

            const cartItem = {
                id: productId,
                product: productName,
                color: productColor,
                size: productSize,
                price: productPrice
            };

            addToCart(cartItem);
        });
    });
});

function addToCart(item) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    const event = new Event('cartUpdated');
    document.dispatchEvent(event);
}
