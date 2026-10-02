import { SlashCommandBuilder, type ChatInputCommandInteraction } from 'discord.js';

// WoW: Forever launches at 3:00 PM PST on November 4, 2026.
// This is midnight on November 5, 2026 in Oslo (CET).
const launchAt = new Date('2026-11-04T23:00:00.000Z');

export const data = new SlashCommandBuilder()
  .setName('forever')
  .setDescription('Show the countdown to the WoW: Forever launch.');

function countdown(): string {
  const remainingSeconds = Math.max(
    0,
    Math.floor((launchAt.getTime() - Date.now()) / 1000),
  );
  const days = Math.floor(remainingSeconds / 86_400);
  const hours = Math.floor((remainingSeconds % 86_400) / 3_600);
  const minutes = Math.floor((remainingSeconds % 3_600) / 60);
  const seconds = remainingSeconds % 60;

  return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
}

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const osloLaunchTime = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Europe/Oslo',
  }).format(launchAt);

  if (Date.now() >= launchAt.getTime()) {
    await interaction.reply(
      `WoW: Forever has launched! It launched at ${osloLaunchTime}.`,
    );
    return;
  }

  await interaction.reply(
    [
      `**WoW: Forever launches in: ${countdown()}**`,
      `Launch time in Oslo: **${osloLaunchTime}**`,
    ].join('\n'),
  );
}
