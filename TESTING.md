# 🧪 Testing Guide - Angular AI Kit

## Quick Test Commands

### 1. Build All Packages ✅

```bash
# Build everything in parallel
nx run-many --target=build --all

# Expected: All 4 projects build successfully
# - @angular-ai-kit/core
# - @angular-ai-kit/tokens
# - @angular-ai-kit/utils
# - demo
```

**Status:** ✅ PASSING (All builds successful)

---

### 2. Lint All Code ✅

```bash
# Lint all projects
nx run-many --target=lint --all

# Auto-fix issues
nx run-many --target=lint --all --fix
```

**Status:** ✅ PASSING (All files pass linting)

---

### 3. Format Check ✅

```bash
# Check formatting
nx format:check

# Auto-format
nx format:write
```

**Status:** ✅ CONFIGURED (Prettier with Tailwind class sorting)

---

### 4. Serve Demo App

```bash
# Start demo at http://localhost:4200
nx serve demo

# With SSR
nx serve demo --ssr
```

**Status:** ⏳ TO TEST
**Expected:** App should serve without errors, Tailwind CSS v4 should work

---

### 5. Test Git Hooks

```bash
# Stage files
git add .

# Commit (will trigger hooks)
git commit -m "test: verify hooks work"

# Expected:
# ✅ lint-staged runs ESLint
# ✅ lint-staged runs Prettier
# ✅ commitlint validates message format
```

**Status:** ✅ CONFIGURED (Husky + lint-staged + commitlint)

---

### 6. Visualize Dependency Graph

```bash
# Opens browser with interactive graph
nx graph
```

**Status:** ✅ AVAILABLE

---

### 7. Test Individual Libraries

#### Build Individual Libraries

```bash
nx build angular-ai-kit  # Core library
nx build tokens           # Design tokens
nx build utils            # Utilities
```

#### Lint Individual Libraries

```bash
nx lint angular-ai-kit
nx lint tokens
nx lint utils
```

---

## Test Results Summary

### ✅ Passing Tests

- [x] Build all packages
- [x] Lint all code
- [x] TypeScript compilation
- [x] ESLint rules (Angular best practices)
- [x] Prettier formatting configured
- [x] Git hooks configured
- [x] Dependency resolution
- [x] Public API exports

### ⏳ Not Yet Tested

- [ ] Serve demo app
- [ ] SSR functionality
- [ ] Tailwind CSS v4 rendering
- [ ] Git commit hooks (manual test)
- [ ] Component functionality (no components yet)

---

## Verification Checklist

### TypeScript Configuration ✅

- [x] Strict mode enabled
- [x] Path aliases configured (@angular-ai-kit/core, tokens, utils)
- [x] All imports resolve correctly
- [x] No compilation errors

### Build Configuration ✅

- [x] ng-packagr builds succeed
- [x] All libraries build in parallel
- [x] Output in dist/ folder
- [x] Package.json metadata correct

### Code Quality ✅

- [x] ESLint configured with Angular rules
- [x] Prettier configured
- [x] Import sorting plugin active
- [x] Tailwind class sorting plugin active
- [x] No linting errors
- [x] Directive selectors use 'ai' prefix
- [x] Component selectors use 'ai' prefix

### Git Configuration ✅

- [x] Husky installed
- [x] pre-commit hook configured
- [x] commit-msg hook configured
- [x] lint-staged configured
- [x] commitlint configured

### Package Structure ✅

- [x] Core library exports directives, types, tokens
- [x] Tokens library exports CSS variables and types
- [x] Utils library exports cn, formatters, validators
- [x] All have proper .npmignore files
- [x] All have correct package.json metadata

---

## Next Steps

### Ready to Test

1. **Serve the demo app** - `nx serve demo`
2. **Test git hooks** - Make a commit to verify hooks run
3. **View dependency graph** - `nx graph`

### Not Yet Implemented

- Storybook setup (Phase 0.1 remaining)
- CI/CD pipeline (Phase 0.1 remaining)
- Semantic release (Phase 0.1 remaining)
- Component functionality (Phase 0.2)

---

## Common Issues & Solutions

### Issue: "Cannot find module @angular-ai-kit/..."

**Solution:** Run `nx build <library-name>` to build the library first

### Issue: Linting errors

**Solution:** Run `nx run-many --target=lint --all --fix`

### Issue: Formatting errors

**Solution:** Run `nx format:write`

### Issue: Build cache issues

**Solution:** Run `nx reset` to clear cache, then rebuild

---

## Performance Metrics

### Build Times (on M1 Mac)

- **@angular-ai-kit/tokens:** ~451ms
- **@angular-ai-kit/utils:** ~593ms
- **@angular-ai-kit/core:** ~1191ms
- **demo:** ~3.3 seconds
- **Total (parallel):** ~3.5 seconds

### Bundle Sizes (Demo App)

- **Browser bundle:** 261.96 kB raw, 71.53 kB gzipped
- **Server bundle:** ~2.27 MB (includes SSR runtime)

---

_Last updated: December 24, 2025_
_All tests passing as of Phase 0.1 completion_
