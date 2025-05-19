const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'mineblock.sdlf.fun',     // ← Change this!
    port: 25565,
    username: 'Naalayaak'      // ← Change this!
  });

  bot.once('spawn', () => {
    bot.chat('/gamemode creative');
    console.log('✅ Bot spawned.');
  });

  setInterval(() => {
    if (bot.entity) {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 100);
    }
  }, 5 * 60 * 1000);

  bot.on('end', () => {
    console.log('❌ Disconnected. Reconnecting...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('❗ Error:', err);
  });
}

createBot();
