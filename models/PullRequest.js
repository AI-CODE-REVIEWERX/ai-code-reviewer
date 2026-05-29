import mongoose from "mongoose";

const prSchema = new mongoose.Schema(
  {
    repoName: {
      type: String,
      required: true,
    },

    prNumber: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    prUrl: {
      type: String,
      required: true,
    },

    action: {
      type: String,
      enum: ["opened", "synchronize", "closed"],
      default: "opened",
    },

    reviewStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },

    totalIssues: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const PullRequest = mongoose.model(
  "PullRequest",
  prSchema
);

export default PullRequest;
