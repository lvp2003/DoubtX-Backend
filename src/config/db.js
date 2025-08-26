const mongoose = require("mongoose");
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongoose connected successfully");
  } catch (error) {
    console.log("MongoDb connection failed", error);
    process.exit(1);
  }
}

module.exports = connectDB;
