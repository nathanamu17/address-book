const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const Contact = require("./models/contact");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas connection string from environment variables
const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas", err);
  });

// Address model
const Address = require("./models/address");

// Routes

// Get all addresses
app.get("/api/addresses", async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new address
app.post("/api/addresses", async (req, res) => {
  try {
    const newAddress = new Address(req.body);
    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// **Update an address** (PUT request)
app.put("/api/addresses/:id", async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated address instead of the old one
    );
    res.json(updatedAddress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// **Delete an address** (DELETE request)
app.delete("/api/addresses/:id", async (req, res) => {
  try {
    await Address.findByIdAndRemove(req.params.id);
    res.json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3001; // Make sure this matches the port your backend is running on
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
