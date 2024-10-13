const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://devnatnaelt:1583natiatlas@address-book-cluster.xjhya.mongodb.net/?retryWrites=true&w=majority&appName=address-book-cluster"
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

const Address = require("./models/address");

// Routes

// Root route (for base URL "/")
app.get("/", (req, res) => {
  res.send("Welcome to the Address Book API!");
});

app.get("/api/addresses", async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/addresses", async (req, res) => {
  try {
    const newAddress = new Address(req.body);
    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/addresses/:id", async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAddress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/addresses/:id", async (req, res) => {
  try {
    await Address.findByIdAndRemove(req.params.id);
    res.json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
