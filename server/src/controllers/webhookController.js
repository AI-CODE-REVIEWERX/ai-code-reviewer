const {
  getPullRequestDiff,
} = require("../services/githubService");

const {
  reviewCode,
} = require("../services/aiReviewService");

const cleanDiff = require("../utils/cleanDiff");

const webhookHandler = async (req, res) => {
  try {
    const event = req.headers["x-github-event"];

    if (event !== "pull_request") {
      return res.status(200).send("Not PR Event");
    }

    const action = req.body.action;

    if (action !== "opened") {
      return res.status(200).send("PR not opened");
    }

    // RESPOND IMMEDIATELY
    res.status(200).json({
      success: true,
      message: "Webhook received",
    });

    // BACKGROUND PROCESSING
    const pr = req.body.pull_request;

    const owner =
      req.body.repository.owner.login;

    const repo =
      req.body.repository.name;

    const pull_number = pr.number;

    console.log("Fetching PR Diff...");

    const diff = await getPullRequestDiff(
      owner,
      repo,
      pull_number
    );

    console.log("Cleaning Diff...");

    const cleanedDiff = cleanDiff(diff);

    console.log("Sending To Gemini AI...");

    const review = await reviewCode(
      cleanedDiff
    );

    console.log("AI REVIEW:");

    console.log(review);

  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  webhookHandler,
};