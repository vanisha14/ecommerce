document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'), 10);
    
    if (isNaN(productId)) {
        document.getElementById('product-container').textContent = 'Invalid product ID!';
        return;
    }

    fetch('product.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            if (product) {
                document.getElementById('product-name').textContent = product.name;
                document.getElementById('product-image').src = product.image;
                document.getElementById('product-image').alt = product.name;
                document.getElementById('product-description').textContent = product.description;
                document.getElementById('product-price').textContent = `Price: $${product.price}`;

                document.getElementById('add-to-cart').addEventListener('click', function() {
                    addToCart(product);
                });

                displayCart();
            } else {
                document.getElementById('product-container').textContent = 'Product not found!';
            }
        })
        .catch(error => console.error('Error fetching product details:', error));

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(p => p.id === product.id);

        if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    function displayCart() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const cartList = document.getElementById('cart-items');
        cartList.innerHTML = '';

        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - Quantity: ${item.quantity} - Price: $${item.price * item.quantity}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => removeFromCart(item.id));
            li.appendChild(removeButton);
            cartList.appendChild(li);
        });

        const clearCartButton = document.getElementById('clear-cart');
        clearCartButton.addEventListener('click', clearCart);
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
});