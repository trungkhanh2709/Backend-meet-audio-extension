const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function summarizeWithGemini(text) {
  const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });
  const prompt = `Tóm tắt nội dung sau:\n${text}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

module.exports = { summarizeWithGemini };