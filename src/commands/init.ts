import { Command } from 'commander';

import { createProjectDirectory, createSkeletonProject, getCommandWorkDir } from '../utils';

async function initAction(command: Command & Commander) {
  const projectDir = await createProjectDirectory(command.project, command.base || getCommandWorkDir());

  await createSkeletonProject(projectDir);

  console.info(`
    🚀 Great!

    You are now ready to launch your new app.
    Please goto your project and run:

    - yarn

    Then create your first app with:
    - vite create --app awesome-app --type vue
  `);
}

export function initCommand(command: Command & Commander) {
  command
    .command('init')
    .description('Create project skeleton')
    .option('--project <name>', 'Project name')
    .option('--base', 'Directory to create it', getCommandWorkDir())
    .action(initAction);
}
