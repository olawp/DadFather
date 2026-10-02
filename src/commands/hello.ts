import { SlashCommandBuilder, type ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('hello')
  .setDescription('Say hello to BobDad.');

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  await interaction.reply(`Hey ${interaction.user}, BobDad is here!`);
}
