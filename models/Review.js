import mongoose from "mongoose";

// REVIEW SCHEMA
// Stores AI analysis of Pull Requests

const reviewSchema = new mongoose.Schema(
  {
    repoName: {
      type: String,
      required: true,
    },

    prNumber: {
      type: Number,
      required: true,
    },

    prTitle: {
      type: String,
      required: true,
    },

    prUrl: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    action: {
      type: String,
      enum: ["opened", "synchronize"],
      required: true,
    },

    issues: [
      {
        type: {
          type: String,
          required: true,
        },

        severity: {
          type: String,
          enum: ["low", "medium", "high"],
          default: "low",
        },

        description: {
          type: String,
          required: true,
        },

        suggestedFix: {
          type: String,
          required: true,
        },

        fixedCode: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;