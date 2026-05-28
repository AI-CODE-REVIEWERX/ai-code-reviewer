const express = require("express");

const {
  webhookHandler,
} = require("../controllers/webhookController");

const router = express.Router();

router.post("/", webhookHandler);

module.exports = router;