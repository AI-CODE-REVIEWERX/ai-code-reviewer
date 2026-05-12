const express = require("express");
require("dotenv").config();

const connectDB = require("./db");
connectDB();

const app = express();

// Middleware
app.use(express.json());

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
  res.status(500).send("Internal Server Error");
});

// =======================
// 🚀 START SERVER
// =======================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
