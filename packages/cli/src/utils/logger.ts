import chalk from 'chalk';

export const logger = {
  info: (message: string) => {
    console.log(chalk.blue('ℹ'), message);
  },

  success: (message: string) => {
    console.log(chalk.green('✔'), message);
  },

  warn: (message: string) => {
    console.log(chalk.yellow('⚠'), message);
  },

  error: (message: string) => {
    console.log(chalk.red('✖'), message);
  },

  break: () => {
    console.log('');
  },

  log: (message: string) => {
    console.log(message);
  },

  title: (message: string) => {
    console.log('');
    console.log(chalk.bold.cyan(message));
    console.log('');
  },

  step: (step: number, total: number, message: string) => {
    console.log(chalk.gray(`[${step}/${total}]`), message);
  },
};
