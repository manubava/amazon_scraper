const axios = require('axios');
const { JSDOM } = require('jsdom');

async function scrapeAmazon(keyword) {
  try {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
    console.log(`Fetching URL: ${url}`);
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    const products = [];
    const productElements = document.querySelectorAll('.s-main-slot .s-result-item');

    console.log(`Found ${productElements.length} products`);

    productElements.forEach(product => {
      try {
        const titleElement = product.querySelector('.a-size-medium.a-color-base.a-text-normal');
        const ratingElement = product.querySelector('.a-icon-alt');
        const reviewsElement = product.querySelector('span[aria-label*="classificações"] .a-size-base');
        const imageElement = product.querySelector('.s-image');

        const title = titleElement ? titleElement.textContent : null;
        const rating = ratingElement ? ratingElement.textContent : null;
        const reviews = reviewsElement ? reviewsElement.textContent : null;
        const image = imageElement ? imageElement.src : null;

        if (title && rating && reviews && image) {
          products.push({
            title,
            rating: rating.split(' ')[0], 
            reviews: parseInt(reviews.replace(/,/g, '').replace(/\./g, ''), 10), 
            image
          });
        } else {
          console.log(`Skipping a product due to missing data: title=${title}, rating=${rating}, reviews=${reviews}, image=${image}`);
        }
      } catch (error) {
        console.error('Error processing a product element', error);
      }
    });

    return products;
  } catch (error) {
    console.error('Error fetching and parsing data from Amazon', error);
    throw new Error('Failed to scrape data');
  }
}

module.exports = { scrapeAmazon };
