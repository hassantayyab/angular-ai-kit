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
