const express = require("express");
require("dotenv").config();

const connectDB = require("./db");

const app = express();

// =======================
// 🗄️ DATABASE CONNECTION
// =======================
connectDB();

// =======================
// Middleware
// =======================
// This keeps raw body for GitHub signature verification
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

// =======================
// 🌐 TEST ROUTE
// =======================
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// =======================
// 🔗 WEBHOOK ROUTES
// =======================
const webhookRoutes = require("./routes/webhookRoutes");
app.use("/webhook", webhookRoutes);

// =======================
// ❌ GLOBAL ERROR HANDLING
// =======================
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// =======================
// 🚀 START SERVER
// =======================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});