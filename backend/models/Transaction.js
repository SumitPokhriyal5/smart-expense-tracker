const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    note: {
      type: String,
      trim: true,
      default: "",
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

transactionSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model("Transaction", transactionSchema);
