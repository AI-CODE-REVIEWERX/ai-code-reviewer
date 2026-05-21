import { getPRDiff } from "../services/githubService.js";
import { analyzeCode } from "../services/aiService.js";
import Review from "../models/Review.js";
import { postPRComment } from "../services/githubCommentService.js";

// MAIN WEBHOOK HANDLER
export const handleWebhook = async (req, res) => {
  try {

    // TEMPORARY: SKIP SIGNATURE VERIFICATION
    console.log("Skipping signature verification for testing");

    const event = req.headers["x-github-event"];

    console.log("🔥 WEBHOOK HIT");
    console.log("📩 Event Type:", event);

    // HANDLE PUSH EVENT
    if (event === "push") {
      const repo = req.body.repository?.full_name;

      console.log("📦 PUSH EVENT RECEIVED");
      console.log("📁 Repo:", repo);

      return res.status(200).json({
        success: true,
        message: "Push event received",
      });
    }

    // HANDLE PULL REQUEST EVENT
    if (event === "pull_request") {
      const action = req.body.action;

      console.log("📌 Pull Request Event:", action);

      // PROCESS ONLY OPENED OR UPDATED PR
      if (action === "opened" || action === "synchronize") {

        const pr = req.body.pull_request;
        const repo = req.body.repository.full_name;

        if (!pr || !repo) {
          return res.status(400).json({
            success: false,
            message: "Invalid PR payload",
          });
        }

        console.log("✅ PR RECEIVED:", pr.number);
        console.log("📁 Repo:", repo);

        // FETCH DIFF
        const diff = await getPRDiff(repo, pr.number);

        if (!diff || diff.trim().length === 0) {

          console.log("⚠️ No diff found");

          return res.status(200).json({
            success: true,
            message: "No diff found",
          });
        }

        console.log("📄 Diff fetched successfully");

        // AI ANALYSIS
        const aiResult = await analyzeCode(diff);

        console.log("🤖 AI analysis completed");

        // SAVE TO DATABASE
        await Review.create({
          repoName: repo,
          prNumber: pr.number,
          prTitle: pr.title,
          prUrl: pr.html_url,
          author: pr.user?.login,
          action,
          issues: aiResult,
        });

        console.log("✅ Review saved to MongoDB");

        // COMMENT ON PR
        await postPRComment(repo, pr.number, aiResult);

        console.log("💬 Comment posted on GitHub PR");

        return res.status(200).json({
          success: true,
          message: "PR processed successfully",
        });
      }

      return res.status(200).json({
        success: true,
        message: "PR event ignored",
        action,
      });
    }

    // OTHER EVENTS
    console.log("⚠️ Unhandled event:", event);

    return res.status(200).json({
      success: true,
      message: "Event ignored",
      event,
    });

  } catch (error) {

    console.error("❌ WEBHOOK ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Error processing webhook",
      error: error.message,
    });
  }
};