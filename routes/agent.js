const express = require("express");
const router = express.Router();
const { GeminiChatAgent } = require("../llm");

router.post("/agent", async (req, res) => {
  try {
    const { transcript } = req.body;
    const summary = await GeminiChatAgent(transcript);
    res.json({ summary });
  } catch (error) {
    console.error("Lỗi Agent:", error.message);
    res.status(500).json({ error: "Lỗi xử lý Agent" });
  }
});

module.exports = router;
