const express = require("express");
const router = express.Router();

const axios = require("axios");

router.post("/send-captions", async (req, res) => {
  const { message, captions } = req.body;

  const formattedTranscript = captions
    .map((cap) => `[${cap.time}] ${cap.person}: ${cap.text}`)
    .join("\n");

  const prompt = `
Here is the full content of the meeting extracted from Google Meet:

${formattedTranscript}

User notes: "${message}"

Please use the meeting content to respond to the user's request or question. If the information is insufficient, clearly respond with "not enough information."
`;
  console.log("prompt ", prompt);

  try {
    const geminiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );
    const aiReply =
      geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("Gemini response:");
console.log(aiReply);
    res.status(200).json({
      message: "Successfully sent to Gemini.",
      aiReply: aiReply || "No response from AI.",
    });
  } catch (error) {
    console.error("Error calling Gemini:", error.response?.data || error.message);
    res.status(500).json({ error: "Error calling Gemini API" });
  }
});

module.exports = router;
