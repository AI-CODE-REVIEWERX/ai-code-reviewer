import crypto from "crypto";

// VERIFY GITHUB WEBHOOK SIGNATURE
export const verifyGithubSignature = (req) => {
  const signature = req.headers["x-hub-signature-256"];

  if (!signature) {
    return false;
  }

  if (!process.env.GITHUB_WEBHOOK_SECRET) {
    throw new Error(
      "GITHUB_WEBHOOK_SECRET is not defined in environment variables"
    );
  }

  const hmac = crypto.createHmac(
    "sha256",
    process.env.GITHUB_WEBHOOK_SECRET
  );

  const digest =
    "sha256=" + hmac.update(req.rawBody).digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
};