import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { getInstalledComponents } from '../utils/file-utils.js';
import { getConfig, isInitialized } from '../utils/get-project-info.js';
import { logger } from '../utils/logger.js';

// Get directory of current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Types for registry
interface ComponentInfo {
  name: string;
  description: string;
  category: string;
  path: string;
  files: string[];
  dependencies: string[];
  services: string[];
  npmDependencies: Record<string, string>;
  peerDependencies?: Record<string, string>;
  spartanDependencies?: string[];
}

interface ComponentRegistry {
  $schema: string;
  baseUrl: string;
  components: Record<string, ComponentInfo>;
  services: Record<string, unknown>;
  categories: Record<string, { name: string; description: string }>;
}

/**
 * Load the component registry
 */
async function loadRegistry(): Promise<ComponentRegistry> {
  const registryPath = path.join(
    __dirname,
    '..',
    'registry',
    'components.json'
  );
  return fs.readJson(registryPath);
}

/**
 * List all available components
 */
export async function listCommand(options: {
  cwd?: string;
  category?: string;
  installed?: boolean;
}) {
  const cwd = options.cwd ?? process.cwd();

  // Load registry
  let registry: ComponentRegistry;

  try {
    registry = await loadRegistry();
  } catch (error) {
    logger.error('Failed to load component registry');
    logger.error(error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }

  // Get installed components if project is initialized
  let installedComponents: string[] = [];
  const initialized = await isInitialized(cwd);

  if (initialized) {
    const config = await getConfig(cwd);
    if (config) {
      const componentsDir = path.join(cwd, config.componentsPath);
      installedComponents = await getInstalledComponents(componentsDir);
    }
  }

  // Filter by installed if requested
  if (options.installed) {
    if (!initialized) {
      logger.error('Angular AI Kit is not initialized in this project.');
      logger.info('Run: npx @angular-ai-kit/cli init');
      process.exit(1);
    }

    if (installedComponents.length === 0) {
      logger.info('No components installed yet.');
      logger.info('Run: npx @angular-ai-kit/cli add <component>');
      return;
    }
  }

  // Group components by category
  const componentsByCategory: Record<
    string,
    Array<{ key: string; info: ComponentInfo }>
  > = {};

  for (const [key, component] of Object.entries(registry.components)) {
    // Filter by category if specified
    if (options.category && component.category !== options.category) {
      continue;
    }

    // Filter by installed if specified
    if (options.installed && !installedComponents.includes(key)) {
      continue;
    }

    if (!componentsByCategory[component.category]) {
      componentsByCategory[component.category] = [];
    }

    componentsByCategory[component.category].push({ key, info: component });
  }

  // Display header
  logger.break();
  if (options.installed) {
    logger.title('Installed Components');
  } else if (options.category) {
    const categoryName =
      registry.categories[options.category]?.name ?? options.category;
    logger.title(`${categoryName} Components`);
  } else {
    logger.title('Available Components');
  }

  // Display components by category
  const categories = Object.keys(componentsByCategory).sort();

  if (categories.length === 0) {
    logger.info('No components found matching your criteria.');
    return;
  }

  for (const category of categories) {
    const categoryInfo = registry.categories[category];
    const components = componentsByCategory[category];

    logger.break();
    logger.log(chalk.bold.cyan(`${categoryInfo?.name ?? category}`));
    if (categoryInfo?.description) {
      logger.log(chalk.gray(categoryInfo.description));
    }
    logger.break();

    for (const { key, info } of components) {
      const isInstalled = installedComponents.includes(key);
      const status = isInstalled ? chalk.green(' ✓') : '';
      const name = chalk.white(key);
      const desc = chalk.gray(`- ${info.description}`);

      logger.log(`  ${name}${status}`);
      logger.log(`    ${desc}`);

      // Show dependencies if any
      if (info.dependencies.length > 0) {
        logger.log(chalk.gray(`    deps: ${info.dependencies.join(', ')}`));
      }
    }
  }

  // Display summary
  logger.break();
  const totalComponents = Object.keys(registry.components).length;
  const installedCount = installedComponents.length;

  if (initialized) {
    logger.log(
      chalk.gray(`${installedCount}/${totalComponents} components installed`)
    );
  } else {
    logger.log(chalk.gray(`${totalComponents} components available`));
    logger.break();
    logger.info('Initialize to start adding components:');
    logger.log(chalk.gray('  npx @angular-ai-kit/cli init'));
  }

  // Display available categories
  if (!options.category && !options.installed) {
    logger.break();
    logger.log(chalk.gray('Filter by category:'));
    for (const key of Object.keys(registry.categories)) {
      logger.log(
        chalk.gray(`  npx @angular-ai-kit/cli list --category ${key}`)
      );
    }
  }

  logger.break();
}
