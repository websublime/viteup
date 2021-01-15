/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @license
 * Copyright Websublime All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://websublime.dev/license
 */

import { readdir } from 'fs';
import { join, resolve } from 'path';

import { bold, green, red } from 'chalk';
import { copy, ensureDir, readJson, writeJson } from 'fs-extra';

/**
 * Show banner on cli tool.
 *
 * @public
 */
export function banner() {
  return bold(`

  ██╗   ██╗██╗████████╗███████╗██╗   ██╗██████╗
  ██║   ██║██║╚══██╔══╝██╔════╝██║   ██║██╔══██╗
  ██║   ██║██║   ██║   █████╗  ██║   ██║██████╔╝
  ╚██╗ ██╔╝██║   ██║   ██╔══╝  ██║   ██║██╔═══╝
   ╚████╔╝ ██║   ██║   ███████╗╚██████╔╝██║
    ╚═══╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝ ╚═╝

  `);
}

/**
 * Obtain current directory, where cli was executed.
 *
 * @public
 */
export function getCommandWorkDir() {
  return process.cwd();
}

/**
 * Test value is undefined or null.
 *
 * @param obj - Value to test
 * @public
 */
export function isEmpty(obj: any) {
  return [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;
}

/**
 * Validates a value.
 *
 * @param value - Value to test
 * @param property - Property name of the value
 * @param throwError - Should throw error
 * @public
 */
export function validateEmptyValue(value: unknown, property = 'value', throwError = true) {
  const valueIsEmpty = isEmpty(value);

  if (valueIsEmpty && throwError) {
    throw new Error(`🚨 Property --${property} cannot be empty`);
  }

  return valueIsEmpty;
}

/**
 * Transform to kebabCase.
 *
 * @param str - Phrase or words
 * @public
 */
export function toKebabCase(str: string) {
  const match = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [str.toLowerCase()];
  return match.map(value => value.toLowerCase()).join('-');
}

/**
 * Gets templates directory.
 *
 * @public
 */
export function getTemplatesDir() {
  return resolve(join(__dirname, 'templates'));
}

/**
 * Creates a directory.
 *
 * @param name - Directory name
 * @param baseDir - Where to create
 * @public
 */
export async function createProjectDirectory(name: string, baseDir: string) {
  validateEmptyValue(name);

  const directory = resolve(join(baseDir, toKebabCase(name)));

  try {
    await ensureDir(directory)
    console.log(green(`📦  Directory ${name} created!`));
  } catch (error) {
    console.error(red(`Could not create directory: ${directory}`));
    process.exit(1);
  }

  return directory;
}

/**
 * Copies files to directory.
 *
 * @param projectDir - Destination directory
 * @public
 */
export async function createSkeletons(projectDir: string, type = 'skeleton') {
  let files: string[] = [];

  try {
    files = await new Promise((resolve, reject) => {
      return readdir(join(getTemplatesDir(), type), (error, files) => error != null ? reject(error) : resolve(files))
    });
  } catch (error) {
    console.error(red(`🚨 Could not read templates for: ${type}`));
    console.error(error);
    process.exit(1);
  }

  try {
    await Promise.all(files.map(async file => copy(join(getTemplatesDir(), type, file), join(projectDir, file))));
  } catch (error) {
    console.error(red(`🚨 Could not create copy files to: ${projectDir}`));
    console.error(error);
    process.exit(1);
  }

  console.log(green(`📦  Files copied to: ${projectDir}`));
}

/**
 * Reads json file
 *
 * @param projectDir - Directory to look
 * @param filename - Json filename
 * @public
 */
export async function readJsonFile<JsonSchema extends Record<string, any>>(
  projectDir: string,
  filename: string
): Promise<JsonSchema> {

  try {
    return await readJson(join(projectDir, filename))
  } catch (error) {
    console.error(red(`🚨 Could not read json file in: ${projectDir}`));
    console.error(error);
    process.exit(1);
  }
}

/**
 * Write json file.
 *
 * @param projectDir - Destination directory
 * @param schema - Schema to write in json file
 * @param filename - Json filename
 * @public
 */
export async function writeJsonFile(projectDir: string, schema: Record<string, any>, filename: string) {
  try {
    await writeJson(join(projectDir, filename), schema, { spaces: 2, EOL: '\r\n' });
  } catch (error) {
    console.error(red(`🚨 Could not write json file in: ${projectDir}`));
    console.error(error);
    process.exit(1);
  }
}
