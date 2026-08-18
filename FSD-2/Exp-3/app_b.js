const express = require('express');
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Render the form page (GET request)
app.get('/', (req, res) => {
  res.send(`
    <h1>Contact Form</h1>
    <form action="/submit" method="POST">
      <label for="name">Name:</label><br>
      <input type="text" id="name" name="name" required><br><br>

      <label for="email">Email:</label><br>
      <input type="email" id="email" name="email" required><br><br>

      <label for="message">Message:</label><br>
      <textarea id="message" name="message" rows="4" cols="50" required></textarea><br><br>

      <button type="submit">Submit</button>
    </form>
  `);
});

// Handle form submission (POST request)
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;
  res.send(`
    <h1>Form Submitted</h1>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
    <a href="/">Go Back</a>
  `);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
