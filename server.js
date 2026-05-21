app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use((req, res, next) => {
  console.log("Incoming Request:", req.method, req.url);
  next();
});

app.use("/webhook", webhookRoutes);