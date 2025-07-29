const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function GeminiChatAgent(htmlContent) {
  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

  const prompt = `
    Bạn là trợ lý AI. Hãy tóm tắt nội dung sau cho người dùng phổ thông:
    ${htmlContent}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

module.exports = { GeminiChatAgent };
