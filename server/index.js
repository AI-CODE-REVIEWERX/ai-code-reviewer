const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();

app.use(cors());

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("GitGuard AI Backend Running");
});

app.get("/auth/github", (req, res) => {

  const githubAuthURL =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${process.env.GITHUB_CLIENT_ID}`;

  res.redirect(githubAuthURL);
});

app.get("/auth/github/callback", async (req, res) => {

  const code = req.query.code;

  try {

    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(userResponse.data);

    res.send(`
      <h1>GitHub Login Successful</h1>
      <p>${userResponse.data.login}</p>
    `);

  } catch (error) {
    console.log(error.message);
    res.send("Login Failed");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});