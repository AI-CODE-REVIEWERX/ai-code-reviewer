import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// GITHUB PR COMMENT SERVICE
export const postPRComment = async (repo, prNumber, issues) => {
  try {
    if (!process.env.GITHUB_TOKEN) {
      throw new Error("GITHUB_TOKEN is not defined in environment variables");
    }

    const [owner, repoName] = repo.split("/");

    if (!owner || !repoName) {
      throw new Error("Invalid repository format");
    }

    let commentBody = "## AI Code Review Report\n\n";

    if (!issues || issues.length === 0) {
      commentBody += "No major issues found in this pull request.";
    } else {
      issues.forEach((issue, index) => {
        commentBody += `
### Issue ${index + 1}

**Type:** ${issue.type || "N/A"}  
**Severity:** ${issue.severity || "N/A"}  

**Description:**  
${issue.description || "No description provided"}

**Suggested Fix:**  
${issue.suggestedFix || "No fix suggested"}
`;

        if (issue.fixedCode) {
          commentBody += `

**Fixed Code:**

\`\`\`js
${issue.fixedCode}
\`\`\`
`;
        }

        commentBody += "\n---\n";
      });
    }

    await octokit.issues.createComment({
      owner,
      repo: repoName,
      issue_number: prNumber,
      body: commentBody,
    });

    console.log("Comment posted on GitHub PR");
  } catch (error) {
    console.error("GitHub Comment Error:", error.response?.data || error.message);
    throw error;
  }
};