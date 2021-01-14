import { createCommand } from 'commander';

const commander = createCommand();

commander.allowUnknownOption(false);

commander
  .version('0.0.1')
  .description('Vue plus multi app');

commander
  .command('create')
  .description('Create application or library')
  .option('--app <name>', 'Create application')
  .action((...args) => {
    console.log(args);
  });

export {
  commander
}
