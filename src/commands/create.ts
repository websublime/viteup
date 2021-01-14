import type { Command } from 'commander';

import { validateEmptyValue } from '../utils';

export function createCommand(command: Commander & Command) {
  command
    .command('create')
    .description('Create application or library')
    .option('--app <name>', 'Create application')
    .option('--type <framework>', 'Type of framework', 'vue')
    .action((command: Commander) => {
      const appConfig = new Map();

      validateEmptyValue(command.app);

      appConfig.set('app', command.app);
      appConfig.set('type', command.type);
    });
}
