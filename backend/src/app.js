const express = require('express');
const cors = require('cors'); 
const scrapeRouter = require('./routes/scrape');

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors()); 

app.use('/api/scrape', scrapeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
