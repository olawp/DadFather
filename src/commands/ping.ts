import { SlashCommandBuilder, type ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Check whether BobDad is online.');

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  await interaction.reply(`Pong! Latency: ${interaction.client.ws.ping}ms`);
}
