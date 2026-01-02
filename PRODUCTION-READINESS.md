# Angular AI Kit - Production Readiness Plan

## Executive Summary

Transform Angular AI Kit from a development project into a **production-ready, developer-friendly component library** that developers can easily install and use - similar to Shadcn UI and Spartan UI.

**Target:** Enable developers to run `npx @angular-ai-kit/cli add chat-input` or `npm install @angular-ai-kit/core`

---

## Current State Assessment

### What's Built ✅

| Category               | Status | Details                                                                                                       |
| ---------------------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| **Core Components**    | 100%   | ChatContainer, MessageList, MessageBubble, AIResponse, UserMessage, StreamingText, TypingIndicator, ChatInput |
| **Display Components** | 100%   | CodeBlock, MarkdownRenderer, FeedbackButtons, ResponseActions, MessageActions, PromptSuggestions              |
| **Infrastructure**     | 100%   | Directives, Types, DI Tokens, Utils, Services                                                                 |
| **Demo App**           | 80%    | Working demo with component docs pages                                                                        |
| **Theme System**       | 100%   | Light/dark mode with CSS variables                                                                            |

### What's Missing ❌

| Category               | Status | Details                                         |
| ---------------------- | ------ | ----------------------------------------------- |
| **Library Build**      | 0%     | ng-packagr not configured for publishable build |
| **npm Publishing**     | 0%     | Not published to npm registry                   |
| **CLI Tool**           | 0%     | No `npx` installation command                   |
| **Schematics**         | 0%     | No `ng add` support                             |
| **Documentation Site** | 50%    | Demo app has docs, but no standalone docs site  |
| **Theming Guide**      | 0%     | No guide for customizing themes                 |

---

## Distribution Strategy Decision

### Option A: npm Package (Like Spartan UI)

```bash
npm install @angular-ai-kit/core @angular-ai-kit/utils
```

**Pros:**

- Standard npm workflow developers know
- Automatic updates via npm
- Simpler maintenance
- Version management handled by npm

**Cons:**

- Less flexible for customization
- Bundle size includes unused components
- Harder to modify component internals

### Option B: CLI Copy-Paste (Like Shadcn UI)

```bash
npx @angular-ai-kit/cli init
npx @angular-ai-kit/cli add chat-input
```

**Pros:**

- Full customization - code lives in user's project
- Only add components you need
- No dependency on library updates
- Developers can modify components

**Cons:**

- More complex CLI to build
- No automatic updates
- Requires more documentation

### Recommended: Hybrid Approach ⭐

1. **npm packages** for core utilities, types, and services (`@angular-ai-kit/utils`)
2. **CLI tool** for copying component source code into projects (`@angular-ai-kit/cli`)
3. **Theming package** for design tokens (`@angular-ai-kit/tokens`)

This gives developers the best of both worlds:

- Quick start with npm install
- Full customization with CLI copy
- Flexible theming system

---

## Phase-by-Phase Implementation Plan

---

## Phase 1: Library Build & Packaging (Week 1) ✅ COMPLETE

**Goal:** Make packages buildable and ready for npm publishing

### 1.1 Configure ng-packagr for All Packages

- [x] **@angular-ai-kit/core**
  - [x] Add `ng-package.json` with proper entry points
  - [x] Configure secondary entry points for tree-shaking
  - [x] Add build target to `project.json`
  - [x] Verify TypeScript declarations are generated
  - [x] Test build output in `dist/`

- [x] **@angular-ai-kit/utils**
  - [x] Configure as publishable library
  - [x] Verify `cn()` function exports correctly
  - [x] Test tree-shaking works

- [x] **@angular-ai-kit/tokens**
  - [x] Configure CSS file export
  - [x] Add TypeScript type exports
  - [x] Verify CSS is included in build

### 1.2 Package.json Updates

- [x] Update `packages/angular-ai-kit/package.json`:

  ```json
  {
    "name": "@angular-ai-kit/core",
    "version": "0.1.0",
    "peerDependencies": {
      "@angular/core": "^21.0.0",
      "@angular/common": "^21.0.0",
      "tailwindcss": "^4.0.0",
      "highlight.js": "^11.0.0",
      "marked": "^17.0.0",
      "dompurify": "^3.0.0"
    },
    "optionalDependencies": {
      "@ng-icons/core": ">=32.0.0",
      "@ng-icons/lucide": ">=32.0.0"
    }
  }
  ```

- [x] Update author, repository, homepage URLs
- [x] Add proper keywords for npm discoverability
- [x] Add `engines` field for Node.js version

