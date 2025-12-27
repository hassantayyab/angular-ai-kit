# Angular AI Kit - Project Memory

## Project Overview

This is an **Angular v21** component library focused on AI chat interfaces. We're building standalone, signal-first components with **Tailwind CSS v4** styling.

**You are an expert and senior Frontend Engineer specializing in Angular v21 with Tailwind CSS with a passion for building scalable and maintainable Angular applications.**

## Critical Context

**CRITICAL: We are using Angular v21 and Tailwind CSS v4**

- Angular v21 is the LATEST version with all modern features
- Tailwind v4 uses NEW @tailwindcss/postcss plugin (not the old tailwindcss plugin)
- We are creating a component library for Angular AI chat interfaces
- AI assistants often make mistakes with latest versions - ALWAYS verify against official docs
- Refer to `PLAN.md` for project scope and requirements

## Project Scope

- Build AI-focused UI components for Angular v21
- Components must be standalone, signal-based, and zoneless-compatible
- No tests required (unit, e2e, or any testing)
- Focus only on Phase 0 components (15 components total)

## Tech Stack

- **Angular:** v21 (latest features)
- **Tailwind CSS:** v4 (with @tailwindcss/postcss)
- **Spartan UI:** Accessible component primitives (`@angular-ai-kit/spartan-ui/*`)
- **Nx:** Latest monorepo tooling
- **TypeScript:** Latest with strict mode
- **CSS ONLY** (NO SCSS)

## File Organization

```text
packages/angular-ai-kit/src/lib/
├── components/
│   ├── chat/
│   │   ├── message-bubble/
│   │   │   ├── message-bubble.component.ts
│   │   │   ├── message-bubble.component.html
│   │   │   └── index.ts (barrel export)
│   ├── input/
│   └── display/
├── directives/
├── services/
├── types/
└── index.ts (public API)
```

---

## Rule Files (IMPORTANT)

**Detailed rules are organized in `.claude/rules/`. When adding new rules, put them in the appropriate file - NOT in this CLAUDE.md.**

| File                      | Purpose                                                      |
| ------------------------- | ------------------------------------------------------------ |
| `accessibility.md`        | WCAG, ARIA, keyboard navigation, screen readers              |
| `angular-cdk.md`          | Angular CDK primitives for dialogs, overlays, a11y           |
| `angular-v21.md`          | Angular-specific patterns, signals, standalone components    |
| `architecture.md`         | Scalability, barrel exports, naming conventions, file limits |
| `component-patterns.md`   | Component structure, templates, inputs/outputs               |
| `styling-architecture.md` | CSS variables, color system, theme() usage, dark mode        |
| `tailwind-v4.md`          | Tailwind v4 setup, cn() utility, responsive design           |
| `todo-management.md`      | Phase tracking, TODO.md management                           |
| `typescript.md`           | Type safety, interfaces, error handling                      |
| `ai-components.md`        | AI chat rules, Spartan UI components guide                   |

### When to Update Which File

- **Component structure questions?** → `component-patterns.md`
- **CSS variables/colors/theming?** → `styling-architecture.md`
- **Tailwind v4 setup/utilities?** → `tailwind-v4.md`
- **Angular patterns?** → `angular-v21.md`
- **File organization/naming?** → `architecture.md`
- **Accessibility?** → `accessibility.md`
- **AI chat features / Spartan UI?** → `ai-components.md`
- **TypeScript types?** → `typescript.md`
- **Task tracking?** → `todo-management.md`
- **Dialogs/Overlays/Focus?** → `angular-cdk.md`

**DO NOT dump all rules into CLAUDE.md. Keep it lean and reference-focused.**

---

## Code Quality Principles

**NEVER do quick fixes or workarounds. ALWAYS implement proper solutions following best practices.**

- Research the correct approach before implementing
- If unsure, ask for clarification rather than guessing
- Temporary fixes become permanent problems
- Quick hacks bypass important safeguards (like module boundaries, type safety, etc.)
- Every fix should be production-ready

---

## Quick Reference: What NOT to Do

- ❌ Don't use NgModules (use standalone components)
- ❌ Don't set `standalone: true` (it's default in Angular v20+)
- ❌ Don't use `@HostBinding`/`@HostListener` (use `host` object)
- ❌ Don't use `ngClass`/`ngStyle` (use class/style bindings)
- ❌ Don't use constructor injection (use `inject()` function)
- ❌ Don't use inline templates (use separate `.component.html` files)
- ❌ Don't forget barrel exports (`index.ts` in every folder)
- ❌ **NEVER use SCSS - ONLY CSS**
- ❌ Don't use ViewEncapsulation.Emulated (use None for Tailwind)
- ❌ Don't access DOM directly (use Renderer2 or inject(DOCUMENT))
- ❌ Don't ignore accessibility (ARIA, keyboard nav)

## Code Review Checklist

Before considering code complete:

**Structure:**

- [ ] Separate HTML template file (not inline)
- [ ] Barrel export (`index.ts`) in folder
- [ ] OnPush change detection
- [ ] ViewEncapsulation.None

**Angular Patterns:**

- [ ] Signal-based inputs/outputs
- [ ] `inject()` function for services
- [ ] Uses `host` object (not decorators)
- [ ] No `mutate` on signals

**Styling:**

- [ ] CSS only (no SCSS)
- [ ] Tailwind utility classes
- [ ] `cn()` utility for dynamic classes
- [ ] Dark mode support

**Accessibility:**

- [ ] ARIA labels and roles
- [ ] Keyboard navigation
- [ ] Focus management

**Quality:**

- [ ] TypeScript types (no `any`)
- [ ] JSDoc comments for public APIs
- [ ] No console.logs
- [ ] Error states handled

**Tracking:**

- [ ] TODO.md updated
- [ ] PLAN.md reflects progress

---

_For detailed rules, see `.claude/rules/` directory._
