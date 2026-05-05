const axios = require("axios");

// ===============================
// 🐙 GET PULL REQUEST DIFF
// ===============================
exports.getPRDiff = async (repo, prNumber) => {
  try {
    const url = `https://api.github.com/repos/${repo}/pulls/${prNumber}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3.diff",
      },
    });

    return response.data; // raw diff text
  } catch (error) {
    console.error("❌ GitHub API Error:", error.message);
    throw new Error("Failed to fetch PR diff from GitHub");
  }
};