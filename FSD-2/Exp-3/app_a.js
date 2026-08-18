const express = require('express');
const app = express();
const path = require('path');

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the directory where views (templates) are stored
app.set('views', path.join(__dirname, 'views_a'));

// Example route to render a page
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home Page',
    message: 'Welcome to Express with EJS templating!'
  });
});

// Another route
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    message: 'This is the About page of the app.'
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});