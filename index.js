const mineflayer = require('mineflayer');

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: 'mineblock.sdlf.fun',
    port: 25565,
    username: 'pagal',
    // auth: 'microsoft' // Uncomment if needed
  });

  bot.on('spawn', () => {
    console.log('Bot spawned in the game.');

    // Anti-AFK: jump every 4 minutes
    setInterval(() => {
      if (bot.entity) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 100);
      }
    }, 4 * 60 * 1000);
  });

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('Error:', err);
  });
}

createBot();
