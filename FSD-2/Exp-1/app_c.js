const express = require('express');
const app = express();

app.use((req, res, next) => {
    // Fixed string interpolation backticks
    console.log(`${req.method} request made to: ${req.url}`);
    next();
});

// COMMENT THIS BLOCK OUT TO TEST IN CHROME:
/*
app.use((req, res, next) => {
    if(!req.headers['x-auth-token']){
        return res.status(403).send('Forbidden: NO auth token provided.');
    }
    next();
});
*/

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/about', (req, res) => {
    res.send('About page-Middleware is working!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');      
});
