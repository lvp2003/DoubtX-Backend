const { model, Schema } = require("mongoose");
const doubtSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "assigned", "completed"],
      default: "open",
    },
    assignedTutor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
      // required: true
    },
    tags: {
      type: [{ type: String, trim: true }],
    },
  },
  { timestamps: true }
);

const Doubt = model("Doubt", doubtSchema);

module.exports = Doubt;
