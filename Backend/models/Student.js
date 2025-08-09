const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  className: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Student", StudentSchema);

