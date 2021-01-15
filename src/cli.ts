/**
 * @license
 * Copyright Websublime All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://websublime.dev/license
 */

import { red } from 'chalk';

import { commander } from './commands/commander';
import { banner } from './utils';

/**
 * Boot commander cli
 *
 * @private
 */
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
