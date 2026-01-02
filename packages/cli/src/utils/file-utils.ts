import fs from 'fs-extra';
import path from 'path';

/**
 * Transform relative imports in component files to use the new location
 */
export function transformImports(
  content: string,
  _componentName: string,
  _config: { componentsPath: string; utilsAlias: string }
): string {
  let transformed = content;

  // Transform @angular-ai-kit/utils imports (keep as-is since it's an npm package)
  // No change needed for: import { cn } from '@angular-ai-kit/utils';

  // Transform relative imports for types
  transformed = transformed.replace(
    /from\s+['"]\.\.\/\.\.\/\.\.\/types['"]/g,
    `from '@angular-ai-kit/tokens'`
  );

  // Transform relative imports for services
  transformed = transformed.replace(
    /from\s+['"]\.\.\/\.\.\/\.\.\/services\/([^'"]+)['"]/g,
    `from '../services/$1'`
  );

  // Transform relative imports for other components
  transformed = transformed.replace(
    /from\s+['"]\.\.\/([^'"]+)['"]/g,
    `from '../$1'`
  );

  return transformed;
}

/**
 * Copy a component and its files to the target directory
 */
export async function copyComponent(
  sourceDir: string,
  targetDir: string,
  componentName: string,
  files: string[],
  config: { componentsPath: string; utilsAlias: string }
): Promise<void> {
  // Ensure target directory exists
  await fs.ensureDir(targetDir);

  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);

    if (await fs.pathExists(sourcePath)) {
      let content = await fs.readFile(sourcePath, 'utf-8');

      // Transform imports for TypeScript files
      if (file.endsWith('.ts')) {
        content = transformImports(content, componentName, config);
      }

      await fs.writeFile(targetPath, content);
    }
  }
}

/**
 * Create or update barrel export file (index.ts)
 */
export async function updateBarrelExport(
  componentsDir: string,
  componentName: string,
  _exportName: string
): Promise<void> {
  const indexPath = path.join(componentsDir, 'index.ts');
  const exportLine = `export * from './${componentName}';\n`;

  let content = '';

  if (await fs.pathExists(indexPath)) {
    content = await fs.readFile(indexPath, 'utf-8');

    // Check if export already exists
    if (content.includes(exportLine.trim())) {
      return;
    }
  }

  content += exportLine;
  await fs.writeFile(indexPath, content);
}

/**
 * Check if a component is already installed
 */
export async function isComponentInstalled(
  componentsDir: string,
  componentName: string
): Promise<boolean> {
  const componentDir = path.join(componentsDir, componentName);
  return fs.pathExists(componentDir);
}

/**
 * Get list of installed components
 */
export async function getInstalledComponents(
  componentsDir: string
): Promise<string[]> {
  if (!(await fs.pathExists(componentsDir))) {
    return [];
  }

  const entries = await fs.readdir(componentsDir, { withFileTypes: true });
  return entries
    .filter((entry: { isDirectory: () => boolean }) => entry.isDirectory())
    .map((entry: { name: string }) => entry.name);
}
