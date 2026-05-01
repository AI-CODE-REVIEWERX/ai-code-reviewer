const axios = require("axios");
const { Octokit } = require("@octokit/rest");

// 🔐 GitHub client (for comments, issues, PR operations)
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

// 🔍 1. Get PR Diff
exports.getPRDiff = async (repo, prNumber) => {
  try {
    const url = `https://api.github.com/repos/${repo}/pulls/${prNumber}`;

    const response = await axios.get(url, {
      headers: {
        Accept: "application/vnd.github.v3.diff",
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("❌ GitHub Diff Error:", error.message);
    return null;
  }
};

// 💬 2. Post comment on PR (IMPORTANT FOR FINAL FEATURE)
exports.postPRComment = async (repo, prNumber, aiReview) => {
  try {
    const [owner, repoName] = repo.split("/");

    const commentBody = aiReview.map(issue => {
      return `🤖 **${issue.type}**\n\n${issue.description}\n💡 Fix: ${issue.suggestion}`;
    }).join("\n\n---\n\n");

    await octokit.rest.issues.createComment({
      owner,
      repo: repoName,
      issue_number: prNumber,
      body: `🚀 AI Code Review:\n\n${commentBody}`
    });

    console.log("✅ PR comment posted successfully");

  } catch (error) {
    console.error("❌ Comment Error:", error.message);
  }
};