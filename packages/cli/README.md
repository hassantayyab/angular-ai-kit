# @angular-ai-kit/cli

[![npm version](https://img.shields.io/npm/v/@angular-ai-kit/cli?color=dd0031)](https://www.npmjs.com/package/@angular-ai-kit/cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

CLI tool to add Angular AI Kit components to your project - similar to Shadcn UI.

## Requirements

- Node.js >= 20.0.0
- Angular v19+
- Tailwind CSS v4 (recommended)

## Usage

### Initialize in your project

```bash
npx @angular-ai-kit/cli init
```

This will:

- Detect your Angular version
- Check for Tailwind CSS
- Create `angular-ai-kit.config.json`
- Set up the components directory
- Add CSS variables for theming

### Add components

```bash
# Add a single component
npx @angular-ai-kit/cli add ai-response

# Add multiple components
npx @angular-ai-kit/cli add chat-container message-list

# Skip confirmation prompts
npx @angular-ai-kit/cli add ai-response --yes
```

Components are copied to your project with all dependencies automatically resolved.

### List available components

```bash
# List all components
npx @angular-ai-kit/cli list

# Filter by category
npx @angular-ai-kit/cli list --category chat

# Show installed components only
npx @angular-ai-kit/cli list --installed
```

## Available Components

### Chat Components

- `chat-container` - Full chat layout with message list and input area
- `message-list` - Scrollable list of chat messages with auto-scroll
- `user-message` - Display user messages with edit and copy actions
- `message-actions` - Copy and edit action buttons for messages
- `prompt-suggestions` - Display clickable prompt suggestions
- `conversation-list` - Sidebar list of conversations

### Display Components

- `ai-response` - Display AI assistant responses with markdown rendering
- `markdown-renderer` - Render markdown content with syntax highlighting
- `code-block` - Display code with syntax highlighting and copy button
- `feedback-buttons` - Thumbs up/down feedback buttons
- `response-actions` - Action buttons for AI responses

### UI Components

- `icon-button` - Reusable icon button primitive

## Configuration

After running `init`, a config file is created:

```json
{
  "$schema": "https://raw.githubusercontent.com/hassantayyab/angular-ai-kit/main/packages/cli/schema.json",
  "componentsPath": "src/app/components/ai-kit",
  "typescript": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/styles.css"
  },
  "aliases": {
    "components": "@/components/ai-kit",
    "utils": "@angular-ai-kit/utils"
  }
}
```

## Commands

| Command               | Description                               |
| --------------------- | ----------------------------------------- |
| `init`                | Initialize Angular AI Kit in your project |
| `add <components...>` | Add component(s) to your project          |
| `list`                | List all available components             |

### Options

**init**

- `-y, --yes` - Skip confirmation prompts
- `-c, --cwd <path>` - Working directory

**add**

- `-y, --yes` - Skip confirmation prompts
- `-o, --overwrite` - Overwrite existing files
- `-c, --cwd <path>` - Working directory

**list**

- `-i, --installed` - Show only installed components
- `--category <category>` - Filter by category (chat, display, ui)
- `-c, --cwd <path>` - Working directory

## Related Packages

- [@angular-ai-kit/core](https://www.npmjs.com/package/@angular-ai-kit/core) - Core components
- [@angular-ai-kit/utils](https://www.npmjs.com/package/@angular-ai-kit/utils) - Utility functions
- [@angular-ai-kit/tokens](https://www.npmjs.com/package/@angular-ai-kit/tokens) - Design tokens

## License

MIT
