'use strict';

/**
 * ✨💎 TACKY BOT 3000 💎✨
 * The most garish, neon-colored, airhorn-blasting Discord bot you never asked for.
 */

const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const { bedazzle } = require('./tackyTheme');
const path  = require('path');
const fs    = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const TOKEN      = process.env.DISCORD_TOKEN;
const CLIENT_ID  = process.env.DISCORD_CLIENT_ID;
const GUILD_ID   = process.env.DISCORD_GUILD_ID; // optional: for guild-scoped instant registration

// ---------------------------------------------------------------------------
// Load commands
// ---------------------------------------------------------------------------
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  if (command.data && command.execute) {
    client.commands.set(command.data.name, command);
    console.log(`${bedazzle('LOADED')} /${command.data.name}`);
  }
}

// ---------------------------------------------------------------------------
// Register slash commands with Discord
// ---------------------------------------------------------------------------
async function registerCommands() {
  if (!TOKEN || !CLIENT_ID) {
    console.warn('⚠️  DISCORD_TOKEN or DISCORD_CLIENT_ID not set — skipping command registration.');
    return;
  }

  const rest    = new REST({ version: '10' }).setToken(TOKEN);
  const payload = client.commands.map(c => c.data.toJSON());

  try {
    if (GUILD_ID) {
      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: payload });
      console.log(`${bedazzle('REGISTERED')} ${payload.length} guild command(s) in ${GUILD_ID}`);
    } else {
      await rest.put(Routes.applicationCommands(CLIENT_ID), { body: payload });
      console.log(`${bedazzle('REGISTERED')} ${payload.length} global command(s) — may take up to 1 hour to propagate`);
    }
  } catch (err) {
    console.error('Failed to register commands:', err);
  }
}

// ---------------------------------------------------------------------------
// Event handlers
// ---------------------------------------------------------------------------
client.once('ready', async () => {
  console.log(`\n${bedazzle('TACKY BOT 3000 IS ONLINE')}`);
  console.log(`Logged in as ${client.user.tag} 🎺\n`);
  client.user.setActivity('🎺 /airhorn | /tacky | /partymode', { type: 0 });
  await registerCommands();
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(`Error executing /${interaction.commandName}:`, err);
    const msg = { content: '💥 Something exploded!! Even the error is tacky!!', ephemeral: true };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(msg);
    } else {
      await interaction.reply(msg);
    }
  }
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
if (!TOKEN) {
  console.error('❌ DISCORD_TOKEN is not set. Add it to your .env file and try again.');
  process.exit(1);
}

client.login(TOKEN);
