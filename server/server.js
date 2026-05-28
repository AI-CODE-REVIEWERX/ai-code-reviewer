const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const webhookRoutes = require(
  "./src/routes/webhookRoutes"
);

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/webhook", webhookRoutes);

app.get("/", (req, res) => {
  res.send("GitGuard AI Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});