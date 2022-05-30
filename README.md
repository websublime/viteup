```

  ██╗   ██╗██╗████████╗███████╗██╗   ██╗██████╗
  ██║   ██║██║╚══██╔══╝██╔════╝██║   ██║██╔══██╗
  ██║   ██║██║   ██║   █████╗  ██║   ██║██████╔╝
  ╚██╗ ██╔╝██║   ██║   ██╔══╝  ██║   ██║██╔═══╝
   ╚████╔╝ ██║   ██║   ███████╗╚██████╔╝██║
    ╚═══╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝ ╚═╝

```

Enhanced Vite cli tool to create multiple apps and mange like monorepo.

Current: Deprecated (was POC)
If you need such tool please use [VTX](https://github.com/miguelramos/vtx) instead

# Usage

Cli have global options that you can use in any viteup command.

```bash
Usage: viteup [options] [command]

Vite monorepo apps

Options:
  -V, --version           output the version number
  -c, --config <file>     [string] use specified config file (default: "vite.config")
  -r, --root <path>       [string] use specified root directory (default: ".")
  -l, --logLevel <level>  [string] silent | error | warn | all (default: "all")
  --clearScreen           [boolean] allow/disable clear screen when logging (default: false)
  -d, --debug [feat]      [string | boolean] show debug logs (default: false)
  -f, --filter <filter>   [string] filter debug logs
  -h, --help              display help for command

Commands:
  init [options]          Create project skeleton
  create [options]        Create application or library
  help [command]          display help for command
```

### `$ viteup init`

Inits a project directory and main files for apps and libraries

```bash
Usage: viteup init [options]

Create project skeleton

Options:
  --project <name>  [string] Project name
  -h, --help        display help for command
```

### `$ viteup create`

Creates application or library on a vit project

```bash
Usage: viteup create [options]

Create application or library

Options:
  --app <name>             [string] Create application
  --lib <name>             [string] Create library
  --type <framework>       [vue] Type of framework (default: "vue")
  --namespace <namespace>  [string] Namespace path
  -h, --help               display help for command
```

# Develop

Clone repo and use yarn to install

How to debug:

Have cli.ts file open on Vscode and use this config for launch.json

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Current TS File",
      "type": "node",
      "request": "launch",
      "args": ["${relativeFile}", "init", "--project", "test"],
      "preLaunchTask": "npm: build",
      "runtimeArgs": ["--nolazy", "-r", "ts-node/register"],
      "sourceMaps": true,
      "cwd": "${workspaceRoot}",
      "protocol": "inspector",
      "skipFiles": ["<node_internals>/**"],
      "env": {
        "TS_NODE_FILES": "true",
        "TS_NODE_PROJECT": "./tsconfig.json"
      }
    }
  ]
}
```
