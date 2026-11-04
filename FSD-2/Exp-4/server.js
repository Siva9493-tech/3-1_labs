const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// MongoDB connection
mongoose
  .connect("mongodb://admin:admin123@ac-23eizhl-shard-00-00.ggg50v6.mongodb.net:27017,ac-23eizhl-shard-00-01.ggg50v6.mongodb.net:27017,ac-23eizhl-shard-00-02.ggg50v6.mongodb.net:27017/?ssl=true&replicaSet=atlas-iqco4v-shard-0&authSource=admin&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Student schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  department: String,
  email: String
});

const Student = mongoose.model("Student", studentSchema);

// CREATE - POST
app.post("/api/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - GET
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - PUT
app.put("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - DELETE
app.delete("/api/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});