// Import the HTTP module
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Set response header
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Send data to the client
    res.write("Hello! Data is transferred successfully using HTTP protocol.");

    // End the response
    res.end();
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});