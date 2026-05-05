const express = require("express");
const router = express.Router();

const { handleWebhook } = require("../controllers/webhookController");

// GitHub will call this route
router.post("/", handleWebhook);

module.exports = router;