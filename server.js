import express from "express";
import dotenv from "dotenv";

import connectDB from "./db.js";
import webhookRoutes from "./routes/webhookRoutes.js";

dotenv.config();

const app = express();


// DATABASE CONNECTION

connectDB();


// Middleware

// Keeps raw body for GitHub signature verification
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);


// TEST ROUTE

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});


// WEBHOOK ROUTES

app.use("/webhook", webhookRoutes);


// GLOBAL ERROR HANDLING

app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});


// START SERVER

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
