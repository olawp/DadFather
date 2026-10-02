# BobDad 💀
💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀
A small Discord bot scaffold built with TypeScript and `discord.js`.
skullblunc
## Setup

1. Create an application and bot at <https://discord.com/developers/applications>.
2. Copy `.env.example` to `.env` and fill in the bot token, application client ID, and (optionally) a development server ID.
3. Install [Bun](https://bun.sh/) if needed, then install dependencies:

   ```sh
   bun install
   ```

4. Register the slash commands:

   ```sh
   bun run register
   ```

5. Start BobDad:

   ```sh
   bun run dev
   ```

For a production-style run, build first and then start the compiled bot:

```sh
bun run build
bun run start
```

GitHub Actions builds the Alpine Docker image automatically for pull requests targeting `main` and for pushes to `main`. The workflow is in `.github/workflows/docker-build.yml`.

Invite the bot with the `bot` and `applications.commands` scopes. The starter commands are `/ping`, `/hello`, `/forever`, and `/mog`.

Configure `/mog` by adding direct GIF URLs to `.env`, separated by commas:

```env
MOG_GIF_URLS=https://example.com/mog-1.gif,https://example.com/mog-2.gif
```

Each time `/mog` is used, BobDad posts one of the configured GIFs at random.

To make BobDad react to one user’s messages with 💀, set `SKULL_USER_ID` to that user’s Discord ID. Enable Developer Mode in Discord, right-click the user, and choose **Copy User ID**. BobDad needs **View Channel**, **Read Message History**, and **Add Reactions** permissions in the channel.

## Adding a command

Create a module in `src/commands` exporting `data` (a `SlashCommandBuilder`) and `execute(interaction)`, then add it to `src/commands/index.ts`. Run `bun run register` after changing command definitions.
