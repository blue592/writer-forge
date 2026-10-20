#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createProject, genres } from './templates.js';
import { backup, countText, expressionHints, flowCheck } from './writing.js';

export async function main(argv = process.argv.slice(2)) {
  if (argv.includes('--help') || !argv[0]) return console.log('writer-forge init --genre screenplay --title "My Story" --out story.json\nwriter-forge genres');
  if (argv[0] === 'genres') return Object.entries(genres).forEach(([key, value]) => console.log(`${key}\t${value.title}`));
  if (argv[0] === 'count' || argv[0] === 'flow' || argv[0] === 'hints' || argv[0] === 'backup') { const file = argv[1]; if (!file) throw new Error('A file is required'); if (argv[0] === 'backup') return console.log(`Backup: ${await backup(path.resolve(file))}`); const text = await fs.readFile(file, 'utf8'); console.log(JSON.stringify(argv[0] === 'count' ? countText(text) : argv[0] === 'flow' ? flowCheck(text) : expressionHints(argv[2] || ''), null, 2)); return; }
  if (argv[0] !== 'init') throw new Error(`Unknown command: ${argv[0]}`);
  const genre = argv[argv.indexOf('--genre') + 1]; const title = argv.includes('--title') ? argv[argv.indexOf('--title') + 1] : '새 글'; const out = argv.includes('--out') ? argv[argv.indexOf('--out') + 1] : 'story.json';
  await fs.writeFile(path.resolve(out), `${JSON.stringify(createProject(genre, title), null, 2)}\n`, { mode: 0o600 }); console.log(`Created ${path.resolve(out)}`);
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main().catch(error => { console.error(`Error: ${error.message}`); process.exitCode = 1; });

