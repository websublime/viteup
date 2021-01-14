import { Command, createCommand } from 'commander';

import { validateEmptyValue } from './utils';

const commander = createCommand();

commander.allowUnknownOption(false);

commander
  .version('0.0.1')
  .description('Vue plus multi app');

commander
  .command('create')
  .description('Create application or library')
  .option('--app <name>', 'Create application')
  .option('--type <framework>', 'Type of framework', 'vue')
  .action((command: Command) => {
    const appConfig = new Map();

    validateEmptyValue(command.app);

    appConfig.set('app', command.app);
    appConfig.set('type', command.type);
  });

export {
  commander
}
