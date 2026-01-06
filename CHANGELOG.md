## 0.1.6 (2026-01-06)

### 🚀 Features

- Add @angular-ai-kit/cli package ([96aef49](https://github.com/hassantayyab/angular-ai-kit/commit/96aef49))
- Add README.md for @angular-ai-kit/cli package and include it in package.json files list ([4b62332](https://github.com/hassantayyab/angular-ai-kit/commit/4b62332))
- Enhance sidebar navigation and update documentation page layout ([a0bd90d](https://github.com/hassantayyab/angular-ai-kit/commit/a0bd90d))
- Add logo and favicon assets for Angular AI Kit ([16c0be2](https://github.com/hassantayyab/angular-ai-kit/commit/16c0be2))
- Add Open Graph and Twitter meta tags to index.html and include component library image ([33dd7b7](https://github.com/hassantayyab/angular-ai-kit/commit/33dd7b7))
- Add SEO configuration files and update index.html for improved search engine visibility ([2dc7ef0](https://github.com/hassantayyab/angular-ai-kit/commit/2dc7ef0))
- Add AttachmentCard component for file attachment display in chat input ([d26cc6a](https://github.com/hassantayyab/angular-ai-kit/commit/d26cc6a))
- Introduce TopNavComponent for mobile navigation and update chat and docs pages ([b22daa7](https://github.com/hassantayyab/angular-ai-kit/commit/b22daa7))
- Implement Angular AI Kit schematics for easy installation and configuration ([fc90fac](https://github.com/hassantayyab/angular-ai-kit/commit/fc90fac))

### 🩹 Fixes

- Adjust sidebar component styles for improved layout ([44eaf91](https://github.com/hassantayyab/angular-ai-kit/commit/44eaf91))
- Update sidebar link to point to the correct GitHub repository ([20e8066](https://github.com/hassantayyab/angular-ai-kit/commit/20e8066))
- Update icon references in sidebar and AI icons ([c0c6145](https://github.com/hassantayyab/angular-ai-kit/commit/c0c6145))
- Update component links in DocsOverviewComponent for correct routing ([b06fe26](https://github.com/hassantayyab/angular-ai-kit/commit/b06fe26))
- Update ESLint configuration and clean up HTML components ([f8529be](https://github.com/hassantayyab/angular-ai-kit/commit/f8529be))

### ❤️ Thank You

- Hassan Tayyab @hassantayyab

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-01-02

### Added

#### Components

**Chat Components:**

- `ChatContainerComponent` - Main layout wrapper for chat interfaces
- `MessageListComponent` - Scrollable message display with auto-scroll
- `UserMessageComponent` - User message bubble with edit and copy functionality
- `MessageActionsComponent` - Copy and edit action buttons
- `PromptSuggestionsComponent` - Suggested prompt badges for quick actions
- `ConversationListComponent` - Conversation history sidebar with grouping

**Display Components:**

- `AIResponseComponent` - AI response with markdown rendering and actions
- `CodeBlockComponent` - Syntax highlighting with copy button and language detection
- `MarkdownRendererComponent` - Full markdown parsing with GFM support
- `FeedbackButtonsComponent` - Thumbs up/down toggle buttons
- `ResponseActionsComponent` - Copy, regenerate, and feedback buttons

**UI Components:**

- `IconButtonComponent` - Reusable icon button with variants

#### Directives

- `CopyToClipboardDirective` - Copy text to clipboard with callback
- `AutoResizeDirective` - Auto-resize textarea based on content
- `ClickOutsideDirective` - Detect clicks outside an element
- `FocusTrapDirective` - Trap focus within an element for accessibility

#### Services

- `MarkdownService` - Parse markdown with syntax highlighting
- `CodeHighlightService` - Syntax highlighting with automatic language detection

#### Infrastructure

- Full TypeScript type definitions
- DI tokens for configuration
- Icon definitions for common AI chat icons
- CSS design tokens for theming (`@angular-ai-kit/tokens`)
- Utility functions (`@angular-ai-kit/utils`)
- CLI tool for component installation (`@angular-ai-kit/cli`)

### Features

- Built for Angular v21 with signals
- Standalone components (no NgModules)
- Tailwind CSS v4 integration
- Light and dark mode support
- WCAG AA accessibility compliance
- SSR/Hydration compatible
- Zoneless change detection compatible

### Packages Published

- `@angular-ai-kit/core@0.1.0`
- `@angular-ai-kit/utils@0.1.0`
- `@angular-ai-kit/tokens@0.1.0`
- `@angular-ai-kit/cli@0.1.1`

[0.1.0]: https://github.com/hassantayyab/angular-ai-kit/releases/tag/v0.1.0
