const express = require("express");
const router = express.Router();

const axios = require("axios");

router.post("/send-captions", async (req, res) => {
  const { message, captions } = req.body;

  console.log("🔹 Captions:", captions);
  console.log("🔹 Message:", message);

  const formattedTranscript = captions
    .map((cap) => `[${cap.time}] ${cap.person}: ${cap.text}`)
    .join("\n");

  const prompt = `
Dưới đây là toàn bộ nội dung cuộc họp được trích xuất từ Google Meet:

${formattedTranscript}

Người dùng có ghi chú: "${message}"

Hãy dựa trên nội dung cuộc họp để trả lời yêu cầu hoặc câu hỏi của người dùng. Nếu không đủ thông tin, hãy phản hồi rõ ràng rằng "chưa đủ thông tin".
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
    console.log("✅ Phản hồi từ Gemini:");
console.log(aiReply);
    res.status(200).json({
      message: "✅ Đã gửi vào Gemini thành công",
      aiReply: aiReply || "❌ Không có phản hồi từ AI",
    });
  } catch (error) {
    console.error("❌ Lỗi gọi Gemini:", error.response?.data || error.message);
    res.status(500).json({ error: "Lỗi khi gọi Gemini API" });
  }
});

module.exports = router;
