const mongoose = require("mongoose");

// 1. Connect to MongoDB
mongoose
  .connect("mongodb://admin:admin123@ac-23eizhl-shard-00-00.ggg50v6.mongodb.net:27017,ac-23eizhl-shard-00-01.ggg50v6.mongodb.net:27017,ac-23eizhl-shard-00-02.ggg50v6.mongodb.net:27017/?ssl=true&replicaSet=atlas-iqco4v-shard-0&authSource=admin&appName=Cluster0")
  .then(() => {
    console.log("MongoDB connected successfully");
    performCRUD();
  })
  .catch((err) => console.log("Connection error:", err));

// 2. Create Schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  department: String,
  email: String
});

// 3. Create Model
const Student = mongoose.model("Student", studentSchema);

// 4. Perform CRUD operations
async function performCRUD() {
  try {
    // CREATE
    const student = await Student.create({
      name: "Rahul",
      age: 20,
      department: "CSE",
      email: "rahul@example.com"
    });

    console.log("\nCREATE:");
    console.log(student);

    // READ
    const students = await Student.find();

    console.log("\nREAD:");
    console.log(students);

    // UPDATE
    const updatedStudent = await Student.findByIdAndUpdate(
      student._id,
      { age: 21 },
      { new: true }
    );

    console.log("\nUPDATE:");
    console.log(updatedStudent);

    // DELETE
    const deletedStudent = await Student.findByIdAndDelete(student._id);

    console.log("\nDELETE:");
    console.log(deletedStudent);

  } catch (error) {
    console.log("CRUD Error:", error);
  } finally {
    mongoose.connection.close();
  }
}