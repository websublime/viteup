/**
 * @license
 * Copyright Websublime All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://websublime.dev/license
 */

import { relative } from 'path';

import { Command } from 'commander';

import {
  createProjectDirectory,
  createSkeletons,
  readJsonFile,
  validateEmptyValue,
  writeJsonFile
} from '../utils';

/**
 * Creats project directory and seeds directory with template files
 * for init a project.
 *
 * @param command - Commander instance
 * @param options - Global options
 * @public
 */
async function initAction(command: Command & InitOptions, options: GlobalOptions) {
  validateEmptyValue(command.project, 'project');

  const projectDir = await createProjectDirectory(command.project as string, options.root);

  await createSkeletons(projectDir);

  const schema = await readJsonFile(projectDir, 'vue.json');
  const pkg = await readJsonFile(projectDir, 'package.json');

  const jsonSchema: Schema = {
    project: {
      name: command.project as string,
      dir: relative(options.root, projectDir)
    }
  }

  const jsonPkg = {
    name: command.project as string
  }

  writeJsonFile(projectDir, { ...schema, ...jsonSchema }, 'vue.json');
  writeJsonFile(projectDir, { ...pkg, ...jsonPkg }, 'package.json');

  console.info(`
    🚀 Great!

    You are now ready to launch your new app.
    Please goto your project and run:

    - yarn

    Then create your first app with:

    $ viteup create --app awesome-app --type vue
  `);
}

/**
 * Setup init command. Flags are:
 *
 * - project: Gives project name
 *
 * @param command - Commander instance
 * @param globalOptions - Global options
 * @public
 */
export function setupInitCommand(command: Command & InitOptions, globalOptions: GlobalOptions) {
  command
    .command('init')
    .description('Create project skeleton')
    .option('--project <name>', '[string] Project name')
    .action((cmd) => initAction(cmd, globalOptions));
}
