import { SlashCommandBuilder, type ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('mog')
  .setDescription('Post a random mogging GIF.');

export function parseGifUrls(value: string | undefined): string[] {
  return (value ?? '')
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean);
}

function getGifUrls(): string[] {
  return parseGifUrls(process.env.MOG_GIF_URLS);
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
