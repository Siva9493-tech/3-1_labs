// Step 1: Import Express module
const express = require('express');
const app = express();

// Step 2: Define a basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Express.js Example!');
});

// Step 3: Handle route parameters (e.g., dynamic URL)
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;  // Accessing the dynamic parameter
  res.send(`User ID is: ${userId}`);
});

// Step 4: Handle query parameters
app.get('/search', (req, res) => {
  const query = req.query.query;  // Accessing the query parameter
  res.send(`Searching for: ${query}`);
});

// Step 5: URL building (this is typically done in the frontend or inside your route handler)
app.get('/product/:category', (req, res) => {
  const category = req.params.category;  // Extract category parameter
  const page = req.query.page || 1;  // Optional query parameter (e.g., for pagination)
  
  // Example of URL building for a product category
  const url = `/product/${category}?page=${page}`;
  
  res.send(`Displaying products from the ${category} category. Viewing page ${page}. URL: ${url}`);
});

// Step 6: Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});