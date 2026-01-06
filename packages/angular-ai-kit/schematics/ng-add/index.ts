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
  '@angular-ai-kit/core': '^0.1.1',
  '@angular-ai-kit/utils': '^0.1.1',
  '@angular-ai-kit/tokens': '^0.1.1',
  tailwindcss: '^4.0.0',
  '@tailwindcss/postcss': '^4.0.0',
  'highlight.js': '^11.0.0',
  marked: '^17.0.0',
  dompurify: '^3.0.0',
  '@ng-icons/core': '^32.0.0',
  '@ng-icons/lucide': '^32.0.0',
  clsx: '^2.1.0',
  'tailwind-merge': '^3.0.0',
};

// PostCSS config content
const POSTCSS_CONFIG = `{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
`;

// Complete styles.css content
const STYLES_CSS = `/* Angular AI Kit - Auto-generated styles */
@import 'tailwindcss';

/* Scan library classes in node_modules */
@source "../node_modules/@angular-ai-kit";

/* Map CSS variables to Tailwind color utilities */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-border: var(--border);
  --color-border-hover: var(--border-hover);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-code: var(--code);
  --color-code-foreground: var(--code-foreground);
  --color-foreground-muted: var(--foreground-muted);
  --color-message-user-bg: var(--message-user-bg);
  --color-message-assistant-bg: var(--message-assistant-bg);
  --color-message-system-bg: var(--message-system-bg);
  --color-avatar-user: var(--avatar-user);
  --color-avatar-assistant: var(--avatar-assistant);
  --color-avatar-system: var(--avatar-system);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

/* CSS Variables for Angular AI Kit */
@layer base {
  :root {
    --background: theme('colors.zinc.50');
    --foreground: theme('colors.zinc.950');
    --card: theme('colors.white');
    --card-foreground: theme('colors.zinc.900');
    --popover: theme('colors.white');
    --popover-foreground: theme('colors.zinc.800');
    --muted: theme('colors.zinc.100');
    --muted-foreground: theme('colors.zinc.500');
    --accent: theme('colors.zinc.100');
    --accent-foreground: theme('colors.zinc.900');
    --border: theme('colors.zinc.200');
    --border-hover: theme('colors.zinc.300');
    --input: theme('colors.zinc.50');
    --ring: theme('colors.zinc.400');
    --primary: theme('colors.zinc.800');
    --primary-foreground: theme('colors.zinc.50');
    --secondary: theme('colors.zinc.100');
    --secondary-foreground: theme('colors.zinc.800');
    --destructive: theme('colors.red.500');
    --destructive-foreground: theme('colors.zinc.50');
    --code: theme('colors.zinc.100');
    --code-foreground: theme('colors.zinc.900');
    --foreground-muted: theme('colors.zinc.500');
    --message-user-bg: theme('colors.zinc.100');
    --message-assistant-bg: theme('colors.white');
    --message-system-bg: theme('colors.zinc.50');
    --avatar-user: theme('colors.zinc.700');
    --avatar-assistant: theme('colors.zinc.800');
    --avatar-system: theme('colors.zinc.400');
    --radius: 0.5rem;
  }

  /* Auto dark mode detection */
  @media (prefers-color-scheme: dark) {
    :root {
      --background: theme('colors.zinc.950');
      --foreground: theme('colors.zinc.50');
      --card: theme('colors.zinc.900');
      --card-foreground: theme('colors.zinc.100');
      --popover: theme('colors.zinc.900');
      --popover-foreground: theme('colors.zinc.100');
      --muted: theme('colors.zinc.900');
      --muted-foreground: theme('colors.zinc.400');
      --accent: theme('colors.zinc.800');
      --accent-foreground: theme('colors.zinc.50');
      --border: theme('colors.zinc.800');
      --border-hover: theme('colors.zinc.600');
      --input: theme('colors.zinc.900');
      --ring: theme('colors.zinc.500');
      --primary: theme('colors.zinc.100');
      --primary-foreground: theme('colors.zinc.900');
      --secondary: theme('colors.zinc.800');
      --secondary-foreground: theme('colors.zinc.50');
      --code: theme('colors.zinc.900');
      --code-foreground: theme('colors.zinc.100');
      --foreground-muted: theme('colors.zinc.500');
      --message-user-bg: theme('colors.zinc.800');
      --message-assistant-bg: theme('colors.zinc.900');
      --message-system-bg: theme('colors.zinc.800/50');
      --avatar-user: theme('colors.zinc.600');
      --avatar-assistant: theme('colors.zinc.700');
      --avatar-system: theme('colors.zinc.500');
    }
  }

  /* Manual dark mode override */
  .dark {
    --background: theme('colors.zinc.950');
    --foreground: theme('colors.zinc.50');
    --card: theme('colors.zinc.900');
    --card-foreground: theme('colors.zinc.100');
    --popover: theme('colors.zinc.900');
    --popover-foreground: theme('colors.zinc.100');
    --muted: theme('colors.zinc.900');
    --muted-foreground: theme('colors.zinc.400');
    --accent: theme('colors.zinc.800');
    --accent-foreground: theme('colors.zinc.50');
    --border: theme('colors.zinc.800');
    --border-hover: theme('colors.zinc.600');
    --input: theme('colors.zinc.900');
    --ring: theme('colors.zinc.500');
    --primary: theme('colors.zinc.100');
    --primary-foreground: theme('colors.zinc.900');
    --secondary: theme('colors.zinc.800');
    --secondary-foreground: theme('colors.zinc.50');
    --code: theme('colors.zinc.900');
    --code-foreground: theme('colors.zinc.100');
    --foreground-muted: theme('colors.zinc.500');
    --message-user-bg: theme('colors.zinc.800');
    --message-assistant-bg: theme('colors.zinc.900');
    --message-system-bg: theme('colors.zinc.800/50');
    --avatar-user: theme('colors.zinc.600');
    --avatar-assistant: theme('colors.zinc.700');
    --avatar-system: theme('colors.zinc.500');
  }

  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: system-ui, sans-serif;
  }
}

/* Code block styles */
@layer components {
  .ai-code-block-wrapper,
  .code-block-wrapper {
    border-radius: 0.5rem;
    overflow: hidden;
    margin: 1rem 0;
    background: var(--code);
  }

  .ai-code-block-header,
  .code-block-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: var(--code);
  }

  .ai-code-block-language,
  .code-block-language {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--muted-foreground);
    text-transform: lowercase;
  }

  .ai-code-block-copy,
  .code-block-copy {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    color: var(--muted-foreground);
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 0.375rem;
    transition: all 0.15s ease;
  }

  .ai-code-block-copy:hover,
  .code-block-copy:hover {
    color: var(--foreground);
    background: var(--accent);
  }

  .ai-code-block-wrapper pre,
  .code-block-wrapper pre {
    margin: 0 !important;
    padding: 1rem !important;
    background: transparent !important;
    border: none !important;
    border-radius: 0 !important;
    overflow-x: auto;
  }

  .ai-code-block-wrapper pre code,
  .code-block-wrapper pre code {
    font-size: 0.875rem;
    line-height: 1.7;
    font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, monospace;
    background: transparent !important;
    padding: 0 !important;
  }

  /* AI Response content styling */
  .ai-response-content h1,
  .ai-response-content h2,
  .ai-response-content h3 {
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  .ai-response-content h1 { font-size: 1.5rem; }
  .ai-response-content h2 { font-size: 1.25rem; }
  .ai-response-content h3 { font-size: 1.125rem; }

  .ai-response-content p {
    margin-bottom: 0.75rem;
    line-height: 1.7;
  }

  .ai-response-content ul,
  .ai-response-content ol {
    margin: 0.5rem 0 0.75rem 1.5rem;
  }

  .ai-response-content ul { list-style-type: disc; }
  .ai-response-content ol { list-style-type: decimal; }

  .ai-response-content li {
    margin-bottom: 0.25rem;
    line-height: 1.6;
  }

  .ai-response-content :not(pre) > code {
    padding: 0.125rem 0.5rem;
    border-radius: 0.375rem;
    background-color: var(--muted);
    font-size: 0.875em;
  }

  .ai-response-content blockquote {
    border-left: 4px solid var(--border);
    padding-left: 1rem;
    margin: 1rem 0;
    color: var(--muted-foreground);
  }

  .ai-response-content a {
    color: var(--primary);
    text-decoration: underline;
  }

  .ai-response-content a:hover {
    opacity: 0.8;
  }

  .ai-response-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }

  .ai-response-content th,
  .ai-response-content td {
    border: 1px solid var(--border);
    padding: 0.5rem;
    text-align: left;
  }

  .ai-response-content th {
    background: var(--muted);
    font-weight: 600;
  }
}
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
