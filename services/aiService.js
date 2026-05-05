const axios = require("axios");

// ===============================
// 🤖 AI CODE ANALYSIS SERVICE
// ===============================
exports.analyzeCode = async (diff) => {
  try {
    const prompt = `
You are an expert code reviewer.

Analyze the following GitHub code diff and find:
- Bugs
- Security issues
- Performance problems
- Improvement suggestions

Return response in JSON format like:
[
  {
    "type": "bug/security/improvement",
    "description": "Explain the issue",
    "suggestedFix": "How to fix it"
  }
]

Code Diff:
${diff}
`;

    // ===============================
    // 🔥 OPTION 1: MOCK RESPONSE (FOR TESTING)
    // ===============================
    return [
      {
        type: "bug",
        description: "Possible null pointer issue",
        suggestedFix: "Add null check before usage",
      },
      {
        type: "improvement",
        description: "Code can be optimized",
        suggestedFix: "Use better loop structure",
      },
    ];

    // ===============================
    // 🔥 OPTION 2: REAL AI (UNCOMMENT LATER)
    // ===============================
    /*
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return JSON.parse(response.data.choices[0].message.content);
    */
  } catch (error) {
    console.error("❌ AI Service Error:", error.message);
    return [];
  }
};