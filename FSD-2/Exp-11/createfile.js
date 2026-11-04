// Import the File System module
const fs = require('fs');

// Content to be written into the file
const content = `HTML
CSS
Javascript
Typescript
MongoDB
Express.js
React.js
Node.js`;

// Create src.txt and write data
fs.writeFile('src.txt', content, (err) => {
    if (err) {
        console.log("Error creating file:", err);
    } else {
        console.log("src.txt created successfully.");
    }
});