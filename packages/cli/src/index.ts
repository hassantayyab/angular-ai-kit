#!/usr/bin/env node

import { Command } from 'commander';
import { addCommand } from './commands/add.js';
import { initCommand } from './commands/init.js';
import { listCommand } from './commands/list.js';

const program = new Command();

program
  .name('angular-ai-kit')
  .description('Add Angular AI Kit components to your project')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize Angular AI Kit in your project')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('-c, --cwd <path>', 'Working directory', process.cwd())
  .action(initCommand);

program
  .command('add')
  .description('Add a component to your project')
  .argument('[components...]', 'Components to add')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('-o, --overwrite', 'Overwrite existing files')
  .option('-a, --all', 'Add all components')
  .option('-p, --path <path>', 'Path to add components to')
  .option('-c, --cwd <path>', 'Working directory', process.cwd())
  .action(addCommand);

program
  .command('list')
  .description('List all available components')
  .option('-c, --cwd <path>', 'Working directory', process.cwd())
  .option('-i, --installed', 'Show only installed components')
  .option('--category <category>', 'Filter by category (chat, display, ui)')
  .action(listCommand);

program.parse();
