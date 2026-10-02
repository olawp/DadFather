import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  type ChatInputCommandInteraction,
} from 'discord.js';
import { commandMap } from './commands/index.js';
import { config } from './config.js';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
const commands = new Collection(commandMap);

client.once(Events.ClientReady, (readyClient) => {
  console.log(`BobDad is online as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) {
    await interaction.reply({ content: 'That command is not available.', ephemeral: true });
    return;
  }

  try {
      await command.execute(interaction as ChatInputCommandInteraction);
  } catch (error) {
    console.error(`Command /${interaction.commandName} failed:`, error);
    const message = 'Something went wrong while running that command.';
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: message, ephemeral: true });
    } else {
      await interaction.reply({ content: message, ephemeral: true });
    }
  }
});

client.on(Events.MessageCreate, async (message) => {
  if (
    !config.skullUserId ||
    message.author.bot ||
    message.author.id !== config.skullUserId
  ) {
    return;
  }

  try {
    const emoji = Math.random() < 0.05 ? '☠️' : '💀';
    await message.react(emoji);
  } catch (error) {
    console.error('Could not add the skull reaction:', error);
  }
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

await client.login(config.token);
