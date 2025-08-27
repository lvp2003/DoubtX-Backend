const express = require("express");
const router = express.Router();
const Doubt = require("../models/Doubt");
const auth = require("../middleware/auth");
router.get("/my-doubts", auth, async (req, res) => {
  try {
    const getDoubtsAssignedToMe = await Doubt.find({
      assignedTutor: req.user._id,
      status: "accepted",
    })
      .populate("createdBy", "name email")
      .populate("assignedTutor", "name email");
    res.status(200).json(getDoubtsAssignedToMe);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error ", error.message);
  }
});

router.post("/accept/:doubtId", auth, async (req, res) => {
  try {
    const { doubtId } = req.params;
    const doubt = await Doubt.findById(doubtId);
    if (!doubt) {
      return res.status(404).json({ message: "Doubt not found" });
    }
    if (doubt.status !== "open") {
      return res
        .status(400)
        .json({ message: "This doubt is already accepted or closed" });
    }
    doubt.status = "accepted";
    doubt.assignedTutor = req.user._id;
    await doubt.save();
    res.status(200).json({ message: "Doubt accepted successfully", doubt });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error ", error.message);
  }
});

module.exports = router;
