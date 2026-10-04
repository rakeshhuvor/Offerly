const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log("Trying Mongo URI:", process.env.MONGO_URI ? "FOUND" : "NOT FOUND");
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI is missing!");
      process.exit(1);
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error Full:", error.message);
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
