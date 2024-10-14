const mongoose = require("mongoose");

// Address schema for storing address
const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model("Address", addressSchema, "addresses");
