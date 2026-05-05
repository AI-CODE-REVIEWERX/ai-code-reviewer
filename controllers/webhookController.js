const { getPRDiff } = require("../services/githubService");
const { analyzeCode } = require("../services/aiService");
const Review = require("../models/Review");
const { postPRComment } = require("../services/githubCommentService");

// ===============================
// 🧠 MAIN WEBHOOK HANDLER
// ===============================
exports.handleWebhook = async (req, res) => {
  try {
    const event = req.headers["x-github-event"];

    // Only handle GitHub pull_request events
    if (event === "pull_request") {
      const action = req.body.action;

      // Only when PR is opened
      if (action === "opened") {
        const pr = req.body.pull_request;
        const repo = req.body.repository.full_name;

        console.log("📩 PR Received:", pr.number);

        // ===============================
        // 1. Get code diff from GitHub
        // ===============================
        const diff = await getPRDiff(repo, pr.number);

        // ===============================
        // 2. Send diff to AI for analysis
        // ===============================
        const aiResult = await analyzeCode(diff);

        console.log("🤖 AI analysis completed");

        // ===============================
        // 3. Save result in MongoDB
        // ===============================
        await Review.create({
          prId: pr.number,
          issues: aiResult,
        });

        console.log("🗄 Review stored in DB");

        // ===============================
        // 4. Post comment on GitHub PR
        // ===============================
        await postPRComment(repo, pr.number, aiResult);

        console.log("💬 GitHub PR comment posted");
      }
    }

    // Always respond to GitHub
    res.send("Webhook received ✔");
  } catch (error) {
    console.error("❌ Webhook Error:", error.message);
    res.status(500).send("Error processing webhook");
  }
};