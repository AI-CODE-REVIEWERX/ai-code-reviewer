import express from "express";

import { handleWebhook } from "../controllers/webhookController.js";

const router = express.Router();

// GitHub webhook route
router.post("/", handleWebhook);

export default router;