# Angular AI Kit - Project Memory

## Project Overview

This is an **Angular v21** component library focused on AI chat interfaces. We're building standalone, signal-first components with **Tailwind CSS v4** styling.

**You are an expert Angular developer with a passion for building scalable and maintainable Angular applications.**

## Critical Context

**CRITICAL: We are using Angular v21 and Tailwind CSS v4**

- Angular v21 is the LATEST version with all modern features
- Tailwind v4 uses NEW @tailwindcss/postcss plugin (not the old tailwindcss plugin)
- AI assistants often make mistakes with latest versions - ALWAYS verify against official docs
- Please refer to the PLAN.md file for the project scope and requirements. Please note that this is only for reference and not to be followed blindly. Feel free to improve the plan and add more tasks as you see fit when working on a particular phase and add these tasks to the TODO.md file.

## Project Scope

- Build AI-focused UI components for Angular v21
- Components must be standalone, signal-based, and zoneless-compatible
- No tests required (unit, e2e, or any testing)
- Focus only on Phase 0 components (15 components total)

## Tech Stack

- **Angular:** v21 (latest features)
- **Tailwind CSS:** v4 (with @tailwindcss/postcss)
- **Nx:** Latest monorepo tooling
- **TypeScript:** Latest with strict mode
- **CSS ONLY** (NO SCSS)

