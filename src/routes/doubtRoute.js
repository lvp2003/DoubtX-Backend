const express = require("express");
const route = express.Router();

const Doubt = require("../models/Doubt");
const auth = require("../middleware/auth");
route.post("/doubts", auth, async (req, res) => {
  try {
    const { title, description, createdBy, status } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and  description required" });
    }
    const doubt = new Doubt({
      title,
      description,
      createdBy,
      status,
    });
    await doubt.save();
    res.status(201).json({ message: "doubt posted successfully", doubt });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error ", error.message);
  }
});

route.get("/doubts", auth, async (req, res) => {
  try {
    const getAllDoubts = await Doubt.find({ status: "open" })
      .populate("createdBy", "name email ")
      .populate("assignedTutor", "name email");
    res.status(200).json(getAllDoubts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("error", error.message);
  }
});

route.get("/doubts/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const doubt = await Doubt.findById(id)
      .populate("createdBy", "name email")
      .populate("assignedTutor", "name email");
    res.status(200).json(doubt);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("error", error.message);
  }
});

route.put("/doubts/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { title, description, assignedTutor } = req.body;
  try {
    const doubt = await Doubt.findByIdAndUpdate(
      id,
      { title, description, assignedTutor },
      { new: true }
    )
      .populate("createdBy", "name email")
      .populate("assignedTutor", "name email");
    res.status(200).json({ message: "Doubt updated successfully", doubt });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("error", error.message);
  }
});

route.delete("/doubts/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const doubt = await Doubt.findByIdAndDelete(id);
    res.status(200).json({ message: "doubt deleted successfully", doubt });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("error", error.message);
  }
});

module.exports = route;

// route.get("/doubts", async (req, res) => {
//   try {
//     const getAllDoubts = await Doubt.find();
//     res.status(200).json(getAllDoubts);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//     console.log("error", error.message);
//   }
// });
