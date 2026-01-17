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

## Skills (Model-Invoked Capabilities)

**Specialized knowledge is organized as Skills in `.claude/skills/`. Skills are automatically loaded when relevant to your task.**

Unlike always-loaded rules, Skills are **model-invoked** - Claude automatically decides when to use them based on the task at hand. This keeps context efficient while providing deep expertise when needed.

| Skill                  | Triggers When                                                |
| ---------------------- | ------------------------------------------------------------ |
| `angular-v21`          | Writing Angular code, components, services, signals          |
| `component-patterns`   | Creating/modifying components, inputs/outputs, templates     |
| `tailwind-v4`          | Styling with Tailwind, cn() utility, responsive design       |
| `typescript`           | Writing TypeScript, types, interfaces, error handling        |
| `accessibility`        | Implementing a11y, ARIA, keyboard navigation, screen readers |
| `styling-architecture` | CSS variables, color system, theme() usage, dark mode        |
| `architecture`         | Code organization, barrel exports, naming conventions        |
| `angular-cdk`          | Dialogs, overlays, focus management, virtual scrolling       |
| `ai-components`        | AI chat interfaces, Spartan UI, streaming, message patterns  |
| `todo-management`      | Phase tracking, TODO.md management, progress updates         |

### How Skills Work

1. **Automatic Discovery**: Claude reads skill names and descriptions at startup
2. **Context Matching**: When your task matches a skill's description, Claude loads it
3. **Deep Expertise**: Full skill content is loaded only when relevant
4. **Efficient Context**: Unused skills don't consume context tokens

### Skill Directory Structure

```text
.claude/skills/
├── angular-v21/
│   └── SKILL.md
├── component-patterns/
│   └── SKILL.md
├── tailwind-v4/
│   └── SKILL.md
└── ... (10 skills total)
```

**DO NOT dump all rules into CLAUDE.md. Skills handle specialized knowledge.**

---

## ⛔ Git Rules (CRITICAL)

**NEVER commit or push without explicit user permission.**

- ❌ **NEVER run `git commit`** unless user explicitly asks
- ❌ **NEVER run `git push`** unless user explicitly asks
- ❌ **NEVER run `git commit && git push`** or any chained git commands
- ✅ You MAY stage files with `git add` only
- ✅ After making changes, inform user: "Changes are ready. Run `git add . && git commit -m 'message' && git push` when ready."

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
- ❌ **NEVER use `dark:` prefix** (use Tailwind semantic classes: bg-card, text-foreground)
- ❌ **NEVER use `var()` in Tailwind** (use bg-card NOT bg-[var(--card)])

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

_Skills provide deep expertise when needed. See `.claude/skills/` directory._
