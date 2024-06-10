const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');

const router = express.Router();

router.get('/', async (req, res) => {
    const keyword = req.query.keyword;
    if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required' });
    }

    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;

    try {
        console.log(`Fetching URL: ${url}`);
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });
        
        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        const productElements = document.querySelectorAll('.s-main-slot .s-result-item');
        const products = [];

        productElements.forEach((productElement, index) => {
            const titleElement = productElement.querySelector('h2 .a-text-normal');
            const ratingElement = productElement.querySelector('.a-icon-alt');
            const reviewsElement = productElement.querySelector('.s-link-style .a-size-base');
            const imageElement = productElement.querySelector('.s-image');

            const title = titleElement ? titleElement.textContent.trim() : null;
            const rating = ratingElement ? ratingElement.textContent.trim() : null;
            const reviews = reviewsElement ? reviewsElement.textContent.trim() : null;
            const image = imageElement ? imageElement.src : null;

            if (title && rating && reviews && image) {
                products.push({ title, rating, reviews, image });
            } else {
                console.log(`Skipping a product due to missing data: title=${title}, rating=${rating}, reviews=${reviews}, image=${image}`);
            }
        });

        console.log(`Found ${products.length} products`);
        res.json(products);
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
        res.status(500).json({ error: 'Failed to scrape data' });
    }
});

module.exports = router;
