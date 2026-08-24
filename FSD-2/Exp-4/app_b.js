const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const app = express();

// In-memory user store (In real apps, use a database)
let users = [];

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'your-secret-key', // Secret key for signing session cookies
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Middleware to protect routes (authentication)
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next(); // Proceed to the next middleware or route handler
  } else {
    res.redirect('/login'); // Redirect to login if not authenticated
  }
}

// Home route (protected)
app.get('/', isAuthenticated, (req, res) => {
  res.send(`
    <h1>Welcome ${req.session.user.username}</h1>
    <a href="/logout">Logout</a>
  `);
});

// Registration route - GET to display the form
app.get('/register', (req, res) => {
  res.send(`
    <h1>Register</h1>
    <form action="/register" method="POST">
      <label for="username">Username:</label><br>
      <input type="text" id="username" name="username" required><br><br>

      <label for="password">Password:</label><br>
      <input type="password" id="password" name="password" required><br><br>

      <button type="submit">Register</button>
    </form>
  `);
});

// Registration route - POST to handle form submission
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  if (users.find(user => user.username === username)) {
    return res.send('Username already exists. <a href="/register">Try again</a>');
  }

  // Hash the password before saving it
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.send('Error registering user.');

    // Save the user (in-memory for this example)
    users.push({ username, password: hashedPassword });

    res.send('Registration successful! <a href="/login">Login</a>');
  });
});

// Login route - GET to display the login form
app.get('/login', (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form action="/login" method="POST">
      <label for="username">Username:</label><br>
      <input type="text" id="username" name="username" required><br><br>

      <label for="password">Password:</label><br>
      <input type="password" id="password" name="password" required><br><br>

      <button type="submit">Login</button>
    </form>
  `);
});

// Login route - POST to handle form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user in the "database"
  const user = users.find(user => user.username === username);

  if (!user) {
    return res.send('Invalid username or password. <a href="/login">Try again</a>');
  }

  // Compare the password with the hashed password stored in the "database"
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) return res.send('Error comparing passwords.');

    if (isMatch) {
      // Store user in session
      req.session.user = { username: user.username };
      res.redirect('/');
    } else {
      res.send('Invalid username or password. <a href="/login">Try again</a>');
    }
  });
});

// Logout route - End the session
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send('Error logging out.');
    res.redirect('/');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
