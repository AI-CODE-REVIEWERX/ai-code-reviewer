const OpenAI = require("openai");

// 🔐 Create client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 🤖 AI Code Analyzer
exports.analyzeCode = async (diff) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert code reviewer. Find bugs, security issues, and improvements. Return response in JSON format."
        },
        {
          role: "user",
          content: `Analyze this code diff:\n\n${diff}`
        }
      ]
    });

    const result = response.choices[0].message.content;

    console.log("🤖 Raw AI Response:", result);

    // Try parsing JSON safely
    try {
      return JSON.parse(result);
    } catch (e) {
      return [
        {
          type: "info",
          description: result,
          suggestion: "Check AI output format"
        }
      ];
    }

  } catch (error) {
    console.error("❌ OpenAI Error:", error.message);

    return [
      {
        type: "error",
        description: "AI failed to analyze code",
        suggestion: "Check API key or quota"
      }
    ];
  }
};