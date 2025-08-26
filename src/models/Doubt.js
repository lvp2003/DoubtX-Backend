const { model, Schema } = require("mongoose");
const { schema } = require("./user");

const doubtSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved"],
      default: "open",
    },
    assignedTutor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true
    },
  },
  { timestamps: true }
);

const Doubt = model("Doubt", doubtSchema);

module.exports = Doubt;
