import chalk from 'chalk';
import fs from 'fs-extra';
import ora from 'ora';
import path from 'path';
import prompts from 'prompts';
import { fileURLToPath } from 'url';
import {
  isComponentInstalled,
  updateBarrelExport,
} from '../utils/file-utils.js';
import { getConfig, isInitialized } from '../utils/get-project-info.js';
import { logger } from '../utils/logger.js';

// Get directory of current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Types for registry
interface ComponentDependency {
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

interface ServiceDependency {
  name: string;
  description: string;
  path: string;
  files: string[];
  npmDependencies: Record<string, string>;
}

interface ComponentRegistry {
  $schema: string;
  baseUrl: string;
  components: Record<string, ComponentDependency>;
  services: Record<string, ServiceDependency>;
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
 * Resolve all dependencies for a component (recursive)
 */
function resolveDependencies(
  componentName: string,
  registry: ComponentRegistry,
  resolved: Set<string> = new Set()
): string[] {
  if (resolved.has(componentName)) {
    return [];
  }

  const component = registry.components[componentName];
  if (!component) {
    return [];
  }

  resolved.add(componentName);
  const allDeps: string[] = [];

  // Resolve child dependencies first
  for (const dep of component.dependencies) {
    const childDeps = resolveDependencies(dep, registry, resolved);
    allDeps.push(...childDeps);
  }

  // Add the component itself
  allDeps.push(componentName);

  return allDeps;
}

/**
 * Collect all npm and peer dependencies for components
 */
function collectNpmDependencies(
  components: string[],
  registry: ComponentRegistry
): { npm: Record<string, string>; peer: Record<string, string> } {
  const npm: Record<string, string> = {};
  const peer: Record<string, string> = {};

  for (const name of components) {
    const component = registry.components[name];
    if (component) {
      // Collect npm dependencies
      Object.assign(npm, component.npmDependencies);

      // Collect peer dependencies
      if (component.peerDependencies) {
        Object.assign(peer, component.peerDependencies);
      }

      // Collect service dependencies
      for (const serviceName of component.services) {
        const service = registry.services[serviceName];
        if (service) {
          Object.assign(peer, service.npmDependencies);
        }
      }
    }
  }

  return { npm, peer };
}

/**
 * Collect all services required by components
 */
function collectServices(
  components: string[],
  registry: ComponentRegistry
): string[] {
  const services = new Set<string>();

  for (const name of components) {
    const component = registry.components[name];
    if (component?.services) {
      for (const service of component.services) {
        services.add(service);
      }
    }
  }

  return Array.from(services);
}

/**
 * Add component(s) to the project
 */
export async function addCommand(
  componentNames: string[],
  options: { cwd?: string; yes?: boolean; overwrite?: boolean }
) {
  const cwd = options.cwd ?? process.cwd();

  // Check if initialized
  if (!(await isInitialized(cwd))) {
    logger.error('Angular AI Kit is not initialized in this project.');
    logger.info('Run: npx @angular-ai-kit/cli init');
    process.exit(1);
  }

  // Load config
  const config = await getConfig(cwd);
  if (!config) {
    logger.error('Could not load configuration file.');
    process.exit(1);
  }

  // Load registry
  const spinner = ora('Loading component registry...').start();
  let registry: ComponentRegistry;

  try {
    registry = await loadRegistry();
    spinner.succeed('Component registry loaded');
  } catch (error) {
    spinner.fail('Failed to load component registry');
    logger.error(error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }

  // Validate component names
  const invalidComponents = componentNames.filter(
    (name) => !registry.components[name]
  );

  if (invalidComponents.length > 0) {
    logger.error(`Unknown component(s): ${invalidComponents.join(', ')}`);
    logger.info('Run: npx @angular-ai-kit/cli list');
    process.exit(1);
  }

  // Resolve all dependencies
  const resolved = new Set<string>();
  const allComponents: string[] = [];

  for (const name of componentNames) {
    const deps = resolveDependencies(name, registry, resolved);
    allComponents.push(...deps);
  }

  // Remove duplicates while maintaining order
  const uniqueComponents = [...new Set(allComponents)];

  logger.break();
  logger.info(`Components to install (${uniqueComponents.length}):`);
  for (const name of uniqueComponents) {
    const comp = registry.components[name];
    logger.log(chalk.gray(`  - ${name} (${comp.category})`));
  }

  // Check for already installed components
  const componentsDir = path.join(cwd, config.componentsPath);
  const alreadyInstalled: string[] = [];

  for (const name of uniqueComponents) {
    if (await isComponentInstalled(componentsDir, name)) {
      alreadyInstalled.push(name);
    }
  }

  if (alreadyInstalled.length > 0 && !options.overwrite) {
    logger.break();
    logger.warn(`Already installed: ${alreadyInstalled.join(', ')}`);

    if (!options.yes) {
      const { proceed } = await prompts({
        type: 'confirm',
        name: 'proceed',
        message: 'Overwrite existing components?',
        initial: false,
      });

      if (!proceed) {
        logger.info('Installation cancelled.');
        return;
      }
    }
  }

  // Collect dependencies
  const { peer } = collectNpmDependencies(uniqueComponents, registry);
  const services = collectServices(uniqueComponents, registry);

  // Show dependency information
  if (Object.keys(peer).length > 0) {
    logger.break();
    logger.info('Peer dependencies required:');
    for (const [pkg, version] of Object.entries(peer)) {
      logger.log(chalk.gray(`  - ${pkg}@${version}`));
    }
  }

  // Confirm installation
  if (!options.yes) {
    logger.break();
    const { confirm } = await prompts({
      type: 'confirm',
      name: 'confirm',
      message: 'Proceed with installation?',
      initial: true,
    });

    if (!confirm) {
      logger.info('Installation cancelled.');
      return;
    }
  }

  // Install components
  logger.break();
  const installSpinner = ora('Installing components...').start();

  try {
    // For now, we'll create placeholder files since the actual component source
    // files need to come from the library package or a remote URL
    // In production, this would fetch from the registry baseUrl

    for (const componentName of uniqueComponents) {
      const component = registry.components[componentName];
      const targetDir = path.join(componentsDir, componentName);

      // Ensure target directory exists
      await fs.ensureDir(targetDir);

      // Create placeholder component files
      // Note: In production, these would be fetched from the baseUrl
      await createComponentPlaceholder(targetDir, componentName, component);

      // Update barrel export
      await updateBarrelExport(componentsDir, componentName, component.name);

      logger.step(
        uniqueComponents.indexOf(componentName) + 1,
        uniqueComponents.length,
        `Installed ${componentName}`
      );
    }

    // Install services if needed
    if (services.length > 0) {
      const servicesDir = path.join(componentsDir, '..', 'services');
      await fs.ensureDir(servicesDir);

      for (const serviceName of services) {
        const service = registry.services[serviceName];
        if (service) {
          await createServicePlaceholder(servicesDir, serviceName, service);
        }
      }
    }

    installSpinner.succeed('Components installed successfully');
  } catch (error) {
    installSpinner.fail('Failed to install components');
    logger.error(error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }

  // Show post-install instructions
  logger.break();
  logger.title('Installation complete!');
  logger.break();

  // Show npm install command for peer dependencies
  if (Object.keys(peer).length > 0) {
    logger.log(chalk.cyan('Install peer dependencies:'));
    const peerPkgs = Object.entries(peer)
      .map(([pkg, version]) => `${pkg}@${version}`)
      .join(' ');
    logger.log(chalk.gray(`  npm install ${peerPkgs}`));
    logger.break();
  }

  // Show import example
  logger.log(chalk.cyan('Import components in your code:'));
  logger.log(
    chalk.gray(
      `  import { ${registry.components[componentNames[0]].name} } from '${config.aliases.components}';`
    )
  );
  logger.break();
}

/**
 * Create a placeholder component file
 * In production, this would fetch from the registry
 */
async function createComponentPlaceholder(
  targetDir: string,
  componentName: string,
  component: ComponentDependency
): Promise<void> {
  const className = component.name;
  const selector = `ai-${componentName}`;

  // Create main component file
  const componentContent = `import { ChangeDetectionStrategy, Component, ViewEncapsulation, input, output } from '@angular/core';
import { cn } from '@angular-ai-kit/utils';

/**
 * ${component.description}
 *
 * @example
 * \`\`\`html
 * <${selector}></${selector}>
 * \`\`\`
 */
@Component({
  selector: '${selector}',
  templateUrl: './${componentName}.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [],
})
export class ${className} {
  // TODO: Fetch actual component implementation from registry
  // This is a placeholder generated by @angular-ai-kit/cli

  customClasses = input<string>('');
}
`;

  // Create template file
  const templateContent = `<!-- ${component.description} -->
<!-- TODO: Fetch actual template from registry -->
<div class="ai-${componentName}">
  <p>Placeholder for ${className}</p>
  <p class="text-muted-foreground">Run 'npm update @angular-ai-kit/cli' to get the latest components</p>
</div>
`;

  // Create index file
  const indexContent = `export { ${className} } from './${componentName}.component';
`;

  await fs.writeFile(
    path.join(targetDir, `${componentName}.component.ts`),
    componentContent
  );
  await fs.writeFile(
    path.join(targetDir, `${componentName}.component.html`),
    templateContent
  );
  await fs.writeFile(path.join(targetDir, 'index.ts'), indexContent);
}

/**
 * Create a placeholder service file
 */
async function createServicePlaceholder(
  servicesDir: string,
  serviceName: string,
  service: ServiceDependency
): Promise<void> {
  const fileName = serviceName
    .replace(/Service$/, '')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .slice(1);

  const serviceContent = `import { Injectable } from '@angular/core';

/**
 * ${service.description}
 *
 * TODO: Fetch actual service implementation from registry
 * This is a placeholder generated by @angular-ai-kit/cli
 */
@Injectable({
  providedIn: 'root'
})
export class ${serviceName} {
  // Placeholder implementation
}
`;

  await fs.writeFile(
    path.join(servicesDir, `${fileName}.service.ts`),
    serviceContent
  );
}
