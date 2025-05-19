const http = require('http');
const mineflayer = require('mineflayer');

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: 'mineblock.sdlf.fun',
    port: 25565,
    username: 'pagal',
  });

  bot.on('spawn', () => {
    console.log('Bot has joined the server.');

    // Anti-AFK (jump every 4 minutes)
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 100);
    }, 4 * 60 * 1000);
  });

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('Bot error:', err);
  });
}

createBot();

// ✅ Add this HTTP server at the end of index.js
// It keeps Render Web Service alive
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Mineflayer bot is running!\n');
}).listen(process.env.PORT || 3000);
