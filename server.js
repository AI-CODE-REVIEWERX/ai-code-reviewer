const express = require("express");
require("dotenv").config();

// =======================
// 🗄 DATABASE CONNECTION
// =======================
const connectDB = require("./db");
connectDB();

const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(express.json());

// =======================
// 🌐 TEST ROUTE
// =======================
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// =======================
// 🔗 WEBHOOK ROUTES (STEP 5)
// =======================
const webhookRoutes = require("./routes/webhookRoutes");
app.use("/webhook", webhookRoutes);

// =======================
// 🚀 START SERVER
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});