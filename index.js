const { Client, GatewayIntentBits, Events, REST, Routes, SlashCommandBuilder } = require('discord.js');
const http = require('http');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Servidor HTTP simple para mantener el bot activo
const server = http.createServer((req, res) => {
  if (req.url === '/ping') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Bot Status: ${client.user ? 'Online' : 'Offline'}\nUptime: ${process.uptime()} seconds`);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Discord Bot is running!');
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

// Manejo mejorado de eventos del bot
client.once(Events.ClientReady, () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
  console.log(`🌐 Servidor web activo en puerto 5000`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  
  try {
    if (interaction.commandName === 'ping') {
      await interaction.reply('🏓 Pong! Bot funcionando correctamente.');
    }
  } catch (error) {
    console.error('Error al procesar comando:', error);
    if (!interaction.replied) {
      await interaction.reply('❌ Ocurrió un error al procesar el comando.');
    }
  }
});

// Manejo de errores y reconexión
client.on('error', error => {
  console.error('Error del cliente Discord:', error);
});

client.on('warn', warning => {
  console.warn('Advertencia del cliente Discord:', warning);
});

client.on('shardDisconnect', () => {
  console.log('⚠️  Bot desconectado. Intentando reconectar...');
});

client.on('shardError', (error) => {
  console.error('🔄 Error de conexión:', error);
});

// Iniciar sesión del bot con manejo de errores
async function startBot() {
  try {
    await client.login(process.env.TOKEN);
  } catch (error) {
    console.error('❌ Error al iniciar el bot:', error);
    // Reintentar en 5 segundos
    setTimeout(startBot, 5000);
  }
}

startBot();

// Register slash command
const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('Slash command registered!');
  } catch (error) {
    console.error(error);
  }
})();
