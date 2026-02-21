require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // ✅ add mongoose
const Student = require('./models/student');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ✅ CONNECT TO MONGODB
mongoose.connect("mongodb://127.0.0.1:27017/studentdb", {
    serverSelectionTimeoutMS: 5000
})
.then(() => {
    console.log("✅ MongoDB Connected");

    // ✅ START SERVER AFTER DB CONNECTION
    app.listen(process.env.PORT || 3000, () => {
        console.log(`🚀 Server running at http://localhost:${process.env.PORT || 3000}`);
    });
})
.catch(err => {
    console.error("❌ MongoDB Connection Failed:");
    console.error(err);
});

/* CREATE */
app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: "Student Added Successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* READ */
app.get('/students', async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.json(students);
});

/* UPDATE */
app.put('/students/:id', async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Student Updated Successfully" });
});

/* DELETE */
app.delete('/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student Deleted Successfully" });
});