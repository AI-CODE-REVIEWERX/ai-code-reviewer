import axios from "axios";

// GET PULL REQUEST DIFF
export const getPRDiff = async (repo, prNumber) => {
  try {
    if (!process.env.GITHUB_TOKEN) {
      throw new Error("GITHUB_TOKEN is not defined in environment variables");
    }

    const url = `https://api.github.com/repos/${repo}/pulls/${prNumber}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3.diff",
      },
    });

    return response.data;
  } catch (error) {
    console.error("GitHub API Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch PR diff from GitHub");
  }
};