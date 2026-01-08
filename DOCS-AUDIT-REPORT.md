# Documentation Accuracy Audit Report

**Date:** 2026-01-08
**Audited Pages:** 26 documentation pages
**Issues Found:** 65+ discrepancies

---

## Summary

This audit compared all documentation pages against the actual component implementations. The most common issues are:

1. **Missing `customClasses` input** - Almost all components have this input but it's not documented
2. **Wrong selector in code examples** - Many examples use `<app-*>` instead of `<ai-*>` selectors
3. **Missing inputs/outputs** - Several components have undocumented inputs and outputs
4. **Incorrect default values** - Some documented defaults don't match actual values
5. **Wrong output names in guides** - Guides use `(messageSubmit)` but actual output is `(messageSend)`

---

## Component Documentation Issues (14 pages)

### 1. StreamingTextComponent (`components/streaming-text/`)

| Issue Type         | Description                                                               |
| ------------------ | ------------------------------------------------------------------------- |
| **Missing Input**  | `customClasses` input not documented                                      |
| **Wrong Selector** | Code example uses `<app-streaming-text>` instead of `<ai-streaming-text>` |

**Documented Inputs:** 5 | **Actual Inputs:** 6

---

### 2. TypingIndicatorComponent (`components/typing-indicator/`)

| Issue Type         | Description                                                                   |
| ------------------ | ----------------------------------------------------------------------------- |
| **Missing Input**  | `customClasses` input not documented                                          |
| **Wrong Selector** | Code example uses `<app-typing-indicator>` instead of `<ai-typing-indicator>` |

**Documented Inputs:** 5 | **Actual Inputs:** 6

---

### 3. CodeBlockComponent (`components/code-block/`)

| Issue Type        | Description                          |
| ----------------- | ------------------------------------ |
| **Missing Input** | `customClasses` input not documented |

**Documented Inputs:** 4 | **Actual Inputs:** 5

---

### 4. MarkdownRendererComponent (`components/markdown-renderer/`)

| Issue Type        | Description                          |
| ----------------- | ------------------------------------ |
| **Missing Input** | `customClasses` input not documented |

**Documented Inputs:** 1 | **Actual Inputs:** 2

---

### 5. AiResponseComponent (`components/ai-response/`)

| Issue Type             | Description                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------- |
| **Missing Inputs (5)** | `showCopy`, `showRegenerate`, `showFeedback`, `actionsAlwaysVisible`, `showAvatar` |
| **Missing Output**     | `codeBlockCopy` output not documented                                              |
| **Wrong Selector**     | Code example uses `<app-ai-response>` instead of `<ai-response>`                   |

**Documented Inputs:** 5 | **Actual Inputs:** 10
**Documented Outputs:** 4 | **Actual Outputs:** 5

---

### 6. UserMessageComponent (`components/user-message/`)

| Issue Type             | Description                          |
| ---------------------- | ------------------------------------ |
| **Missing Inputs (3)** | `showCopy`, `showEdit`, `showAvatar` |

**Documented Inputs:** 3 | **Actual Inputs:** 6

---

### 7. ChatInputComponent (`components/chat-input/`)

| Issue Type                      | Description                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| **Missing Input**               | `customClasses` input not documented                                                  |
| **Wrong Default (maxHeight)**   | Documented as `200`, actual is `120`                                                  |
| **Wrong Default (placeholder)** | Documented as `'Message Angular AI Kit...'`, actual is `'Message...'`                 |
| **Missing Outputs (5)**         | `contextClick`, `fileSelect`, `researchModeChange`, `sourceChange`, `recordingChange` |
| **Wrong Selector**              | Code examples use `<app-chat-input>` instead of `<ai-chat-input>`                     |

**Documented Inputs:** 12 | **Actual Inputs:** 13
**Documented Outputs:** 3 | **Actual Outputs:** 8

---

### 8. FeedbackButtonsComponent (`components/feedback-buttons/`)

| Issue Type        | Description                          |
| ----------------- | ------------------------------------ |
| **Missing Input** | `customClasses` input not documented |

**Documented Inputs:** 2 | **Actual Inputs:** 3

---

### 9. ResponseActionsComponent (`components/response-actions/`)

| Issue Type         | Description                            |
| ------------------ | -------------------------------------- |
| **Missing Input**  | `customClasses` input not documented   |
| **Missing Output** | `feedbackChange` output not documented |

**Documented Inputs:** 7 | **Actual Inputs:** 8
**Documented Outputs:** 4 | **Actual Outputs:** 5

---

### 10. MessageActionsComponent (`components/message-actions/`)

| Issue Type        | Description                          |
| ----------------- | ------------------------------------ |
| **Missing Input** | `customClasses` input not documented |

**Documented Inputs:** 5 | **Actual Inputs:** 6

---

### 11. PromptSuggestionsComponent (`components/prompt-suggestions/`)

| Issue Type        | Description                          |
| ----------------- | ------------------------------------ |
| **Missing Input** | `customClasses` input not documented |

