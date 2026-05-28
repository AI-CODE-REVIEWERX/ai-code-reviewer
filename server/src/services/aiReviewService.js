const model = require("../config/gemini");

const reviewCode = async (diff) => {
  try {
    const prompt = `
You are an expert senior software engineer.

Analyze this GitHub pull request diff.

Find:
1. Bugs
2. Security vulnerabilities
3. Performance issues
4. Bad practices

Provide:
- issue title
- explanation
- severity
- corrected code

GitHub PR Diff:
${diff}
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = {
  reviewCode,
};