# Angular AI Kit - Phase 0.2 TODO List

## ✅ Completed Tasks

(none yet - phase just started)

## 🔄 In Progress

(none currently)

## 📋 Pending Tasks

### 1. MessageBubble Component

- [ ] Create component directory structure (`packages/angular-ai-kit/src/lib/components/chat/message-bubble/`)
- [ ] Implement message-bubble.component.ts with:
  - [ ] Signal-based inputs (`message`, `showAvatar`, `customClasses`, `showActions`)
  - [ ] Signal-based outputs (`copy`, `regenerate`)
  - [ ] User/assistant message variants with role-based styling
  - [ ] Avatar display (user icon 👤 vs AI icon 🤖)
  - [ ] Copy button functionality (uses CopyToClipboardDirective)
  - [ ] Regenerate button (assistant messages only)
  - [ ] Hover actions for buttons
  - [ ] OnPush change detection
  - [ ] ViewEncapsulation.None
  - [ ] Accessible with ARIA labels
  - [ ] Dark mode support
- [ ] Create message-bubble.types.ts (if needed for complex types >50 lines)
- [ ] Create index.ts barrel export
- [ ] Add JSDoc comments for public API
- [ ] Test accessibility (keyboard navigation, screen reader)
- [ ] Test responsiveness (mobile/tablet/desktop)
- [ ] Update TODO.md progress

### 2. MessageList Component

- [ ] Create component directory structure (`packages/angular-ai-kit/src/lib/components/chat/message-list/`)
- [ ] Implement message-list.component.ts with:
  - [ ] Signal inputs (`messages`, `loading`, `customClasses`, `autoScroll`)
  - [ ] Scrollable container with overflow-y-auto
  - [ ] Auto-scroll to bottom on new messages (using effect())
  - [ ] Uses @for to loop through messages with track message.id
  - [ ] Loading state indicator (typing indicator)
  - [ ] Uses MessageBubbleComponent for each message
  - [ ] ViewChild for scroll container reference
  - [ ] Accessible with role="log" for screen readers
  - [ ] Max height: 600px (configurable)
  - [ ] Custom scrollbar styling
- [ ] Create message-list.types.ts (optional)
- [ ] Create index.ts barrel export
- [ ] Add JSDoc comments for public API
- [ ] Test accessibility
- [ ] Test responsiveness
- [ ] Update TODO.md progress

### 3. ChatContainer Component

- [ ] Create component directory structure (`packages/angular-ai-kit/src/lib/components/chat/chat-container/`)
- [ ] Implement chat-container.component.ts with:
  - [ ] Signal inputs (`messages`, `title`, `loading`, `showHeader`, `customClasses`)
  - [ ] Signal outputs (`messageSend`, `messageRegenerate`)
  - [ ] Main layout wrapper with header, messages, footer
  - [ ] Optional header with title
  - [ ] Integrates MessageListComponent
  - [ ] Placeholder for input section (Phase 0.3)
  - [ ] Full-height layout (h-screen)
  - [ ] Responsive flex design
  - [ ] Dark mode support
  - [ ] Border separation between sections
- [ ] Create chat-container.types.ts (optional)
- [ ] Create index.ts barrel export
- [ ] Add JSDoc comments for public API
- [ ] Test accessibility
- [ ] Test responsiveness
- [ ] Update TODO.md progress

### 4. Integration & Exports

- [ ] Create `/packages/angular-ai-kit/src/lib/components/chat/index.ts` barrel export
- [ ] Export all 3 components in chat/index.ts
- [ ] Update `/packages/angular-ai-kit/src/index.ts` to export chat components
- [ ] Update public API documentation

### 5. Demo App Integration

- [ ] Import components in demo app
- [ ] Create sample ChatMessage array with test data
- [ ] Display full chat interface in demo app
- [ ] Test MessageBubble standalone
- [ ] Test MessageList with multiple messages
- [ ] Test ChatContainer full layout
- [ ] Verify responsiveness on mobile/tablet/desktop
- [ ] Verify dark mode works correctly
- [ ] Test accessibility with keyboard only
- [ ] Verify no console errors

### 6. Final Verification

- [ ] Build all packages: `nx run-many --target=build --all`
- [ ] Lint all packages: `nx run-many --target=lint --all`
- [ ] Format check: `nx format:check`
- [ ] Verify component exports are tree-shakable
- [ ] Update PLAN.md to mark Phase 0.2 as complete
- [ ] All 3 components follow Angular v21 best practices
- [ ] Code review checklist passed

---

## 📊 Progress Summary

**Phase:** 0.2 - Core Chat Components
**Status:** In Progress
**Overall Progress:** 0% Complete

**Total Components:** 3
**Completed:** 0 ✅
**In Progress:** 0 🔄
**Pending:** 3 ⏳

**Component Progress:**

- [ ] MessageBubble Component (0% - Not started)
- [ ] MessageList Component (0% - Not started)
- [ ] ChatContainer Component (0% - Not started)

---

## 🎯 Next Steps

1. Start with MessageBubble component (smallest, most independent)
2. Build MessageList component (depends on MessageBubble)
3. Build ChatContainer component (integrates both)
4. Test all components in demo app
5. Final verification and Phase 0.2 completion

---

_Last Updated: 2025-12-25_
_Phase 0.2: 0% Complete - Starting component development_
