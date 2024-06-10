document.getElementById('scrapeButton').addEventListener('click', async () => {
    const keyword = document.getElementById('keyword').value;
    if (!keyword) {
        alert('Please enter a keyword');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching data.');
    }
});

function displayResults(products) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; 
    if (products.length === 0) {
        resultsDiv.innerHTML = '<p>No products found</p>';
        return;
    }

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        productDiv.innerHTML = `
            <div class="product-details">
                <img src="${product.image}" alt="${product.title}">
                <div>
                    <div class="product-title">${product.title}</div>
                    <div class="product-rating">Rating: ${product.rating}</div>
                    <div class="product-reviews">Reviews: ${product.reviews}</div>
                </div>
            </div>
        `;

        resultsDiv.appendChild(productDiv);
    });
}
