/**
 * @license
 * Copyright Websublime All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://websublime.dev/license
 */

declare interface GlobalOptions {
  config: string;
  root: string;
  logLevel: string;
  clearScreen: boolean;
  debug: string;
  filter: string;
}

declare interface InitOptions {
  project?: string;
}

declare interface CreateOptions {
  app?: string;
  lib?: string;
  type?: string;
  namespace?: string;
}

declare type Schema = {
  project: {
    name: string;
    dir: string;
  };
  defaults?: string;
  apps?: {
    [key: string]: {
      root: string;
      port: number;
      ssr: boolean;
      type?: string;
    }
  };
};

declare interface CreateApp {
  projectDir: string;
  json: Record<string, any>;
  tsconfig: Record<string, any>;
}