### 1.3 Build Verification

- [x] Run `nx build @angular-ai-kit/core`
- [x] Run `nx build @angular-ai-kit/utils`
- [x] Run `nx build @angular-ai-kit/tokens`
- [x] Verify all TypeScript declarations (.d.ts) are generated
- [x] Verify source maps are generated
- [x] Check bundle sizes and optimize if needed
- [ ] Test tree-shaking with a sample app

### 1.4 Deliverables

- [x] All 3 packages build successfully
- [x] Output in `dist/packages/` directory
- [x] Bundle size report generated
- [x] No TypeScript errors

**Build Results:**
| Package | Size (gzipped) |
|---------|----------------|
| `@angular-ai-kit/core` | 75.6 kB |
| `@angular-ai-kit/utils` | 15.7 kB |
| `@angular-ai-kit/tokens` | 3.6 kB |

---

## Phase 2: CLI Tool Development (Week 2)

**Goal:** Create `@angular-ai-kit/cli` for easy component installation

### 2.1 CLI Package Setup

- [ ] Create `packages/cli/` directory
- [ ] Initialize with `nx generate @nx/js:library cli`
- [ ] Add CLI dependencies:
  ```json
  {
    "dependencies": {
      "commander": "^12.0.0",
      "chalk": "^5.3.0",
      "ora": "^8.0.0",
      "prompts": "^2.4.2",
      "fs-extra": "^11.2.0"
    }
  }
  ```

### 2.2 CLI Commands

- [ ] **`init`** - Initialize Angular AI Kit in a project

  ```bash
  npx @angular-ai-kit/cli init
  ```

  - Detect Angular version
  - Check Tailwind CSS setup
  - Create `angular-ai-kit.config.json`
  - Add CSS variables to styles
  - Install peer dependencies

- [ ] **`add <component>`** - Add a component to the project

  ```bash
  npx @angular-ai-kit/cli add chat-input
  npx @angular-ai-kit/cli add ai-response
  npx @angular-ai-kit/cli add --all
  ```

  - Copy component files to user's project
  - Update barrel exports
  - Install required dependencies

- [ ] **`diff <component>`** - Show changes since last add

  ```bash
  npx @angular-ai-kit/cli diff chat-input
  ```

- [ ] **`list`** - List available components
  ```bash
  npx @angular-ai-kit/cli list
  ```

### 2.3 Component Registry

- [ ] Create component registry JSON:
  ```json
  {
    "components": {
      "chat-input": {
        "name": "ChatInput",
        "files": ["chat-input.component.ts", "chat-input.component.html"],
        "dependencies": ["@angular-ai-kit/utils"],
        "peerDependencies": ["@ng-icons/lucide"]
      }
    }
  }
  ```

### 2.4 Deliverables

- [ ] Working CLI with `init`, `add`, `list` commands
- [ ] Component registry with all components
- [ ] Published to npm as `@angular-ai-kit/cli`

---

## Phase 3: npm Publishing Setup (Week 2-3)

**Goal:** Publish packages to npm registry

### 3.1 npm Organization Setup

- [ ] Create npm organization: `@angular-ai-kit`
- [ ] Configure npm tokens for CI/CD
- [ ] Set up 2FA for publishing

### 3.2 Nx Release Configuration

- [ ] Configure `nx.json` for releases:
  ```json
  {
    "release": {
      "projects": [
        "@angular-ai-kit/core",
        "@angular-ai-kit/utils",
        "@angular-ai-kit/tokens",
        "@angular-ai-kit/cli"
      ],
      "version": {
        "preVersionCommand": "npx nx run-many -t build",
        "conventionalCommits": true
      },
      "changelog": {
        "automaticFromRef": true,
        "workspaceChangelog": {
          "createRelease": "github"
        }
      }
    }
  }
  ```

### 3.3 Versioning Strategy

- [ ] Use semantic versioning (semver)
- [ ] Configure conventional commits
- [ ] Set up automatic changelog generation
- [ ] Create release workflow

### 3.4 First Release

- [ ] Version: `0.1.0` (beta)
- [ ] Run `nx release --first-release`
- [ ] Verify packages on npm
- [ ] Test installation in fresh project

### 3.5 Deliverables

- [ ] All packages published to npm
- [ ] Automated release workflow
- [ ] CHANGELOG.md generated

---

## Phase 4: Documentation Site (Week 3-4)

**Goal:** Create comprehensive documentation for developers

### 4.1 Documentation Structure

