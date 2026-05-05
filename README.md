## AI Code Reviewer that analyzes GitHub PRs using AI and suggests fixes.

# 🚀 AI Code Reviewer & Bug Patcher
An AI-powered system that automatically reviews GitHub Pull Requests, detects bugs, and suggests fixes using AI.

## 🧠 How it Works
GitHub PR → Webhook → Backend → AI → MongoDB → Review Output


## 📌 Step 1: Project Setup

In this step, the initial project setup is completed.

### 🔧 Actions Performed:

* Created project folder:

  ```
  mkdir ai-code-reviewer
  cd ai-code-reviewer
  ```
* Initialized Node.js project:

  ```
  npm init -y
  ```
* Installed required dependencies:

  ```
  npm install express mongoose dotenv axios @octokit/rest cors
  ```

### 📁 Project Structure Created:

```
ai-code-reviewer/
│
├── models/
├── controllers/
├── routes/
├── services/
├── server.js
├── .env
├── README.md
```

### 🎯 Purpose:

This step sets up the basic environment required to build the AI Code Reviewer backend system.
