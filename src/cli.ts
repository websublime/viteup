import { red } from 'chalk';

import { commander } from './commands';
import { banner } from './utils';

(async () => {
  console.log(banner());

  const parsed = await commander.parseAsync(process.argv);
  const { args = [] } = parsed;

  if (args.length < 1) {
    commander.outputHelp();
  }
})().catch((err: Error) => {
  console.error(`⚠️ ${red(err.message)}`);

  process.exit(1);
});
