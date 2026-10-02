import * as hello from './hello.js';
import * as forever from './forever.js';
import * as mog from './mog.js';
import * as ping from './ping.js';

export const commands = [forever, hello, mog, ping];

export const commandMap = new Map(
  commands.map((command) => [command.data.name, command]),
);
