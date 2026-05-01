const { getPRDiff, postPRComment } = require("../services/githubService");
const { analyzeCode } = require("../services/aiService");
const Review = require("../models/Review");

exports.handleWebhook = async (req, res) => {
  try {
    const event = req.headers["x-github-event"];
    const action = req.body.action;

    console.log("📩 Event received:", event);

    // 👉 Only handle PR opened event
    if (event === "pull_request" && action === "opened") {

      const repo = req.body.repository.full_name;
      const prNumber = req.body.pull_request.number;

      console.log("📦 Repo:", repo);
      console.log("🔢 PR Number:", prNumber);

      // 🔍 STEP 1: Get PR diff
      const diff = await getPRDiff(repo, prNumber);

      console.log("🔍 PR DIFF START ==================");
      console.log(diff);
      console.log("🔍 PR DIFF END ====================");

      // 🤖 STEP 2: AI analysis
      const aiReview = await analyzeCode(diff);

      console.log("🤖 AI REVIEW START ==================");
      console.log(aiReview);
      console.log("🤖 AI REVIEW END ====================");

      // 💾 STEP 3: SAVE TO DATABASE
      const savedReview = await Review.create({
        prId: prNumber,
        repoName: repo,
        issues: aiReview
      });

      console.log("✅ Saved to MongoDB:", savedReview._id);

      // 💬 STEP 4: POST COMMENT ON GITHUB PR (NEW)
      await postPRComment(repo, prNumber, aiReview);

      console.log("🚀 Comment posted on GitHub PR");

      return res.status(200).send("PR processed successfully");
    }

    res.status(200).send("Event ignored");

  } catch (err) {
    console.error("❌ Webhook Error:", err);
    res.status(500).send("Server error");
  }
};

// 🧪 Test endpoint
exports.testWebhook = (req, res) => {
  res.send("Webhook working ✅");
};