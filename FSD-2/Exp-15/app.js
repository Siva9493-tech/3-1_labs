const express = require("express");
const app = express();

let todos = [];

app.use(express.json());

// Allow requests from browser
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    next();
});

app.post("/add", (req, res) => {
    todos.push(req.body.task);
    res.send("Task Added Successfully");
});

app.get("/list", (req, res) => {
    res.json(todos);
});

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});