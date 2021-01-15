/**
 * @license
 * Copyright Websublime All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://websublime.dev/license
 */

import { join, relative } from 'path';

import { green, red } from 'chalk';
import type { Command } from 'commander';
import { pathExists } from 'fs-extra';

import {
  createProjectDirectory,
  createSkeletons,
  readJsonFile,
  toKebabCase,
  writeJsonFile
} from '../utils';

const DEFAULT_PORT = 3000;

/**
 * Verify request is app
 *
 * @param command - Commander instance
 * @private
 */
function isApp(command: Command & CreateOptions) {
  return !!command.app;
}

/**
 * Verify request is library
 *
 * @param command - Commander instance
 * @private
 */
function isLib(command: Command & CreateOptions) {
  return !!command.lib;
}

/**
 * Verify required resources to create app/lib
 *
 * @param command - Commander instance
 * @param options - Global options
 * @private
 */
function validateBeforeCreate(command: Command & CreateOptions, options: GlobalOptions) {
  const schemaFile = join(options.root, 'vue.json');

  if (!command.app && !command.lib) {
    console.error(red('🚨 Please choose argument: --app or --lib to create.'));
    process.exit(1);
  }

  if (!pathExists(schemaFile)) {
    console.error(red('🚨 Please run creat command on a vite project folder.'));
    process.exit(1);
  }
}

/**
 * Creates definition object and content to create
 * application or library.
 *
 * @param command - Commander instance
 * @param options - App/Lib options
 * @private
 */
async function createAppLib(command: Command & CreateOptions, options: CreateApp) {
  const name = isApp(command) ? command.app as string : command.lib as string;
  const { json, projectDir, tsconfig } = options;

  const appKeys = Object.keys(json.apps || {});
  const appDirectory = await createProjectDirectory(name, join(projectDir, isApp(command) ? 'apps' : 'libs'));
  const ports = appKeys.length ? appKeys.map(key => json.apps ? Number(json.apps[key].port) : 0) : [0];
  const port = Math.max(...ports) > 0 ? Math.max(...ports) + 1 : DEFAULT_PORT;
  const namespace = command.namespace ? command.namespace : name;

  if (isApp(command)) {
    json.defaults = json.defaults ? json.defaults : toKebabCase(name);
  }

  const apps = {
    ...json.apps,
    ...{
      [`${toKebabCase(name)}`]: isApp(command) ? {
        port,
        root: relative(projectDir, appDirectory),
        ssr: false,
        type: 'app',
        namespace
      } : {
          root: relative(projectDir, appDirectory),
          type: 'lib',
          namespace
        }
    }
  }

  const paths = {
    ...tsconfig.compilerOptions.paths,
    [`/${namespace}/*`]: [join(relative(projectDir, appDirectory), 'src/*')]
  }

  return {
    apps,
    appDirectory,
    paths
  }
}

/**
 * Initialize and write files to create application or library.
 *
 * @param command - Commander instance
 * @param options - Global options
 * @private
 */
async function initCreate(command: Command & CreateOptions, options: GlobalOptions) {
  validateBeforeCreate(command, options);

  const projectDir = options.root;
  const name = isApp(command) ? command.app as string : command.lib as string;
  const json = await readJsonFile(projectDir, 'vue.json');
  const tsconfig = await readJsonFile(projectDir, 'tsconfig.json');

  if (isApp(command)) {
    const { apps, appDirectory, paths } = await createAppLib(command, { json, projectDir, tsconfig });

    try {
      await writeJsonFile(projectDir, { ...tsconfig, ...{ compilerOptions: { ...tsconfig.compilerOptions, paths } } }, 'tsconfig.json');
      await writeJsonFile(projectDir, { ...json, ...{ apps } }, 'vue.json');
      console.info(green(`🍺  Schema file updated... Seed will start!`));
    } catch (error) {
      console.error(red('🚨  Unable to write/update on vue.json file.'));
      process.exit(1);
    }

    try {
      await createSkeletons(appDirectory, 'vue-app');
      console.info(green(`
      💥 BOOM! Congratulations.

      Your new app ${name} is ready.
      Run your application with:

      $ viteup serve --app ${name}
      `));
    } catch (error) {
      console.error(red(`🚨  Unable to create project: ${name}.`));
      process.exit(1);
    }
  }

  if (isLib(command)) {
    const { apps, appDirectory, paths } = await createAppLib(command, { json, projectDir, tsconfig });

    try {
      await writeJsonFile(projectDir, { ...tsconfig, ...{ compilerOptions: { ...tsconfig.compilerOptions, paths } } }, 'tsconfig.json');
      await writeJsonFile(projectDir, { ...json, ...{ apps } }, 'vue.json');
      console.info(green(`🍺  Schema file updated... Seed will start!`));
    } catch (error) {
      console.error(red('🚨  Unable to write/update on vue.json file.'));
      process.exit(1);
    }

    try {
      await createSkeletons(appDirectory, 'vue-lib');
      const pkg = await readJsonFile(appDirectory, 'package.json');

      await writeJsonFile(appDirectory, { ...pkg, ...{ name } }, 'package.json');
    } catch (error) {
      console.error(red(`🚨  Unable to create project: ${name}.`));
      process.exit(1);
    }
  }
}

/**
 * Setup command create.
 *
 * @param command - Commander instance
 * @param globalOptions - Global options
 * @public
 */
export function setupCreateCommand(command: Command & CreateOptions, globalOptions: GlobalOptions) {
  command
    .command('create')
    .description('Create application or library')
    .option('--app <name>', '[string] Create application')
    .option('--lib <name>', '[string] Create library')
    .option('--type <framework>', '[vue] Type of framework', 'vue')
    .option('--namespace <namespace>', '[string] Namespace path')
    .action((cmd) => initCreate(cmd, globalOptions));
}
