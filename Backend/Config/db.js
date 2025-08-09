const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; 

    if (!mongoURI) {
      throw new Error("MongoDB connection string is undefined. Check .env file.");
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected 🟢`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;







