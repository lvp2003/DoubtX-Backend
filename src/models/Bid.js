const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    doubt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doubt",
      required: true,
      index: true,
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Create a compound index on the "doubt" and "tutor" fields
bidSchema.index({ doubt: 1, tutor: 1 }, { unique: true });
// 🧠 Why It's Used
//     1. Prevent Duplicate Bids
// - It ensures that a tutor can place only one bid per doubt.
// - If a tutor tries to bid again on the same doubt, MongoDB will throw a duplicate key error.
// 🚀 2. Enforce Business Logic at the DB Level
// - Instead of manually checking for existing bids in your app logic, this index guarantees data integrity.
// - It’s a clean way to enforce rules without extra queries.
// ⚡ 3. Optimize Query Performance
// - Indexing doubt and tutor speeds up queries like:


const Bid = mongoose.model("Bid", bidSchema);

module.exports = Bid;
