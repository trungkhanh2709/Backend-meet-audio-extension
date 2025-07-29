require('dotenv').config();
const WebSocket = require('ws');
const http = require('http');
const { summarizeWithGemini } = require('./services/llm');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  console.log('Client connected');

  ws.on('message', async msg => {
    try {
      const transcript = msg.toString();
      const summary = await summarizeWithGemini(transcript);
      ws.send(summary);
    } catch (err) {
      console.error('Processing error:', err);
      ws.send('Error processing');
    }
  });
});

server.listen(5001, () => console.log('WebSocket server on port 5001'));