# TODO Management Best Practices

**Purpose:** Track phase progress in real-time and maintain accurate project status

---

## 📋 Core Principles

### 1. Create TODO.md at Phase Start

```bash
# Copy template for new phase
cp .claude/TODO-TEMPLATE.md TODO.md

# Customize for the current phase
# - Update phase number and name
# - Break down all tasks from PLAN.md
# - Set initial progress to 0%
```

### 2. Update in Real-Time

- ✅ Mark tasks as [x] **immediately** after completion
- ✅ Update progress percentages after each session
- ✅ Add newly discovered tasks as they arise
- ✅ Move tasks between sections (Pending → In Progress → Completed)

### 3. Keep PLAN.md Synchronized

- After updating TODO.md, update corresponding sections in PLAN.md
- Mark completed phases with ✅ in PLAN.md
- Update phase completion percentages
- Keep both files showing the same status

---

## 🎯 When to Update TODO.md

### Start of Phase

- [ ] Copy TODO-TEMPLATE.md to TODO.md
- [ ] Update phase number and name
- [ ] Break down all tasks from PLAN.md
- [ ] Set initial progress to 0%
- [ ] Commit TODO.md to git

### During Work (Real-Time)

- [ ] Mark task as complete [x] immediately after finishing
- [ ] Add new tasks discovered during implementation
- [ ] Update "In Progress" section when starting new work
- [ ] Update progress percentages after major milestones

### End of Session

- [ ] Verify all completed work is marked [x]
- [ ] Update progress summary
- [ ] Update timestamp
- [ ] Update PLAN.md to match TODO.md
- [ ] Commit changes to git

### End of Phase (IMPORTANT)

- [ ] Mark all remaining tasks as complete [x]
- [ ] Update progress to 100%
- [ ] Update PLAN.md phase status to ✅ COMPLETE
- [ ] **ARCHIVE current TODO.md as `TODO-Phase-X.X.md`**
- [ ] **CREATE FRESH TODO.md for next phase from template**
- [ ] Commit both archived and new TODO files

**Why Archive Instead of Continuous:**

- Keeps each phase focused and manageable
- Historical record of each phase's progress
- Prevents TODO.md from becoming too long
- Clear start/end boundaries for phases
- Easy to review what was accomplished in each phase

---

## 📝 TODO.md Structure

### Required Sections

#### 1. Completed Tasks ✅

```markdown
## ✅ Completed Tasks

- [x] Task 1
- [x] Task 2
```

#### 2. In Progress 🔄

```markdown
## 🔄 In Progress

### 1. Category Name

- [x] Subtask 1 (done)
- [ ] Subtask 2 (working on this)
- [ ] Subtask 3 (pending)
```

#### 3. Progress Summary 📊

```markdown
## 📊 Progress Summary

**Phase:** 0.2 - Core Chat Components
**Status:** In Progress
**Overall Progress:** 60% Complete

**Total Tasks:** 5 major categories
**Completed:** 3 ✅
**In Progress:** 1 🔄
**Pending:** 1 ⏳
```

#### 4. Timestamp

```markdown
_Last Updated: 2025-12-24_
_Progress tracked in real-time during implementation_
```

---

## ✅ Quality Checklist

Before considering TODO.md complete:

- [ ] All tasks from PLAN.md are included
- [ ] Tasks are broken down into actionable items
- [ ] Progress percentages are accurate
- [ ] Timestamp is current
- [ ] PLAN.md matches TODO.md status
- [ ] No tasks are forgotten or missed
- [ ] Completed tasks are marked [x]
- [ ] In Progress tasks are clear
- [ ] Progress summary is up to date

---

## 🚫 Common Mistakes to Avoid

### ❌ DON'T

- Don't wait until end of phase to update TODO.md
- Don't forget to mark tasks as complete [x]
- Don't let TODO.md and PLAN.md get out of sync
- Don't skip updating progress percentages
- Don't forget to commit TODO.md changes
- Don't leave outdated timestamps

### ✅ DO

- Update TODO.md immediately after each task
- Keep progress summary accurate in real-time
- Sync PLAN.md with TODO.md regularly
- Update timestamps at end of each session
- Commit TODO.md changes to git
- Use TODO.md as source of truth for progress

---

## 📊 Progress Calculation

### Percentage Formula

```
Progress % = (Completed Tasks / Total Tasks) × 100
```

### Example

```markdown
**Total Tasks:** 10 major categories
**Completed:** 8 ✅
**In Progress:** 1 🔄
**Pending:** 1 ⏳

**Overall Progress:** 80% Complete
```

### Status Indicators

- **0-25%:** Just Started
- **26-50%:** In Progress
- **51-75%:** Making Good Progress
- **76-99%:** Nearly Complete
- **100%:** Complete ✅

---

## 🔗 Integration with Other Files

### PLAN.md

- Copy phase tasks from PLAN.md to TODO.md
- Update PLAN.md phase status when TODO.md changes
- Keep phase completion percentages synchronized

### README.md

- Update README.md if new features are added
- Reflect completed phases in README.md
- Keep documentation in sync with progress

### TESTING.md

- Create/update TESTING.md as features are built
- Add test instructions for new components
- Update test status in TESTING.md

---

## 🎯 Example Workflow

### Completing Phase 0.1 and Starting Phase 0.2

#### Step 1: Complete Current Phase

```bash
# Ensure TODO.md shows 100% complete
# All tasks marked [x]
# Progress summary updated
```

#### Step 2: Archive Phase 0.1 TODO

