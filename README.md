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



## .env File Configuration

This project uses environment variables to keep sensitive information secure.

Create a .env file in the root directory and add the following:

GITHUB_TOKEN=your_github_token
AI_API_KEY=your_ai_api_key
PORT=5000



## Database Models (MongoDB)

In this step, we define the database structure using MongoDB (Mongoose).
These models help store GitHub Pull Request data and AI-generated code review results.

Models Created
1. PullRequest Model

## This model stores basic information about each GitHub Pull Request.

Fields:

repoName → Repository name
prId → Pull request number
title → PR title
author → GitHub username
2. Review Model

## This model stores AI analysis results for each PR.

Fields:

prId → Pull request number
issues → Array of detected issues
type → Bug / Security / Improvement
description → Problem found in code
suggestedFix → Recommended fix by AI

🛠️ Tech Used
MongoDB (Database)
Mongoose (ODM for Node.js)

.,


Testing webhook PR
Webhook test updated


Testing webhook trigger for AI review system
test-pr
webhook tested again
Webhook final PR test - new change done



Successfully created pull request


Webhook testing successful
webhook tested again
gitguard-ai
