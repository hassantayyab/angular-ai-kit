import fs from 'fs-extra';
import path from 'path';

export interface ProjectInfo {
  isAngularProject: boolean;
  angularVersion: string | null;
  hasTailwind: boolean;
  tailwindVersion: string | null;
  srcPath: string;
  componentsPath: string;
  stylesPath: string;
}

/**
 * Detects project information from the current working directory
 */
export async function getProjectInfo(cwd: string): Promise<ProjectInfo> {
  const packageJsonPath = path.join(cwd, 'package.json');
  const angularJsonPath = path.join(cwd, 'angular.json');

  let isAngularProject = false;
  let angularVersion: string | null = null;
  let hasTailwind = false;
  let tailwindVersion: string | null = null;
  let srcPath = path.join(cwd, 'src');
  let componentsPath = path.join(srcPath, 'app', 'components', 'ai-kit');
  let stylesPath = path.join(srcPath, 'styles.css');

  // Check if package.json exists
  if (await fs.pathExists(packageJsonPath)) {
    const packageJson = await fs.readJson(packageJsonPath);
    const deps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    // Check for Angular
    if (deps['@angular/core']) {
      isAngularProject = true;
      angularVersion = deps['@angular/core'].replace(/[\^~]/g, '');
    }

    // Check for Tailwind CSS
    if (deps['tailwindcss'] || deps['@tailwindcss/postcss']) {
      hasTailwind = true;
      tailwindVersion =
        deps['tailwindcss']?.replace(/[\^~]/g, '') ||
        deps['@tailwindcss/postcss']?.replace(/[\^~]/g, '') ||
        null;
    }
  }

  // Check angular.json for project structure
  if (await fs.pathExists(angularJsonPath)) {
    const angularJson = await fs.readJson(angularJsonPath);
    const projects = angularJson.projects || {};
    const projectNames = Object.keys(projects);

    if (projectNames.length > 0) {
      const firstProject = projects[projectNames[0]];
      const sourceRoot = firstProject.sourceRoot || 'src';
      srcPath = path.join(cwd, sourceRoot);
      componentsPath = path.join(srcPath, 'app', 'components', 'ai-kit');

      // Try to find styles path from architect config
      const buildOptions = firstProject.architect?.build?.options;
      if (buildOptions?.styles) {
        const styles = buildOptions.styles;
        if (Array.isArray(styles) && styles.length > 0) {
          const mainStyle =
            typeof styles[0] === 'string' ? styles[0] : styles[0].input;
          stylesPath = path.join(cwd, mainStyle);
        }
      }
    }
  }

  return {
    isAngularProject,
    angularVersion,
    hasTailwind,
    tailwindVersion,
    srcPath,
    componentsPath,
    stylesPath,
  };
}

/**
 * Check if Angular AI Kit is already initialized
 */
export async function isInitialized(cwd: string): Promise<boolean> {
  const configPath = path.join(cwd, 'angular-ai-kit.config.json');
  return fs.pathExists(configPath);
}

/**
 * Get the Angular AI Kit config
 */
export async function getConfig(cwd: string): Promise<AiKitConfig | null> {
  const configPath = path.join(cwd, 'angular-ai-kit.config.json');

  if (await fs.pathExists(configPath)) {
    return fs.readJson(configPath);
  }

  return null;
}

export interface AiKitConfig {
  $schema: string;
  componentsPath: string;
  typescript: boolean;
  tailwind: {
    config: string;
    css: string;
  };
  aliases: {
    components: string;
    utils: string;
  };
}
