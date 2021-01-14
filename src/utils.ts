/* eslint-disable @typescript-eslint/no-explicit-any */
import { readdir } from 'fs';
import { join, resolve } from 'path';

import { bold, green, red } from 'chalk';
import { copy, ensureDir } from 'fs-extra';

export function banner() {
  return bold(`

██╗   ██╗██╗████████╗███████╗    ██████╗ ██╗     ██╗   ██╗███████╗
██║   ██║██║╚══██╔══╝██╔════╝    ██╔══██╗██║     ██║   ██║██╔════╝
██║   ██║██║   ██║   █████╗█████╗██████╔╝██║     ██║   ██║███████╗
╚██╗ ██╔╝██║   ██║   ██╔══╝╚════╝██╔═══╝ ██║     ██║   ██║╚════██║
 ╚████╔╝ ██║   ██║   ███████╗    ██║     ███████╗╚██████╔╝███████║
  ╚═══╝  ╚═╝   ╚═╝   ╚══════╝    ╚═╝     ╚══════╝ ╚═════╝ ╚══════╝

  `);
}

export function getCommandWorkDir() {
  return process.cwd();
}

export function isEmpty(obj: any) {
  return [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;
}

export function validateEmptyValue(value: unknown, throwError = true) {
  const valueIsEmpty = isEmpty(value);

  if (valueIsEmpty && throwError) {
    throw new Error("🚨 Property value cannot be empty");
  }

  return valueIsEmpty;
}

export function toKebabCase(str: string) {
  const match = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [str.toLowerCase()];
  return match.map(value => value.toLowerCase()).join('-');
}

export function getTemplatesDir() {
  return resolve(join(__dirname, 'templates'));
}

export async function createProjectDirectory(name: string, baseDir: string) {
  validateEmptyValue(name);

  const directory = resolve(join(baseDir, toKebabCase(name)));

  try {
    await ensureDir(directory)
    console.log(green(`📦 Project directory ${name} created!`));
  } catch (error) {
    console.error(red(`Could not create directory: ${directory}`));
    process.exit(1);
  }

  return directory;
}

export async function createSkeletonProject(projectDir: string) {
  let files: string[] = [];

  try {
    files = await new Promise((resolve, reject) => {
      return readdir(join(getTemplatesDir(), 'skeleton'), (error, files) => error != null ? reject(error) : resolve(files))
    });
  } catch (error) {
    console.error(red(`🚨 Could not create skeleton on: ${projectDir}`));
    console.error(error);
    process.exit(1);
  }

  try {
    await Promise.all(files.map(async file => copy(join(getTemplatesDir(), 'skeleton', file), join(projectDir, file))));
  } catch (error) {
    console.error(red(`🚨 Could not create copy skeleton files to: ${projectDir}`));
    console.error(error);
    process.exit(1);
  }

  console.log(green(`📦 Project seed on ${projectDir}`));
}
