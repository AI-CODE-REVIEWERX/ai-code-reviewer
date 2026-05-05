const mongoose = require("mongoose");

const prSchema = new mongoose.Schema(
  {
    repoName: String,
    prId: Number,
    title: String,
    author: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("PullRequest", prSchema);