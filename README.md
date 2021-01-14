# vite-plus

Vite cli tool to create multiple apps. Opinated tool. Uses vue api and extends is commands.

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
      "skipFiles": [
        "<node_internals>/**"
      ],
      "env": {
        "TS_NODE_FILES": "true",
        "TS_NODE_PROJECT": "./tsconfig.json"
      }
  }
  ]
}
```
