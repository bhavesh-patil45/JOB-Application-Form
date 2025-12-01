const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/jobApplicationDB")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Schema
const applicationSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    email: String,
    dob: String,
    gender: String,
    maritalStatus: String,

    street: String,
    city: String,
    state: String,
    pincode: String,

    qualification: String,
    passingYear: String,

    jobRole: String,
    skills: Array,
    languages: Array,

    experience: String,
    expectedSalary: String,
    preferredJobLocation: String,

    emergencyContact: String,
    referenceName: String,
    referenceContact: String,
});

const Application = mongoose.model("Application", applicationSchema);

// API Route to Save Data
app.post("/submit", async (req, res) => {
    try {
        const newApplication = new Application(req.body);
        await newApplication.save();
        res.send({ message: "Data saved successfully!" });
    } catch (err) {
        res.status(500).send({ message: "Error saving data", error: err });
    }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
