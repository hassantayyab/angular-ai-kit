import chalk from 'chalk';
import fs from 'fs-extra';
import ora from 'ora';
import path from 'path';
import prompts from 'prompts';
import { type AiKitConfig, getProjectInfo } from '../utils/get-project-info.js';
import { logger } from '../utils/logger.js';

/**
 * Default configuration for angular-ai-kit
 */
const DEFAULT_CONFIG: AiKitConfig = {
  $schema:
    'https://raw.githubusercontent.com/hassantayyab/angular-ai-kit/main/packages/cli/schema.json',
  componentsPath: 'src/app/components/ai-kit',
  typescript: true,
  tailwind: {
    config: 'tailwind.config.js',
    css: 'src/styles.css',
  },
  aliases: {
    components: '@/components/ai-kit',
    utils: '@angular-ai-kit/utils',
  },
};

/**
 * CSS imports to add to the styles file
 */
const CSS_IMPORTS = `/* Angular AI Kit - CSS Variables */
:root {
  --ai-background: theme('colors.zinc.50');
  --ai-foreground: theme('colors.zinc.950');
  --ai-card: theme('colors.white');
  --ai-card-foreground: theme('colors.zinc.950');
  --ai-muted: theme('colors.zinc.100');
  --ai-muted-foreground: theme('colors.zinc.500');
  --ai-border: theme('colors.zinc.200');
  --ai-ring: theme('colors.zinc.400');
}

.dark {
  --ai-background: theme('colors.zinc.950');
  --ai-foreground: theme('colors.zinc.50');
  --ai-card: theme('colors.zinc.900');
  --ai-card-foreground: theme('colors.zinc.50');
  --ai-muted: theme('colors.zinc.800');
  --ai-muted-foreground: theme('colors.zinc.400');
  --ai-border: theme('colors.zinc.800');
  --ai-ring: theme('colors.zinc.600');
}
`;

/**
 * Initialize Angular AI Kit in a project
 */
export async function initCommand(options: { cwd?: string; yes?: boolean }) {
  const cwd = options.cwd ?? process.cwd();

  logger.title('Angular AI Kit Initialization');

  // Step 1: Check project info
  const spinner = ora('Analyzing project...').start();
  const projectInfo = await getProjectInfo(cwd);
  spinner.stop();

  // Validate Angular project
  if (!projectInfo.isAngularProject) {
    logger.error('This directory is not an Angular project.');
    logger.info('Please run this command from the root of an Angular project.');
    process.exit(1);
  }

  // Check Angular version (v19+)
  if (projectInfo.angularVersion) {
    const majorVersion = parseInt(projectInfo.angularVersion.split('.')[0], 10);
    if (majorVersion < 19) {
      logger.error(`Angular v${majorVersion} is not supported.`);
      logger.info('Angular AI Kit requires Angular v19 or later.');
      process.exit(1);
    }
    logger.success(`Angular v${projectInfo.angularVersion} detected`);
  }

  // Check Tailwind CSS
  if (projectInfo.hasTailwind) {
    logger.success(
      `Tailwind CSS${projectInfo.tailwindVersion ? ` v${projectInfo.tailwindVersion}` : ''} detected`
    );
  } else {
    logger.warn('Tailwind CSS not detected.');
    logger.info('Angular AI Kit works best with Tailwind CSS v4.');
    logger.info(
      'Visit: https://tailwindcss.com/docs/installation/framework-guides/angular'
    );
    logger.break();
  }

  // Step 2: Gather configuration
  const config = { ...DEFAULT_CONFIG };

  if (!options.yes) {
    const responses = await prompts([
      {
        type: 'text',
        name: 'componentsPath',
        message: 'Where would you like to install components?',
        initial: DEFAULT_CONFIG.componentsPath,
      },
      {
        type: 'text',
        name: 'stylesPath',
        message: 'Where is your global CSS file?',
        initial: projectInfo.stylesPath.replace(cwd + '/', ''),
      },
      {
        type: 'confirm',
        name: 'addCssVariables',
        message: 'Add CSS variables for theming?',
        initial: true,
      },
    ]);

    if (responses.componentsPath) {
      config.componentsPath = responses.componentsPath;
    }
    if (responses.stylesPath) {
      config.tailwind.css = responses.stylesPath;
    }
  }

  // Step 3: Create configuration file
  const configPath = path.join(cwd, 'angular-ai-kit.config.json');

  if (await fs.pathExists(configPath)) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'Config file already exists. Overwrite?',
      initial: false,
    });

    if (!overwrite) {
      logger.info('Initialization cancelled.');
      return;
    }
  }

  const createSpinner = ora('Creating configuration...').start();

  try {
    // Write config file
    await fs.writeJson(configPath, config, { spaces: 2 });
    createSpinner.succeed('Created angular-ai-kit.config.json');

    // Create components directory
    const componentsDir = path.join(cwd, config.componentsPath);
    await fs.ensureDir(componentsDir);
    logger.success(`Created components directory: ${config.componentsPath}`);

    // Add CSS variables (always add them for consistency)
    const stylesPath = path.join(cwd, config.tailwind.css);
    if (await fs.pathExists(stylesPath)) {
      let stylesContent = await fs.readFile(stylesPath, 'utf-8');

      // Check if CSS variables already exist
      if (!stylesContent.includes('--ai-background')) {
        stylesContent = CSS_IMPORTS + '\n' + stylesContent;
        await fs.writeFile(stylesPath, stylesContent);
        logger.success('Added CSS variables to styles.css');
      } else {
        logger.info('CSS variables already present in styles.css');
      }
    }

    // Create barrel export file
    const indexPath = path.join(componentsDir, 'index.ts');
    if (!(await fs.pathExists(indexPath))) {
      await fs.writeFile(
        indexPath,
        '// Angular AI Kit Components\n// Add your component exports here\n'
      );
      logger.success('Created components/index.ts barrel export');
    }
  } catch (error) {
    createSpinner.fail('Failed to create configuration');
    logger.error(error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }

  // Step 4: Show next steps
  logger.break();
  logger.title('Success! Angular AI Kit is ready.');
  logger.break();
  logger.log('Next steps:');
  logger.break();
  logger.log(chalk.cyan('  1. Install required dependencies:'));
  logger.log(
    chalk.gray('     npm install @angular-ai-kit/utils @angular-ai-kit/tokens')
  );
  logger.break();
  logger.log(chalk.cyan('  2. Add a component:'));
  logger.log(chalk.gray('     npx @angular-ai-kit/cli add ai-response'));
  logger.break();
  logger.log(chalk.cyan('  3. List available components:'));
  logger.log(chalk.gray('     npx @angular-ai-kit/cli list'));
  logger.break();
}
