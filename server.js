require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Teacher = require('./models/teacher');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/teacherdb")
.then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(3000, () => {
        console.log("🚀 Server running at http://localhost:3000");
    });
})
.catch(err => {
    console.log("❌ MongoDB Connection Failed");
    console.log(err);
});

/* CREATE */
app.post('/teachers', async (req, res) => {
    try {
        const teacher = new Teacher(req.body);
        await teacher.save();
        res.json({ message: "Teacher Added Successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});

/* READ */
app.get('/teachers', async (req, res) => {
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    res.json(teachers);
});

/* UPDATE */
app.put('/teachers/:id', async (req, res) => {
    await Teacher.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Teacher Updated Successfully" });
});

/* DELETE */
app.delete('/teachers/:id', async (req, res) => {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: "Teacher Deleted Successfully" });
});