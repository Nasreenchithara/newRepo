const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Status: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Student", StudentSchema);

