import { Command, createCommand } from 'commander';

import { createCommand as createrCommand} from './create';
import { initCommand } from './init';

const commander = createCommand() as Command & Commander;

commander.allowUnknownOption(false);

commander
  .version('0.0.1')
  .description('Vue plus multi app');

initCommand(commander);
createrCommand(commander);

export {
  commander
}
