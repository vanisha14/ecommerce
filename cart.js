document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    const clearCartButton = document.getElementById('clear-cart');
    const backToProductsButton = document.getElementById('back-to-products');

    function displayCart() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';
        let totalAmount = 0;

        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - Quantity: ${item.quantity} - Price: $${item.price * item.quantity}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => removeFromCart(item.id));
            li.appendChild(removeButton);
            cartItemsContainer.appendChild(li);

            totalAmount += item.price * item.quantity;
        });

        totalAmountElement.textContent = `Total Amount: $${totalAmount.toFixed(2)}`;
    }

    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = cart.findIndex(item => item.id === productId);

        if (productIndex >= 0) {
            if (cart[productIndex].quantity > 1) {
                cart[productIndex].quantity -= 1;
            } else {
                cart.splice(productIndex, 1);
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    function clearCart() {
        localStorage.removeItem('cart');
        displayCart();
    }

    clearCartButton.addEventListener('click', clearCart);
    backToProductsButton.addEventListener('click', () => window.location.href = 'index.html');

    displayCart();
});