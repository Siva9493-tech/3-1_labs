// Import the URL module
const { URL } = require('url');

// Create a URL object
const myURL = new URL('https://www.example.com:8080/products/item?id=101&name=Laptop#details');

// Display different parts of the URL
console.log("Complete URL :", myURL.href);
console.log("Protocol     :", myURL.protocol);
console.log("Hostname     :", myURL.hostname);
console.log("Port         :", myURL.port);
console.log("Pathname     :", myURL.pathname);
console.log("Query String :", myURL.search);
console.log("ID           :", myURL.searchParams.get('id'));
console.log("Name         :", myURL.searchParams.get('name'));
console.log("Hash         :", myURL.hash);