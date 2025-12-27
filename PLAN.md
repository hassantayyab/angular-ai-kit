# Angular AI Kit - Release Plan

## Overview

**Goal:** Production-ready AI chat component library for Angular v21

**Tech Stack:** Angular v21 • Tailwind CSS v4 • Spartan UI • Nx Monorepo • TypeScript

---

## 📊 Progress Summary

| Release             | Status         | Progress |
| ------------------- | -------------- | -------- |
| **MVP (v1.0)**      | 🔄 In Progress | 90%      |
| **Post-MVP (v1.x)** | ⏳ Planned     | 0%       |

**Last Updated:** December 27, 2025

---

# 🚀 MVP Release (v1.0)

> Essential components for initial production release. Devs can install and use these components immediately.

## Core Components

### ChatContainer ✅ Done

Main layout wrapper for chat interfaces.

- [x] Header section with title
- [x] MessageList integration
- [x] Input area at bottom
- [x] Responsive design
- [x] Dark mode support
- [x] Content projection slots

### MessageList ✅ Done

Scrollable message display with auto-scroll.

- [x] Scrollable container
- [x] Auto-scroll to bottom on new messages
- [x] Message array input
- [x] Loading state support
- [x] Empty state with customizable message
- [x] SSR-compatible
- [x] Accessible with `role="log"`

### MessageBubble ✅ Done

User and assistant message display.

- [x] User/assistant/system message variants
- [x] Avatar display with role-based icons
- [x] Role-based styling
- [x] Copy button functionality
- [x] Regenerate button (emit event)
- [x] Hover actions
- [x] Streaming text support
- [x] ARIA labels and accessibility
- [x] Dark mode support

### StreamingText ✅ Done

Typewriter effect for AI responses.

- [x] Character-by-character reveal
- [x] Configurable speed (ms per character)
- [x] Blinking cursor animation
- [x] `aria-live="polite"` for accessibility
- [x] Respects `prefers-reduced-motion`

### TypingIndicator ✅ Done

Animated "AI is thinking" indicator.

- [x] Bouncing dots animation
- [x] Optional avatar display
- [x] Optional text message
- [x] `role="status"` for accessibility
- [x] CSS-only animation (GPU-accelerated)

### ChatInput ✅ Done

Text input with modern toolbar.

- [x] Auto-resizing textarea
- [x] Placeholder text
- [x] Keyboard shortcuts (Enter/Shift+Enter)
- [x] Disabled state during loading
- [x] Focus management
- **Sub-features:**
  - [x] **Submit Button** - Send with loading spinner
  - [x] **Quick Suggestions** - Prompt badge pills
  - [x] **Toolbar** - Attachment, mic, model selector icons

---

## Supporting Infrastructure ✅ Done

### Directives

- [x] CopyToClipboard
- [x] AutoResize
- [x] ClickOutside
- [x] FocusTrap

### Types & Interfaces

- [x] ChatMessage (discriminated unions)
- [x] ChatRole ('user' | 'assistant' | 'system')
- [x] StreamingOptions
- [x] ModelInfo
- [x] Error types

### DI Tokens

- [x] CHAT_SERVICE
- [x] STREAMING_SERVICE
- [x] TOKEN_COUNTER
- [x] MARKDOWN_OPTIONS
- [x] THEME_CONFIG

### Utilities Library

- [x] `cn()` function (clsx + tailwind-merge)
- [x] Token counter utility
- [x] Formatters & validators

### Design Tokens

- [x] CSS custom properties
- [x] Light/dark theme variables
- [x] Typography, spacing, colors

---

## Production Readiness ⏳ Remaining

> Required to make the library installable by developers.

- [ ] **Package Build Setup**
  - [ ] Configure ng-packagr for library build
  - [ ] Verify tree-shaking works
  - [ ] Bundle size optimization

- [ ] **npm Configuration**
  - [ ] package.json with proper metadata
  - [ ] Peer dependencies (Angular, Tailwind)
  - [ ] .npmignore file

- [ ] **Documentation**
  - [ ] Installation instructions in README
  - [ ] Basic usage examples
  - [ ] API reference for each component

- [ ] **Demo App Polish**
  - [ ] Working chat with mock AI responses
  - [x] Showcase all MVP components (doc pages created)
  - [x] Interactive component playgrounds with controls
  - [ ] Mobile responsive

---

# 🔮 Post-MVP Release (v1.x)

> Features planned for future releases after MVP is stable.

## ChatInput Enhancements 🏷️ Coming Soon

| Feature           | Description                                     |
| ----------------- | ----------------------------------------------- |
| **File Upload**   | Drag & drop zone, file preview, size validation |
| **Voice Input**   | Microphone button with speech-to-text           |
| **@Mentions**     | Context pills for adding files/docs             |
| **Research Mode** | Toggle for web search integration               |

## Display Components 🏷️ Coming Soon

| Component            | Description                                                      |
| -------------------- | ---------------------------------------------------------------- |
| **CodeBlock**        | Syntax highlighting with highlight.js, copy button, line numbers |
| **MarkdownRenderer** | Parse & render markdown, code block integration, sanitization    |
| **TokenCounter**     | Display token usage, limit indicator, warning states             |

## Control Components 🏷️ Coming Soon

| Component            | Description                                        |
| -------------------- | -------------------------------------------------- |
| **ModelSelector**    | Dropdown for model selection (GPT-4, Claude, etc.) |
| **ConversationList** | Sidebar with chat history, search, delete          |
| **RegenerateButton** | Retry button with loading state                    |

## Advanced Features 🏷️ Coming Soon

| Feature                 | Description                                               |
| ----------------------- | --------------------------------------------------------- |
| **CLI Tool**            | `npx @angular-ai-kit add chat` for component installation |
| **Storybook**           | Interactive component documentation                       |
| **CI/CD Pipeline**      | GitHub Actions, automated releases                        |
| **Semantic Versioning** | Automated changelog, npm publishing                       |

---

# 📦 Technical Requirements

## Angular v21 Patterns ✅

- Standalone components (no NgModules)
- Signal-based inputs/outputs
- OnPush change detection
- Zoneless compatible
- Control flow syntax (@if, @for)
- inject() function for DI
- SSR/Hydration compatible

## Styling ✅

- Tailwind CSS v4
- CSS only (no SCSS)
- ViewEncapsulation.None
- Spartan UI components preferred
- Dark mode support
- Mobile-first responsive

## Accessibility ✅

- WCAG AA compliance
- Keyboard navigation
- Screen reader support
- ARIA attributes
- Focus management
- Reduced motion support

---

# 🗂️ Project Structure

```
angular-ai-kit/
├── packages/
│   ├── angular-ai-kit/     # Core library (MVP components)
│   ├── spartan-ui/         # Spartan UI components
│   ├── tokens/             # Design tokens
│   └── utils/              # Shared utilities
├── apps/
│   └── demo/               # Demo application
└── .claude/
    └── rules/              # AI coding guidelines
```

---

# 🎯 MVP Checklist

**Components (6/6)** ✅

- [x] ChatContainer
- [x] MessageList
- [x] MessageBubble
- [x] StreamingText
- [x] TypingIndicator
- [x] ChatInput

**Infrastructure (4/4)** ✅

- [x] Directives
- [x] Types & Interfaces
- [x] DI Tokens
- [x] Utilities

**Production Ready (1/4)** ⏳

- [ ] Package build
- [ ] npm config
- [ ] Documentation
- [x] Demo polish (component docs & playgrounds)

---

_Last Updated: December 27, 2025_
