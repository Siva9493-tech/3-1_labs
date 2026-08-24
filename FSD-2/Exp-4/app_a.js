const express = require('express');
const session = require('express-session');
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Use express-session for session management
app.use(session({
  secret: 'your-secret-key', // Secret key to sign the session ID cookie
  resave: false,             // Don't resave session if it's not modified
  saveUninitialized: true,   // Save uninitialized sessions
  cookie: { secure: false }  // For development, set secure: false. In production, use true with HTTPS.
}));

// Home route - Shows a welcome message
app.get('/', (req, res) => {
  // Check if the session is active
  if (req.session.user) {
    return res.send(`
      <h1>Welcome back, ${req.session.user.name}!</h1>
      <a href="/logout">Logout</a>
    `);
  }

  res.send(`
    <h1>Home Page</h1>
    <a href="/login">Login</a>
  `);
});

// Login route - Render login form
app.get('/login', (req, res) => {
  res.send(`
    <h1>Login Page</h1>
    <form action="/login" method="POST">
      <label for="username">Username:</label><br>
      <input type="text" id="username" name="username" required><br><br>

      <label for="password">Password:</label><br>
      <input type="password" id="password" name="password" required><br><br>

      <button type="submit">Login</button>
    </form>
  `);
});

// Login POST route - Handle user login and store session
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // For simplicity, we simulate authentication with a hardcoded check
  if (username === 'user' && password === 'password') {
    // Store user data in session
    req.session.user = { name: username };

    // Redirect to home page after successful login
    return res.redirect('/');
  }

  res.send('Invalid credentials. <a href="/login">Try again</a>');
});

// Logout route - Clear the session and redirect to home
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error logging out.');
    }
    res.redirect('/');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});