```
docs/
├── getting-started/
│   ├── installation.md
│   ├── quick-start.md
│   └── configuration.md
├── components/
│   ├── chat-input.md
│   ├── ai-response.md
│   ├── message-list.md
│   └── ... (all components)
├── theming/
│   ├── css-variables.md
│   ├── dark-mode.md
│   └── customization.md
├── guides/
│   ├── building-chat-app.md
│   ├── integrating-openai.md
│   └── streaming-responses.md
└── api/
    ├── types.md
    ├── services.md
    └── directives.md
```

### 4.2 Component Documentation Template

Each component page should include:

- [ ] **Overview** - What the component does
- [ ] **Installation** - How to add it
- [ ] **Usage** - Basic example
- [ ] **API Reference** - Inputs, outputs, methods
- [ ] **Examples** - Multiple use cases
- [ ] **Accessibility** - A11y considerations
- [ ] **Theming** - How to customize

### 4.3 Documentation Site Options

**Option A: Use existing demo app**

- Enhance current docs pages
- Add more examples
- Improve navigation

**Option B: Dedicated docs site (Recommended)**

- Use Astro or Docusaurus
- Better SEO
- Versioned documentation
- Search functionality

### 4.4 Interactive Playground

- [ ] Add StackBlitz/CodeSandbox integration
- [ ] Allow live editing of examples
- [ ] Show code alongside preview

### 4.5 Deliverables

- [ ] Complete documentation for all components
- [ ] Getting started guide
- [ ] Theming guide
- [ ] API reference
- [ ] Live examples

---

## Phase 5: Developer Experience Polish (Week 4)

**Goal:** Make the library a joy to use

### 5.1 Angular Schematics

- [ ] Create `ng add @angular-ai-kit/core` schematic
  - Auto-install dependencies
  - Configure Tailwind CSS
  - Add CSS imports
  - Update angular.json if needed

- [ ] Create component schematics
  ```bash
  ng generate @angular-ai-kit/core:chat-container
  ```

### 5.2 IDE Support

- [ ] Add JSDoc comments to all public APIs
- [ ] Create code snippets for VS Code
- [ ] Ensure IntelliSense works properly

### 5.3 Error Messages

- [ ] Add helpful error messages for common issues
- [ ] Validate configuration
- [ ] Provide migration guides

### 5.4 Example Projects

- [ ] Create example repositories:
  - `angular-ai-kit-starter` - Basic chat app
  - `angular-ai-kit-openai` - OpenAI integration
  - `angular-ai-kit-streaming` - Streaming responses

### 5.5 Deliverables

- [ ] Working `ng add` schematic
- [ ] VS Code extension/snippets
- [ ] Example repositories
- [ ] Migration guides

---

## Phase 6: CI/CD & Quality (Week 4-5)

**Goal:** Ensure quality and automate releases

### 6.1 GitHub Actions Workflows

- [ ] **CI Workflow** (on PR)

  ```yaml
  - Lint all packages
  - Build all packages
  - Run unit tests
  - Check bundle sizes
  - Preview deployment
  ```

- [ ] **Release Workflow** (on tag)
  ```yaml
  - Build packages
  - Run tests
  - Publish to npm
  - Create GitHub release
  - Update documentation
  ```

### 6.2 Quality Gates

- [ ] Bundle size limits
- [ ] Code coverage thresholds
- [ ] Lighthouse scores for demo
- [ ] Accessibility audits

### 6.3 Testing Strategy

- [ ] Unit tests for utilities
- [ ] Component tests (optional for v1)
- [ ] E2E tests for CLI
- [ ] Visual regression tests (future)

### 6.4 Deliverables

- [ ] CI/CD pipelines working
- [ ] Automated releases
- [ ] Quality badges in README

---

## Technical Checklist

### Package Structure

```
dist/packages/
├── core/
│   ├── package.json
│   ├── README.md
│   ├── fesm2022/           # ES modules
│   ├── esm2022/            # ES2022 modules
│   ├── index.d.ts          # TypeScript declarations
│   └── public-api.d.ts
├── utils/
│   ├── package.json
│   ├── index.js
│   └── index.d.ts
├── tokens/
│   ├── package.json
│   ├── theme.css
│   └── index.d.ts
└── cli/
    ├── package.json
    ├── bin/
    └── templates/
```

### Required Files for npm

- [x] `package.json` - Complete metadata
- [x] `README.md` - Package-specific readme
- [x] `LICENSE` - MIT license
- [ ] `CHANGELOG.md` - Version history (generated on first release)
- [x] `.npmignore` - Exclude unnecessary files (auto-generated by ng-packagr)

