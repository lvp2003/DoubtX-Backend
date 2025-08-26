const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Validate required environment variables
if (!process.env.MONGODB_URI) {
  console.error("Error: MONGODB_URI is not set in environment variables.");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongoose connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}
connectDB();

// Example route
app.get("/", (req, res) => {
  res.send("API is running");
});

const server = app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\nGracefully shutting down...");
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log("MongoDB connection closed.");
      process.exit(0);
    });
  });
});
