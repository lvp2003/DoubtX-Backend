const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    doubt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doubt",
      required: true,
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Bid = mongoose.model("Bid", bidSchema);

module.exports = Bid;
