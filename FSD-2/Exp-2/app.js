const express = require("express");
const path = require("path");
const app = express();

// Fixed: Correct view engine setup string syntax
app.set("view engine", "ejs");
// Fixed: __dirname uses two underscores
app.set("views", path.join(__dirname, "views"));

// Fixed: Arrow function parentheses and object syntax (colons instead of equals)
app.get("/", (req, res) => {
    res.render("index", {
        title: "HOME Page",
        message: "welcome to express with EJS templations!"
    });
});

// Fixed: Dot notation for res.render
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About page",
        message: "This is the About page of the app"
    });
});

const PORT = 3000;
// Fixed: Template literal backticks for console log
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
