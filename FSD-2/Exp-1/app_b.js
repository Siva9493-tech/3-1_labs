const express = require("express"); 
const app = express(); 

app.use(express.json()); 

// Root route
app.get('/', (req, res) => { 
    res.send("welcome to HTTP Methods experiment"); 
}); 

// Get student data
app.get('/student', (req, res) => { 
    res.send('student data retrieved Successfully'); 
}); 

// Add student data (Alternative endpoint)
app.post('/add', (req, res) => { 
    res.send('student data added successfully'); 
}); 

// Delete student by ID
app.delete('/student/:id', (req, res) => { 
    const id = req.params.id; 
    res.send(`student with ID ${id} deleted`); 
}); 

// Submit student form
app.post('/student', (req, res) => { 
    const { name, email, message } = req.body; 
    res.send(`
        <h1>Form submitted</h1> 
        <p>Name: ${name}</p> 
        <p>Email: ${email}</p> 
        <p>Message: ${message}</p> 
        <a href='/'>Go Back</a>
    `); 
}); 

// Server configuration
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`); 
});
