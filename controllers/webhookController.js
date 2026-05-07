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

    console.log("🔥 WEBHOOK HIT");
    console.log("Event Type:", event);

    // ===============================
    // 🚀 HANDLE PUSH EVENT (for testing)
    // ===============================
    if (event === "push") {
      const repo = req.body.repository?.full_name;

      console.log("🚀 PUSH EVENT RECEIVED");
      console.log("Repo:", repo);

      return res.status(200).send("Push event received ✔");
    }

    // ===============================
    // 🔗 HANDLE PULL REQUEST EVENT
    // ===============================
    if (event === "pull_request") {
      const action = req.body.action;

      console.log("📩 Pull Request Event:", action);

      // Only when PR is opened
      if (action === "opened") {
        const pr = req.body.pull_request;
        const repo = req.body.repository.full_name;

        console.log("📩 PR RECEIVED:", pr.number);

        // ===============================
        // 1. Get code diff
        // ===============================
        const diff = await getPRDiff(repo, pr.number);

        console.log("📄 Diff fetched");

        // ===============================
        // 2. AI analysis
        // ===============================
        const aiResult = await analyzeCode(diff);

        console.log("🤖 AI analysis completed");

        // ===============================
        // 3. Save to DB
        // ===============================
        await Review.create({
          prId: pr.number,
          issues: aiResult,
        });

        console.log("🗄 Saved to MongoDB");

        // ===============================
        // 4. Comment on PR
        // ===============================
        await postPRComment(repo, pr.number, aiResult);

        console.log("💬 Comment posted on GitHub");

        return res.status(200).send("PR processed ✔");
      }

      return res.status(200).send("PR event ignored (not opened)");
    }

    // ===============================
    // ⚠️ OTHER EVENTS
    // ===============================
    console.log("⚠️ Unhandled event:", event);

    res.status(200).send("Event ignored");
  } catch (error) {
    console.error("❌ Webhook Error:", error.message);
    res.status(500).send("Error processing webhook");
  }
};