### Bundle Size Targets

| Package                | Target Size    | Actual Size | Status                               |
| ---------------------- | -------------- | ----------- | ------------------------------------ |
| @angular-ai-kit/core   | < 50KB gzipped | 75.6 KB     | ⚠️ Over target (acceptable for v0.1) |
| @angular-ai-kit/utils  | < 5KB gzipped  | 15.7 KB     | ⚠️ Over target (includes formatters) |
| @angular-ai-kit/tokens | < 10KB gzipped | 7.3 KB      | ✅ Within target (includes all CSS)  |
| @angular-ai-kit/cli    | < 100KB        | TBD         | 🔄 Not built yet                     |

### Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

### Angular Version Support

- Angular 21.x (primary)
- Angular 20.x (compatible, not tested)

---

## Launch Checklist

### Pre-Launch (1 week before)

- [x] All packages build successfully
- [ ] Documentation is complete
- [ ] Examples are working
- [ ] CLI is tested
- [x] README is polished
- [ ] CHANGELOG is generated
- [x] License is in place
- [ ] Contributing guide exists

### Launch Day

- [ ] Publish to npm
- [ ] Create GitHub release
- [ ] Announce on Twitter/X
- [ ] Post on Reddit (r/angular)
- [ ] Share on dev.to
- [ ] Update demo site

### Post-Launch (1 week after)

- [ ] Monitor npm downloads
- [ ] Respond to issues
- [ ] Fix critical bugs
- [ ] Gather feedback
- [ ] Plan v0.2.0

---

## Timeline Summary

| Phase                   | Duration | Key Deliverable                     |
| ----------------------- | -------- | ----------------------------------- |
| Phase 1: Library Build  | Week 1   | Packages build successfully         |
| Phase 2: CLI Tool       | Week 2   | `npx @angular-ai-kit/cli add` works |
| Phase 3: npm Publishing | Week 2-3 | Packages on npm                     |
| Phase 4: Documentation  | Week 3-4 | Complete docs site                  |
| Phase 5: DX Polish      | Week 4   | `ng add` schematic                  |
| Phase 6: CI/CD          | Week 4-5 | Automated releases                  |

**Total Timeline: 4-5 weeks to production**

---

## Quick Start Commands (After Completion)

### For Developers Using the Library

```bash
# Option 1: Full npm install
npm install @angular-ai-kit/core @angular-ai-kit/utils

# Option 2: CLI-based (copy components)
npx @angular-ai-kit/cli init
npx @angular-ai-kit/cli add chat-input ai-response message-list

# Option 3: ng add
ng add @angular-ai-kit/core
```

### Basic Usage

```typescript
import { AIResponseComponent, ChatInputComponent } from '@angular-ai-kit/core';

@Component({
  imports: [ChatInputComponent, AIResponseComponent],
  template: `
    <ai-response [content]="response" />
    <ai-chat-input (send)="handleSend($event)" />
  `,
})
export class ChatComponent {
  response = signal('Hello! How can I help you?');

  handleSend(message: string) {
    // Send to AI backend
  }
}
```

---

## Publishing to npm (Quick Reference)

When ready to publish, follow these steps:

### 1. Create npm Organization

1. Go to [npmjs.com](https://www.npmjs.com/)
2. Sign in or create an account
3. Create organization: `@angular-ai-kit`
4. Enable 2FA for publishing (recommended)

### 2. Authenticate

```bash
npm login
```

### 3. First Release

```bash
# Dry run first to verify
npm run release:dry-run

# Actual release
npm run release --first-release
```

### 4. Subsequent Releases

```bash
# Patch release (0.1.0 -> 0.1.1)
npm run release

# Minor release (0.1.0 -> 0.2.0)
npm run release -- --release-as minor

# Major release (0.1.0 -> 1.0.0)
npm run release -- --release-as major
```

### 5. Verify Publication

```bash
# Check packages are published
npm view @angular-ai-kit/core
npm view @angular-ai-kit/utils
npm view @angular-ai-kit/tokens
```

---

## Resources & References

- [ng-packagr Documentation](https://github.com/ng-packagr/ng-packagr)
- [Nx Release Documentation](https://nx.dev/recipes/nx-release)
- [Shadcn UI CLI](https://github.com/shadcn-ui/ui/tree/main/packages/cli)
- [Spartan UI](https://www.spartan.ng/)
- [Angular Library Guide](https://angular.dev/tools/libraries/creating-libraries)

---

_Last Updated: January 2, 2026_
_Status: Phase 1 Complete - Ready for npm Publishing_
