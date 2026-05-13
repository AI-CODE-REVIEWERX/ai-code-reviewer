import { getPRDiff } from "../services/githubService.js";
import { analyzeCode } from "../services/aiService.js";
import Review from "../models/Review.js";
import { postPRComment } from "../services/githubCommentService.js";
import { verifyGithubSignature } from "../utils/verifyGithubSignature.js";

// MAIN WEBHOOK HANDLER
export const handleWebhook = async (req, res) => {
  try {
    const isValidSignature = verifyGithubSignature(req);

if (!isValidSignature) {
  return res.status(401).json({
    success: false,
    message: "Invalid GitHub webhook signature",
  });
}
    const event = req.headers["x-github-event"];

    console.log("WEBHOOK HIT");
    console.log("Event Type:", event);

    // HANDLE PUSH EVENT FOR TESTING
    if (event === "push") {
      const repo = req.body.repository?.full_name;

      console.log("PUSH EVENT RECEIVED");
      console.log("Repo:", repo);

      return res.status(200).json({
        success: true,
        message: "Push event received",
      });
    }

    // HANDLE PULL REQUEST EVENT
    if (event === "pull_request") {
      const action = req.body.action;

      console.log("Pull Request Event:", action);

      // PROCESS ONLY PR OPENED OR UPDATED
      if (action === "opened" || action === "synchronize") {
        const pr = req.body.pull_request;
        const repo = req.body.repository.full_name;

        if (!pr || !repo) {
          return res.status(400).json({
            success: false,
            message: "Invalid pull request payload",
          });
        }

        console.log("PR RECEIVED:", pr.number);
        console.log("Repo:", repo);

        // GET CODE DIFF
        const diff = await getPRDiff(repo, pr.number);

        if (!diff || diff.trim().length === 0) {
          console.log("No diff found");

          return res.status(200).json({
            success: true,
            message: "No diff found for this pull request",
          });
        }

        console.log("Diff fetched");

        // AI ANALYSIS
        const aiResult = await analyzeCode(diff);

        console.log("AI analysis completed");

        // SAVE REVIEW TO DATABASE
        await Review.create({
          repoName: repo,
          prNumber: pr.number,
          prTitle: pr.title,
          prUrl: pr.html_url,
          author: pr.user?.login,
          action,
          issues: aiResult,
        });

        console.log("Saved to MongoDB");

        // POST COMMENT ON GITHUB PR
        await postPRComment(repo, pr.number, aiResult);

        console.log("Comment posted on GitHub");

        return res.status(200).json({
          success: true,
          message: "Pull request processed successfully",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Pull request event ignored",
        action,
      });
    }

    // OTHER EVENTS
    console.log("Unhandled event:", event);

    return res.status(200).json({
      success: true,
      message: "Event ignored",
      event,
    });
  } catch (error) {
    console.error("Webhook Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Error processing webhook",
      error: error.message,
    });
  }
};