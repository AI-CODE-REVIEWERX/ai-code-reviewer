const mongoose = require("mongoose");

// ===============================
// 🗄 Review Schema
// Stores AI analysis of Pull Requests
// ===============================
const reviewSchema = new mongoose.Schema(
  {
    prId: {
      type: Number,
      required: true,
    },

    issues: [
      {
        type: {
          type: String, // bug / security / improvement
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        suggestedFix: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);