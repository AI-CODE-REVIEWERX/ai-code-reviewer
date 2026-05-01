const express = require("express");
const router = express.Router();

const { handleWebhook, testWebhook } = require("../controllers/webhookController");

// POST (GitHub webhook)
router.post("/", handleWebhook);

// GET (browser test)
router.get("/", testWebhook);

module.exports = router;