```bash
# Rename current TODO to archive it
mv TODO.md TODO-Phase-0.1.md

# Stage archived file
git add TODO-Phase-0.1.md

# Commit with clear message
git commit -m "docs: archive Phase 0.1 TODO (100% complete)"
```

#### Step 3: Create Fresh TODO for Phase 0.2

```bash
# Copy template
cp .claude/TODO-TEMPLATE.md TODO.md

# Edit TODO.md:
# - Change "Phase X.X" to "Phase 0.2 - Core Chat Components"
# - Add all Phase 0.2 tasks from PLAN.md
# - Set progress to 0%
# - Update timestamp

# Commit new TODO
git add TODO.md
git commit -m "docs: create TODO.md for Phase 0.2"
```

#### Step 4: Update PLAN.md

```markdown
# In PLAN.md, update:

## 🎯 Phase 0.1: Project Setup & Foundation ✅ 100% COMPLETE

**Status:** ✅ Complete - All foundation tasks done

## 🎯 Phase 0.2: Core Chat Components 🔄 0% IN PROGRESS

**Status:** In Progress - Starting component development
```

### Directory Structure After Multiple Phases

```
angular-ai-kit/
├── TODO.md                    # Current phase (Phase 0.2)
├── TODO-Phase-0.1.md         # Archived (100% complete)
├── TODO-Phase-0.2.md         # Archived (when 0.2 is done)
├── PLAN.md                    # Overall project plan
└── .claude/
    └── TODO-TEMPLATE.md       # Template for new phases
```

### During Implementation

```markdown
# Before starting task

## 🔄 In Progress

- [ ] Build MessageBubble component

# After completing task

## ✅ Completed Tasks

- [x] Build MessageBubble component

# Update progress

**Overall Progress:** 33% Complete (was 25%)
```

### Ending Session

```bash
# 1. Update TODO.md
# - Mark completed tasks [x]
# - Update progress %
# - Update timestamp

# 2. Update PLAN.md
# - Mark corresponding tasks [x]
# - Update phase status

# 3. Commit changes
git add TODO.md PLAN.md
git commit -m "docs: update progress - 80% Phase 0.1 complete"
```

---

## 🎓 Best Practices

1. **Be Specific:** Break down vague tasks into concrete actions
2. **Be Realistic:** Don't over-commit, track actual progress
3. **Be Consistent:** Use the same format across all phases
4. **Be Timely:** Update immediately, not later
5. **Be Accurate:** Progress % should reflect reality
6. **Be Synchronized:** Keep TODO.md and PLAN.md aligned

---

## 📋 TODO.md vs TodoWrite Tool

### TODO.md (Project-Level)

- Tracks **phase progress** and **major milestones**
- Persists across sessions (git-tracked file)
- Used for **long-term planning** and **phase completion**
- Updated **manually** in markdown format
- Synchronized with PLAN.md

### TodoWrite Tool (Session-Level)

- Tracks **current task** and **immediate subtasks**
- Temporary, session-specific tracking
- Used for **real-time work** and **active development**
- Updated **automatically** via tool
- Helps with focus during implementation

### When to Use Each

**Use TODO.md for:**

- Starting a new phase
- Tracking overall phase progress
- End-of-session updates
- Reviewing what's been accomplished
- Planning what's next

**Use TodoWrite tool for:**

- Breaking down current task into steps
- Tracking active work in real-time
- Keeping user informed of progress
- Managing complex multi-step tasks
- During active implementation

**Use Both Together:**

1. Check TODO.md to see what phase task to work on
2. Use TodoWrite tool to break down and track that task
3. When task is done, mark it [x] in TODO.md
4. Repeat for next task

---

## 🎯 Quick Reference: Phase Transition Checklist

**Use this checklist when moving from one phase to another:**

### Ending Current Phase

- [ ] All tasks in TODO.md marked as [x]
- [ ] Progress summary shows 100%
- [ ] PLAN.md updated with ✅ COMPLETE status
- [ ] Final timestamp updated
- [ ] All work committed to git

### Archiving Current Phase

- [ ] Run: `mv TODO.md TODO-Phase-X.X.md` (replace X.X with actual phase)
- [ ] Run: `git add TODO-Phase-X.X.md`
- [ ] Run: `git commit -m "docs: archive Phase X.X TODO (100% complete)"`
- [ ] Verify archived file is in git

### Starting New Phase

- [ ] Run: `cp .claude/TODO-TEMPLATE.md TODO.md`
- [ ] Edit TODO.md: Update phase number and name
- [ ] Edit TODO.md: Add all tasks from PLAN.md for new phase
- [ ] Edit TODO.md: Set progress to 0%
- [ ] Edit TODO.md: Update timestamp
- [ ] Run: `git add TODO.md`
- [ ] Run: `git commit -m "docs: create TODO.md for Phase X.X"`

### Updating PLAN.md

- [ ] Mark completed phase with ✅ 100% COMPLETE
- [ ] Add status line: "✅ Complete - All tasks done"
- [ ] Mark new phase with 🔄 IN PROGRESS
- [ ] Add status line: "In Progress - Starting [phase name]"
- [ ] Update progress summary at top of PLAN.md
- [ ] Run: `git add PLAN.md`
- [ ] Run: `git commit -m "docs: update PLAN.md - Phase X.X complete, Phase Y.Y started"`

### Verification

- [ ] `TODO.md` exists and is for current phase
- [ ] `TODO-Phase-X.X.md` archived file exists
- [ ] PLAN.md shows correct phase statuses
- [ ] All changes committed to git
- [ ] Ready to start work on new phase! 🚀

---

_This guide ensures consistent TODO.md management across all phases_
