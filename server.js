// backend/server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const agentRoute = require("./routes/agent");

const app = express();
const PORT= process.env.PORT;
app.use(bodyParser.json());

app.use(
  cors()
);


app.use("/api", agentRoute);


app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
