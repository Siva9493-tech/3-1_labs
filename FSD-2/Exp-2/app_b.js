const express = require("express");
const app = express();

// Middleware to parse URL-encoded form submissions
app.use(express.urlencoded({ extended: true }));

// GET route to serve the Contact Form
app.get('/', (req, res) => {
    // Fixed: Changed single quotes to backticks for multi-line HTML string
    res.send(`
        <h1>Contact Form</h1>
        <form action="/submit" method="POST">
            <label>Name:</label>
            <input type="text" name="name" required><br><br>
            
            <!-- Fixed: Changed label text, input type to email, and name attribute to email -->
            <label>Email:</label>
            <input type="email" name="email" required><br><br>
            
            <label>Message:</label>
            <textarea name="message" required></textarea><br><br>
            
            <button type="submit">Submit</button>
        </form>
    `);
});

// POST route to handle form submission
// Fixed: Added missing forward slash '/' before submit
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    
    // Fixed: Changed double quotes to backticks and fixed missing $ symbol on message variable
    res.send(`
        <h1>Form submitted</h1>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
        <a href="/">Go Back</a>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    // Fixed: Changed double quotes to backticks for string interpolation
    console.log(`Server is running on http://localhost:${PORT}`);
});
