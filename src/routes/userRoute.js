const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (await User.findOne({ email })) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    if (!name || !email || !password || !role) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    const user = new User({
      name,
      email,
      password,
      role,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error ", error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password or email" });
    }
    // const { password: _, ...userData } = user.toObject();
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error ", error.message);
  }
});
module.exports = router;
