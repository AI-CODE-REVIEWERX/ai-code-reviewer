import axios from "axios";

// AI CODE ANALYSIS SERVICE
export const analyzeCode = async (diff) => {
  try {
    // LIMIT HUGE DIFFS
    const trimmedDiff = diff.slice(0, 12000);

    const prompt = `
You are a senior software engineer reviewing a GitHub pull request.

Analyze ONLY the changed code diff.

Find:
- Bugs
- Security vulnerabilities
- Performance issues
- Bad coding practices

Return ONLY valid JSON in this exact format:

[
  {
    "type": "bug/security/performance/improvement",
    "severity": "low/medium/high",
    "description": "Explain the issue clearly",
    "suggestedFix": "Explain how to fix it",
    "fixedCode": "Provide corrected code if possible"
  }
]

Code Diff:
${trimmedDiff}
`;

    // MOCK MODE FOR TESTING
    if (process.env.MOCK_AI === "true") {
      return [
        {
          type: "bug",
          severity: "medium",
          description: "Possible null pointer issue",
          suggestedFix: "Add null check before accessing object",
          fixedCode: "if(user){ console.log(user.name) }",
        },
        {
          type: "improvement",
          severity: "low",
          description: "Loop can be optimized",
          suggestedFix: "Use array methods instead of manual loops",
          fixedCode: "items.map(item => item.name)",
        },
      ];
    }

    // REAL AI API CALL
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert AI code reviewer.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiContent =
      response.data.choices[0].message.content;

    try {
      return JSON.parse(aiContent);
    } catch (parseError) {
      console.error("Failed to parse AI JSON response");

      return [
        {
          type: "error",
          severity: "low",
          description: "AI response parsing failed",
          suggestedFix: "Check AI response formatting",
          fixedCode: "",
        },
      ];
    }
  } catch (error) {
    console.error(
      "AI Service Error:",
      error.response?.data || error.message
    );

    return [
      {
        type: "error",
        severity: "high",
        description: "AI analysis failed",
        suggestedFix: "Check AI service configuration",
        fixedCode: "",
      },
    ];
  }
};
