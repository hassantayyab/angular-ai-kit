import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  chain,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  NodeDependencyType,
  addPackageJsonDependency,
} from '@schematics/angular/utility/dependencies';
import { getWorkspace } from '@schematics/angular/utility/workspace';

// Schema interface
interface NgAddOptions {
  project?: string;
  skipInstall?: boolean;
}

// Dependency versions
const DEPENDENCIES: Record<string, string> = {
  '@angular-ai-kit/core': '^0.1.7',
  '@angular-ai-kit/utils': '^0.1.7',
  '@angular-ai-kit/tokens': '^0.1.7',
  '@angular/cdk': '^21.0.0',
  tailwindcss: '^4.0.0',
  '@tailwindcss/postcss': '^4.0.0',
  'highlight.js': '^11.0.0',
  marked: '^17.0.0',
  dompurify: '^3.0.0',
  '@ng-icons/core': '^32.0.0',
  '@ng-icons/lucide': '^32.0.0',
  clsx: '^2.1.0',
  'tailwind-merge': '^3.0.0',
  'class-variance-authority': '^0.7.0',
  // Spartan UI Brain (single package with subpath exports)
  '@spartan-ng/brain': '^0.0.1-alpha.597',
};

// PostCSS config content
const POSTCSS_CONFIG = `{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
`;

// Minimal styles.css content - just imports from the library
const STYLES_CSS = `/* Angular AI Kit */
@import 'tailwindcss';
@import '@angular-ai-kit/tokens/tokens/styles.css';
`;

// Add all dependencies to package.json
function addDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Adding dependencies...');

    for (const [name, version] of Object.entries(DEPENDENCIES)) {
      addPackageJsonDependency(tree, {
        type: NodeDependencyType.Default,
        name,
        version,
      });
      context.logger.info('  Added ' + name + '@' + version);
    }

    return tree;
  };
}

// Create .postcssrc.json if it doesn't exist
function createPostcssConfig(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const postcssPath = '.postcssrc.json';

    if (tree.exists(postcssPath)) {
      context.logger.info('PostCSS config already exists, skipping...');
      return tree;
    }

    context.logger.info('Creating .postcssrc.json...');
    tree.create(postcssPath, POSTCSS_CONFIG);
    return tree;
  };
}

// Update styles.css with Angular AI Kit styles
function updateStyles(options: NgAddOptions): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(tree);
    const projectName =
      options.project || (workspace.extensions['defaultProject'] as string);

    if (!projectName) {
      throw new SchematicsException('Could not determine project name');
    }

    const project = workspace.projects.get(projectName);
    if (!project) {
      throw new SchematicsException('Project "' + projectName + '" not found');
    }

    // Find styles path from angular.json
    const buildTarget = project.targets.get('build');
    if (!buildTarget) {
      throw new SchematicsException('Build target not found');
    }

    const styles = buildTarget.options?.['styles'] as string[] | undefined;
    let stylesPath = 'src/styles.css';

    if (styles && styles.length > 0) {
      // Get the first CSS file
      const cssFile = styles.find(
        (s) => typeof s === 'string' && s.endsWith('.css')
      );
      if (cssFile) {
        stylesPath = cssFile;
      }
    }

    context.logger.info('Updating ' + stylesPath + '...');

    if (tree.exists(stylesPath)) {
      const existingContent = tree.read(stylesPath)?.toString() || '';

      // Check if Angular AI Kit styles already added
      if (existingContent.includes('Angular AI Kit')) {
        context.logger.info(
          'Angular AI Kit styles already present, skipping...'
        );
        return tree;
      }

      // Prepend our styles to existing content
      tree.overwrite(stylesPath, STYLES_CSS + '\n\n' + existingContent);
    } else {
      tree.create(stylesPath, STYLES_CSS);
    }

    return tree;
  };
}

// Install dependencies
function installDependencies(options: NgAddOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (!options.skipInstall) {
      context.logger.info('Installing dependencies...');
      context.addTask(new NodePackageInstallTask());
    }
    return tree;
  };
}

// Main ng-add entry point
export function ngAdd(options: NgAddOptions): Rule {
  return chain([
    addDependencies(),
    createPostcssConfig(),
    updateStyles(options),
    installDependencies(options),
  ]);
}
