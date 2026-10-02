import { SlashCommandBuilder, type ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('mog')
  .setDescription('Post a random mogging GIF.');

function getGifUrls(): string[] {
  return (process.env.MOG_GIF_URLS ?? '')
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean);
}

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const gifUrls = getGifUrls();

  if (gifUrls.length === 0) {
    await interaction.reply(
      'No mog GIFs are configured yet. Add comma-separated GIF URLs to `MOG_GIF_URLS` in `.env`.',
    );
    return;
  }

  const gifUrl = gifUrls[Math.floor(Math.random() * gifUrls.length)];
  await interaction.reply(gifUrl);
}
