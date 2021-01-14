import { bold } from 'chalk';

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

export function validateEmptyValue(value: any, throwError = true) {
  const valueIsEmpty = isEmpty(value);

  if (valueIsEmpty && throwError) {
    throw new Error("Property value cannot be empty");
  }

  return valueIsEmpty;
}
