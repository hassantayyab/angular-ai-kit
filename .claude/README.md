# Angular AI Kit - Project Rules & Guidelines

This directory contains all project rules, guidelines, and templates to ensure consistent development practices.

---

## 📁 File Structure

```
.claude/
├── README.md                  # This file - overview of rules
├── CLAUDE.md                  # Main project memory & rules
├── TODO-TEMPLATE.md           # Template for phase TODO files
└── rules/
    ├── accessibility.md       # A11y requirements (WCAG AA)
    ├── angular-v21.md         # Angular v21 best practices
    ├── architecture.md        # Scalability & maintainability
    ├── tailwind-v4.md         # Tailwind CSS v4 styling
    ├── typescript.md          # TypeScript best practices
    └── todo-management.md     # TODO.md tracking system
```

---

## 🎯 Quick Start

### For New Contributors

1. Read `CLAUDE.md` - Main project overview and rules
2. Read `rules/angular-v21.md` - Angular-specific patterns
3. Read `rules/tailwind-v4.md` - Styling guidelines
4. Check current `TODO.md` - See what needs to be done

### Starting a New Phase

1. Archive current TODO: `mv TODO.md TODO-Phase-X.X.md`
2. Create new TODO: `cp .claude/TODO-TEMPLATE.md TODO.md`
3. Customize TODO.md for new phase
4. Update PLAN.md with phase status

### Before Committing Code

1. Check Code Review Checklist in `CLAUDE.md`
2. Verify accessibility requirements in `rules/accessibility.md`
3. Run linting: `nx run-many --target=lint --all`
4. Update TODO.md with completed tasks

---

## 📖 Rules Files Explained

### CLAUDE.md - Main Project Memory

**Purpose:** Central source of truth for project context and rules

**Contains:**

- Project overview and scope
- Tech stack (Angular v21, Tailwind v4)
- File organization and naming conventions
- Git conventions
- Phase management & TODO tracking
- Code review checklist
- What NOT to do

**When to read:** Start of project, when unsure about conventions

---

### TODO-TEMPLATE.md - Phase TODO Template

**Purpose:** Standardized template for tracking phase progress

**Contains:**

- Completed tasks section
- In progress section
- Pending tasks section
- Progress summary format
- Phase goals template
- Issues & blockers tracking

**When to use:** Start of each new phase

---

### rules/accessibility.md - A11y Requirements

**Purpose:** Ensure all components meet WCAG AA standards

**Contains:**

- Semantic HTML requirements
- ARIA attributes and roles
- Keyboard navigation patterns
- Screen reader support
- Color contrast requirements
- Focus management
- Touch target sizes
- Accessibility testing checklist

**When to read:** Before implementing any component

---

### rules/angular-v21.md - Angular Best Practices

**Purpose:** Angular v21-specific patterns and requirements

**Contains:**

- Standalone components (no NgModules)
- Signal-based inputs/outputs
- OnPush change detection
- New control flow syntax (@if, @for)
- inject() function for DI
- Host bindings pattern
- SSR/Hydration compatibility
- Signal patterns and examples

**When to read:** Before writing Angular code

---

### rules/architecture.md - Scalability & Maintainability

**Purpose:** Ensure library scales from 15 to 50+ components

**Contains:**

- Component composition patterns
- Module boundaries & DI
- Performance optimization
- API design principles
- Code organization
- Type safety requirements
- Dependency injection patterns
- Communication patterns

**When to read:** Before designing new features or components

---

### rules/tailwind-v4.md - Styling Guidelines

**Purpose:** Tailwind CSS v4-specific setup and patterns

**Contains:**

- Tailwind v4 setup (different from v3!)
- @tailwindcss/postcss plugin usage
- ViewEncapsulation.None pattern
- Dynamic classes with cn() utility
- CSS custom properties for theming
- @layer directives
- Dark mode support
- Responsive design patterns

**When to read:** Before writing any styles

---

### rules/typescript.md - TypeScript Best Practices

**Purpose:** Ensure type safety and clean TypeScript code

**Contains:**

- Strict mode requirements
- Type safety patterns
- Discriminated unions
- Type guards
- Generic utilities
- Naming conventions
- Optional chaining
- Error handling
- JSDoc comments

**When to read:** When writing TypeScript code

---

### rules/todo-management.md - TODO Tracking System

**Purpose:** Maintain accurate progress tracking across phases

**Contains:**

- TODO.md creation & update process
- When to update TODO.md
- Progress calculation formula
- Phase transition workflow
- Archive/recreate strategy
- Integration with PLAN.md
- Quick reference checklist

**When to read:** Start/end of phases, when updating progress

---

## 🔄 Common Workflows

### Creating a New Component

1. Check `rules/angular-v21.md` for component patterns
2. Check `rules/tailwind-v4.md` for styling approach
3. Check `rules/accessibility.md` for a11y requirements
4. Check `CLAUDE.md` for naming conventions
5. Update TODO.md when task is complete

### Starting a New Phase

1. Follow `rules/todo-management.md` phase transition process
2. Archive current TODO as `TODO-Phase-X.X.md`
3. Copy `TODO-TEMPLATE.md` to `TODO.md`
4. Customize for new phase
5. Update PLAN.md

### Reviewing Code

1. Use Code Review Checklist in `CLAUDE.md`
2. Verify Angular v21 patterns from `rules/angular-v21.md`
3. Check accessibility from `rules/accessibility.md`
4. Verify Tailwind usage from `rules/tailwind-v4.md`
5. Check TypeScript quality from `rules/typescript.md`

---

## 🚫 Common Mistakes to Avoid

### ❌ DON'T

- Use SCSS (use CSS only)
- Use constructor injection (use `inject()`)
- Use `ngClass` or `ngStyle` (use bindings)
- Use `@HostBinding`/`@HostListener` (use `host` object)
- Forget to update TODO.md after completing tasks
- Let TODO.md and PLAN.md get out of sync
- Use old Tailwind v3 syntax
- Ignore accessibility requirements
- Create non-standalone components

### ✅ DO

- Use CSS only (no SCSS)
- Use `inject()` function for DI
- Use signal-based inputs/outputs
- Use OnPush change detection
- Update TODO.md in real-time
- Keep PLAN.md synchronized
- Use Tailwind v4 @source directive
- Follow WCAG AA standards
- Create standalone components only

---

## 📊 Priority Levels

When in doubt, follow this priority order:

1. **CRITICAL (Must Follow):**
   - Angular v21 best practices
   - Accessibility (WCAG AA)
   - CSS only (no SCSS)
   - TODO.md tracking

2. **HIGH (Should Follow):**
   - Scalability patterns
   - TypeScript strict mode
   - Tailwind v4 setup
   - Code review checklist

3. **MEDIUM (Good to Follow):**
   - File organization
   - Naming conventions
   - Documentation

---

## 🔗 External Resources

- [Angular v21 Documentation](https://angular.dev)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com)
- [Nx Angular Documentation](https://nx.dev/docs/technologies/angular)
- [WCAG AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🆘 Getting Help

If you're unsure about:

- **Angular patterns:** Check `rules/angular-v21.md`
- **Styling:** Check `rules/tailwind-v4.md`
- **Accessibility:** Check `rules/accessibility.md`
- **Architecture:** Check `rules/architecture.md`
- **Progress tracking:** Check `rules/todo-management.md`
- **Everything else:** Check `CLAUDE.md`

---

_Last Updated: December 24, 2025_
_All rules are designed to ensure scalability, maintainability, and accessibility_
