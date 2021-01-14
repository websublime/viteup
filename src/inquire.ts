import { DistinctQuestion, prompt } from 'inquirer';

export async function quiz() {
  const packageNameQuestion: DistinctQuestion = {
    filter: (answer: string) => answer.trim(),
    message: '📦 Enter the new package name:',
    name: 'projectName',
    type: 'input',
    // validate: validateName,
  };
}
