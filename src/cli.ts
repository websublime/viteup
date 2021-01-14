import { red } from 'chalk';

import { commander } from './commands/commander';
import { banner } from './utils';

async function boot() {
  console.log(banner());

  const parsed = await commander.parseAsync(process.argv);
  const { args = [] } = parsed;

  if (args.length < 1) {
    commander.outputHelp();
  }
}

boot().catch((err: Error) => {
  console.error(`⚠️  ${red(err.message)}`);

  process.exit(1);
});
