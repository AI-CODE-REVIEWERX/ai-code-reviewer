const { Octokit } = require("@octokit/rest");

// ===============================
// 🐙 GITHUB PR COMMENT SERVICE
// ===============================
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

exports.postPRComment = async (repo, prNumber, issues) => {
  try {
    // Format AI issues into readable comment
    let commentBody = "🤖 AI Code Review Report:\n\n";

    issues.forEach((issue, index) => {
      commentBody += `
### Issue ${index + 1}
- 🔴 Type: ${issue.type}
- 📝 Description: ${issue.description}
- 💡 Fix: ${issue.suggestedFix}
`;
    });

    // Split repo into owner/repo
    const [owner, repoName] = repo.split("/");

    // Post comment on PR
    await octokit.issues.createComment({
      owner,
      repo: repoName,
      issue_number: prNumber,
      body: commentBody,
    });

    console.log("✅ Comment posted on GitHub PR");
  } catch (error) {
    console.error("❌ GitHub Comment Error:", error.message);
  }
};