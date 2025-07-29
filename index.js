const express = require("express");
const cors = require("cors");
require("dotenv").config();
const agentRoute = require("./routes/agent");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.URL_FRONTEND,
    methods: ["POST"],
    credentials: true,
  })
);

app.use("/api", agentRoute);
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
