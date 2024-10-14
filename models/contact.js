const mongoose = require("mongoose");

// Contact schema for the database
const contactSchema = new mongoose.Schema({
  fullName: String,
  emailAddress: String,
  phone: String,
  streetAddress: String,
});

// Export model with the schema and collection name
module.exports = mongoose.model("Contact", contactSchema, "contacts");
