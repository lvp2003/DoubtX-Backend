const express = require("express");
const router = express.Router();
const Doubt = require("../models/Doubt");
const auth = require("../middlewares/authMiddleware");
const Bid = require("../models/Bid");
router.post("/:id/bid", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { price, message } = req.body;

    const doubt = await Doubt.findById(id);
    if (!doubt) return res.status(404).json({ message: "Doubt not found" });

    const bid = new Bid({
      doubt: id,
      tutor: req.user._id,
      price,
      message,
    });

    await bid.save();
    res.status(201).json(bid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id/bids", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const bids = await Bid.find({ doubt: id })
      .populate("tutor", "name email role")
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
