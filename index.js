document.addEventListener("DOMContentLoaded", function() {
    let products = [];
    let currentIndex = 0;
    const itemsPerPage = 4;

    const container = document.getElementById('container');
    const loadMoreButton = document.getElementById('load-more');

    fetch('product.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            loadMoreProducts();
        })
        .catch(error => console.error('Error fetching products:', error));

    function loadMoreProducts() {
        const endIndex = Math.min(currentIndex + itemsPerPage, products.length);
        for (let i = currentIndex; i < endIndex; i++) {
            const product = products[i];
            const productDiv = document.createElement('div');
            productDiv.className = 'product-item';

            const productName = document.createElement('h2');
            productName.textContent = product.name;
            productDiv.appendChild(productName);

            const productImage = document.createElement('img');
            productImage.src = product.image;
            productImage.alt = product.name;
            productImage.width = 200;
            productImage.style.cursor = 'pointer';
            productImage.addEventListener('click', () => {
                window.location.href = `product-detail.html?id=${product.id}`;
            });
            productDiv.appendChild(productImage);

            container.appendChild(productDiv);
        }

        currentIndex = endIndex;
        loadMoreButton.style.display = (currentIndex < products.length) ? 'block' : 'none';
    }

    loadMoreButton.addEventListener('click', loadMoreProducts);
});