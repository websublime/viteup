import { red } from 'chalk';
import type { Command } from 'commander';

import { getCommandWorkDir } from '../utils';

enum TYPE {
  'LIB',
  'APP'
}

async function initCreate(command: Command & Commander) {
  if (!command.app || !command.lib) {
    console.error(red('🚨 Please choose argument: --app or --lib to create.'));
    process.exit(1);
  }

  command.app ? TYPE.APP : TYPE.LIB;
}

export function createCommand(command: Commander & Command) {
  command
    .command('create')
    .description('Create application or library')
    .option('--app <name>', 'Create application')
    .option('--lib <name>', 'Create library')
    .option('--type <framework>', 'Type of framework', 'vue')
    .option('--base', 'Directory to create it', getCommandWorkDir())
    .action(initCreate);
}