**Monorepo:** This project uses Nx for monorepo management. Reference: [Nx Angular Documentation](https://nx.dev/docs/technologies/angular)

## File Organization

```text
packages/angular-ai-kit/src/lib/
├── components/
│   ├── chat/
│   │   ├── message-bubble/
│   │   │   ├── message-bubble.component.ts (max 500 lines)
│   │   │   ├── message-bubble.types.ts (if complex types)
│   │   │   └── index.ts (barrel export)
│   ├── input/
│   └── display/
├── directives/
├── services/
├── types/
├── tokens/
└── index.ts (public API)
```

## Naming Conventions

- **Components:** `kebab-case.component.ts` (e.g., `message-bubble.component.ts`)
- **Directives:** `kebab-case.directive.ts` (e.g., `copy-to-clipboard.directive.ts`)
- **Services:** `kebab-case.service.ts` (e.g., `chat.service.ts`)
- **Types:** `kebab-case.types.ts` (e.g., `chat-message.types.ts`)
- **Utils:** `kebab-case.ts` (e.g., `token-counter.ts`)
- **Barrel exports:** `index.ts` in each folder

## File Size Limits

- **Maximum 500 lines per file**
- If a file exceeds 500 lines, refactor by:
  - Extracting helper functions to separate files
  - Splitting complex components into smaller ones
  - Moving types to `.types.ts` files
  - Creating utility functions in `@angular-ai-kit/utils`

## Git Conventions

### Commit Messages

- Use clear, descriptive messages
- Format: `feat: add MessageBubble component`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`

### Branch Naming

- `feature/component-name`
- `fix/issue-description`
- `docs/update-readme`

## Dependencies

- Only add dependencies when absolutely necessary
- Prefer peer dependencies for Angular packages
- Keep bundle size minimal
- Document why each dependency is needed

## Documentation

- Add JSDoc comments for public APIs
- Include usage examples in component files
- Document inputs, outputs, and methods
- Explain complex logic

## Phase Management & Progress Tracking

**CRITICAL: Always maintain TODO.md for tracking phase progress**

### TODO.md Requirements

- **Create FRESH TODO.md at the start of each NEW phase** with all tasks broken down
- **Archive previous phase TODO** as `TODO-Phase-X.X.md` before starting new phase
- **Update TODO.md in real-time** as tasks are completed
- **Mark tasks as done immediately** after completion using [x]
- **Include progress summary** showing percentage complete
- **Update PLAN.md** to reflect completed phases and tasks
- **Use consistent format** for task tracking across all phases

### Phase Transition Process

When completing a phase and starting the next:

1. **Archive current TODO.md:**

   ```bash
   mv TODO.md TODO-Phase-0.1.md
   git add TODO-Phase-0.1.md
   git commit -m "docs: archive Phase 0.1 TODO (100% complete)"
   ```

2. **Create new TODO.md for next phase:**

   ```bash
   cp .claude/TODO-TEMPLATE.md TODO.md
   # Customize for new phase
   git add TODO.md
   git commit -m "docs: create TODO.md for Phase 0.2"
   ```

3. **Update PLAN.md:**
   - Mark completed phase with ✅ 100%
   - Update new phase status to In Progress

**Benefits of Fresh TODO per Phase:**

- ✅ Each phase starts clean and focused
- ✅ Easy to find historical progress for specific phases
- ✅ Prevents TODO.md from becoming overwhelmingly long
- ✅ Clear separation between phases
- ✅ Archived TODOs serve as completion record

### TODO.md Structure

```markdown
# Angular AI Kit - Phase X.X TODO List

## ✅ Completed Tasks

- [x] Task 1
- [x] Task 2

## 🔄 In Progress

- [ ] Task 3
- [ ] Task 4

## 📊 Progress Summary

**Total Tasks:** X
**Completed:** Y (Z%)
**In Progress:** A
**Remaining:** B

_Last Updated: YYYY-MM-DD_
```

### When to Update TODO.md

- ✅ At the START of each phase - Create comprehensive task list
- ✅ After COMPLETING each task - Mark as done immediately
- ✅ When DISCOVERING new tasks - Add to appropriate section
- ✅ At END of phase - Update progress summary, mark phase complete
- ✅ Daily/Session end - Ensure TODO.md reflects current state

### PLAN.md Integration

- Update PLAN.md to match TODO.md progress
- Mark completed phases with ✅
- Update phase status (0%, 50%, 80%, 100%)
- Keep both files synchronized

## Performance

- Use OnPush change detection
- Minimize effect() usage
- Use computed() for derived state
- Avoid unnecessary re-renders
- Optimize bundle size

## Nx Monorepo Guidelines

- This project uses Nx workspace for managing multiple projects (library, demo app, CLI, docs)
- Use Nx generators to create new libraries/apps: `nx generate @nx/angular:library <name>`
- Use Nx commands for building: `nx build <project-name>`
- Leverage Nx affected commands for CI/CD: `nx affected:build`, `nx affected:lint`
- Enforce module boundaries to prevent circular dependencies
- Use `nx graph` to visualize project dependencies
- Configure proper tsconfig paths: `@angular-ai-kit/core`, `@angular-ai-kit/tokens`, `@angular-ai-kit/utils`
- Reference: [Nx Angular Documentation](https://nx.dev/docs/technologies/angular)

## AI Component Specific Rules

### Chat Components

- Always support both user and assistant messages
- Include copy functionality for assistant messages
- Support streaming text display
- Handle empty states gracefully

### Input Components

- Support keyboard shortcuts (Enter to submit, Shift+Enter for new line)
- Include loading/disabled states
- Validate inputs when appropriate
- Provide clear feedback

### Display Components

- Support markdown rendering
- Include syntax highlighting for code
- Provide copy-to-clipboard functionality
- Handle long content (scrolling, truncation)

### Control Components

- Emit clear events
- Support disabled states
- Provide visual feedback
- Maintain state properly

## What NOT to Do

- ❌ Don't use NgModules
- ❌ Don't set `standalone: true` (it's default in Angular v20+)
- ❌ Don't use `@HostBinding` and `@HostListener` decorators (use `host` object instead)
- ❌ Don't use `ngClass` (use `class` bindings instead)
- ❌ Don't use `ngStyle` (use `style` bindings instead)
- ❌ Don't use `mutate` on signals (use `update` or `set` instead)
- ❌ Don't use constructor injection (use `inject()` function instead)
- ❌ Don't assume globals like `new Date()` are available in templates
- ❌ Don't write arrow functions in templates
- ❌ Don't use RxJS unless absolutely necessary (prefer signals, use toSignal/toObservable for interop)
- ❌ Don't use Zone.js-dependent features
- ❌ **NEVER use SCSS - ONLY CSS**
- ❌ Don't use ViewEncapsulation.Emulated or ShadowDom (use ViewEncapsulation.None for Tailwind)
- ❌ Don't access DOM directly (use Renderer2 or inject(DOCUMENT) for SSR compatibility)
- ❌ Don't create components that aren't AI-focused
- ❌ Don't add unnecessary dependencies
- ❌ Don't write tests (as per project requirements)
- ❌ Don't use ChangeDetectionStrategy.Default
- ❌ Don't create non-standalone components
- ❌ Don't use template-driven forms (prefer Reactive forms)
- ❌ Don't add features outside the scope of Phase 0
- ❌ Don't forget SSR/hydration compatibility
- ❌ Don't ignore accessibility (ARIA, keyboard nav, screen readers)

## Code Review Checklist

Before considering code complete:

- [ ] Uses standalone components (without explicit `standalone: true`)
- [ ] Uses signal-based inputs/outputs (input(), output(), computed())
- [ ] Uses `inject()` function for services (no constructor injection)
- [ ] OnPush change detection
- [ ] ViewEncapsulation.None for Tailwind compatibility
- [ ] No `ngClass` or `ngStyle` (uses class/style bindings instead)
- [ ] No `@HostBinding` or `@HostListener` (uses `host` object)
- [ ] No `mutate` on signals (uses `update` or `set`)
- [ ] Uses CSS only (no SCSS)
- [ ] Uses Tailwind utility classes (utility-first approach)
- [ ] Uses `cn()` utility for dynamic classes
- [ ] Uses CSS custom properties for theming
- [ ] SSR/Hydration compatible (no direct DOM access, uses inject(DOCUMENT))
- [ ] Passes AXE accessibility checks
- [ ] Follows WCAG AA minimums
- [ ] Keyboard navigation works (Tab, Enter, Escape, Arrows)
- [ ] ARIA labels and roles properly set
- [ ] Focus management implemented
- [ ] Supports prefers-reduced-motion
- [ ] Dark mode support via CSS variables
- [ ] No unnecessary dependencies
- [ ] Responsive design (mobile-first)
- [ ] Touch targets minimum 44x44px
- [ ] Clean, readable code
- [ ] Proper TypeScript types (no `any`, use `unknown` if needed)
- [ ] No console.logs or debug code
- [ ] JSDoc comments for public APIs
- [ ] Follows file organization structure
- [ ] Input transforms used where appropriate
- [ ] Allows customClasses input for override
- [ ] Error states handled gracefully
- [ ] **TODO.md updated with task completion status**
- [ ] **PLAN.md updated to reflect completed work**
- [ ] **Progress summary reflects current state**

## Questions to Ask Before Implementation

When implementing a component:

1. Is this component AI-focused?
2. Does it use signals and OnPush?
3. Is it accessible?
4. Is it responsive?
5. Does it follow the established patterns?
6. Is the code clean and maintainable?
7. **Have I updated TODO.md to track this task?**

## Questions to Ask After Completing Work

Before finishing a session:

1. **Is TODO.md up to date with completed tasks?**
2. **Is PLAN.md updated to reflect progress?**
3. **Does the progress summary show accurate percentages?**
4. **Are all completed tasks marked with [x]?**
5. **Is the "Last Updated" timestamp current?**

---

_See additional rules in `.claude/rules/` for specific topics._
