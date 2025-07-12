const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
require("dotenv").config();

// Initialize app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Mongoose model
const mongoose = require("mongoose");
const VisitSchema = new mongoose.Schema({
    timestamp: { type: String },
    ip: { type: String },
    loc: { type: String },          // Latitude,Longitude string
    postal: { type: String },
    org: { type: String },          // ISP / Organization
    city: { type: String },
    country: { type: String },
    device: { type: String }
  });
const Visit = mongoose.model("Visit", VisitSchema);

// Routes
app.post("/log-visit", async (req, res) => {
  try {

    const visit = new Visit(req.body);
    await visit.save();
    res.status(200).json({ message: "Visit logged" });
  } catch (error) {
    res.status(500).json({ error: "Failed to log visit" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
