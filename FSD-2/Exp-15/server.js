// Import the built-in HTTP module
const http = require('http');

// Create a web server
const server = http.createServer((req, res) => {
    // Set response header
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // JavaScript code executed on the server
    let message = "Welcome to Node.js Web Server!";
    let date = new Date();

    // Send response to browser
    res.write(`
        <html>
        <head>
            <title>Node.js Server</title>
        </head>
        <body>
            <h1>${message}</h1>
            <p>Current Date and Time: ${date}</p>
        </body>
        </html>
    `);

    // End response
    res.end();
});

// Start server
server.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});