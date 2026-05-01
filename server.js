const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// 📦 Routes
const webhookRoutes = require("./routes/webhookRoutes");
app.use("/webhook", webhookRoutes);

// 🧠 AI service test route (TEMP DEBUG TOOL)
const { analyzeCode } = require("./services/aiService");

app.get("/test-ai", async (req, res) => {
  try {
    const sampleDiff = `
      const user = null;
      console.log(user.name);
    `;

    const result = await analyzeCode(sampleDiff);

    console.log("🧠 AI RESULT:", result);

    res.json(result);
  } catch (err) {
    console.error("❌ AI Test Error:", err.message);
    res.status(500).send("AI test failed");
  }
});

// 🔍 Debug env check
console.log("🔍 Loaded MONGO_URI:", process.env.MONGO_URI ? "YES" : "NO");

// 🌐 Home route
app.get("/", (req, res) => {
  res.send("AI Code Reviewer Running 🚀");
});

// 🗄️ MongoDB Connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ DB Connected Successfully");
  } catch (err) {
    console.error("❌ DB Connection Error:");
    console.error(err.message);
    process.exit(1);
  }
}

connectDB();

// 🚀 Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});