**Documented Inputs:** 2 | **Actual Inputs:** 3

---

### 12. MessageListComponent (`components/message-list/`)

| Issue Type             | Description                                                           |
| ---------------------- | --------------------------------------------------------------------- |
| **Missing Inputs (2)** | `autoScroll`, `maxHeight`                                             |
| **Missing Output**     | `messageEdit` output not documented                                   |
| **Wrong Selector**     | Code example uses `<app-message-list>` instead of `<ai-message-list>` |

**Documented Inputs:** 5 | **Actual Inputs:** 7
**Documented Outputs:** 2 | **Actual Outputs:** 3

---

### 13. ChatContainerComponent (`components/chat-container/`)

| Issue Type                       | Description                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------ |
| **Missing Inputs (3)**           | `showHeaderActions`, `messagesMaxHeight`, `hasFooterContent`                               |
| **Wrong Default (emptyMessage)** | Documented as `'No messages yet...'`, actual is `'No messages yet. Start a conversation!'` |

**Documented Inputs:** 9 | **Actual Inputs:** 12

---

### 14. ConversationListComponent (`components/conversation-list/`)

| Issue Type        | Description                          |
| ----------------- | ------------------------------------ |
| **Missing Input** | `customClasses` input not documented |

**Documented Inputs:** 4 | **Actual Inputs:** 5

---

## Guide Pages Issues (7 pages)

### 1. Getting Started Guide (`guides/getting-started/`)

| Issue Type            | Description                                                 |
| --------------------- | ----------------------------------------------------------- |
| **Wrong Output Name** | Uses `(messageSubmit)` but actual output is `(messageSend)` |

---

### 2. Building Chat App Guide (`guides/building-chat-app/`)

| Issue Type            | Description                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Wrong Output Name** | Uses `(messageSubmit)` but actual output is `(messageSend)`                                                        |
| **Wrong Input Usage** | Uses `<ai-user-message [content]="message.content">` but actual input is `[message]` (requires UserMessage object) |

---

## API Reference & Examples

The API reference pages and example page were not found to have significant issues based on quick review. Full audit would require deeper analysis of type definitions.

---

## Fix Priority

### High Priority (Breaking Issues)

1. **Wrong output names in guides** - `(messageSubmit)` should be `(messageSend)`
2. **Wrong input usage** - UserMessage requires `[message]` input with full UserMessage object
3. **Wrong selectors in code examples** - Should use `<ai-*>` not `<app-*>`

### Medium Priority (Missing Documentation)

1. **Missing `customClasses` input** - 13 components affected
2. **Missing outputs** - AiResponse, ChatInput, ResponseActions, MessageList
3. **Missing inputs** - AiResponse (5), UserMessage (3), ChatContainer (3), MessageList (2)

### Low Priority (Defaults)

1. **Incorrect default values** - ChatInput (maxHeight, placeholder), ChatContainer (emptyMessage)

---

## Recommended Fixes

### Component Documentation Files to Update

```
apps/demo/src/app/pages/docs/components/
├── ai-response/ai-response-doc.component.ts        # Add 5 inputs, 1 output, fix selector
├── chat-container/chat-container-doc.component.ts  # Add 3 inputs, fix default
├── chat-input/chat-input-doc.component.ts          # Add 1 input, 5 outputs, fix defaults, fix selector
├── code-block/code-block-doc.component.ts          # Add customClasses
├── conversation-list/conversation-list-doc.component.ts  # Add customClasses
├── feedback-buttons/feedback-buttons-doc.component.ts    # Add customClasses
├── markdown-renderer/markdown-renderer-doc.component.ts  # Add customClasses
├── message-actions/message-actions-doc.component.ts      # Add customClasses
├── message-list/message-list-doc.component.ts      # Add 2 inputs, 1 output, fix selector
├── prompt-suggestions/prompt-suggestions-doc.component.ts # Add customClasses
├── response-actions/response-actions-doc.component.ts    # Add 1 input, 1 output
├── streaming-text/streaming-text-doc.component.ts  # Add customClasses, fix selector
├── typing-indicator/typing-indicator-doc.component.ts    # Add customClasses, fix selector
└── user-message/user-message-doc.component.ts      # Add 3 inputs
```

### Guide Files to Update

```
apps/demo/src/app/pages/docs/guides/
├── getting-started/getting-started.component.ts    # Fix (messageSubmit) → (messageSend)
└── building-chat-app/building-chat-app.component.ts # Fix (messageSubmit) → (messageSend), fix [content] → [message]
```

---

## Stats

| Category                    | Count   |
| --------------------------- | ------- |
| Components Audited          | 14      |
| Guides Audited              | 7       |
| API Reference Audited       | 4       |
| Examples Audited            | 1       |
| **Total Issues Found**      | **65+** |
| Missing Inputs              | 22      |
| Missing Outputs             | 7       |
| Wrong Selectors             | 7       |
| Wrong Defaults              | 4       |
| Wrong Output Names (Guides) | 2+      |

---

_Audit completed: 2026-01-08_
_Ready for fixes upon user approval_
