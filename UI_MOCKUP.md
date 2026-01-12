# UI Mockup - Visual Examples

## What Users Will See

### 1. Status Bar - Normal State (Count < Threshold)

```
┌───────────────────────────────────────────────────────────────────────┐
│ VS Code Window                                                        │
│                                                                       │
│  [File] [Edit] [View] ...                                           │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │ // Your code here                                               ││
│  │ function example() {                                             ││
│  │   console.log("Working normally...");                           ││
│  │ }                                                                 ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
  Ln 1, Col 1   UTF-8   JavaScript   ...   �� Chat: 5   [Other Items]
                                            └──────────┘
                                          Status bar shows
                                          count in normal
                                          state
```

**Tooltip when hovering:**
```
┌─────────────────────────────┐
│ Copilot chat exchanges: 5   │
│ Threshold: 20               │
│ Click to export session     │
│ summary                     │
└─────────────────────────────┘
```

---

### 2. Status Bar - Warning State (Count ≥ Threshold)

```
┌───────────────────────────────────────────────────────────────────────┐
│ VS Code Window                                                        │
│                                                                       │
│  [File] [Edit] [View] ...                                           │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │ // Your code here                                               ││
│  │ // Context may be degrading...                                  ││
│  │                                                                   ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
  Ln 1, Col 1   UTF-8   JavaScript   ...   ⚠️ Chat: 20  [Other Items]
                                            └──────────┘
                                          ORANGE BACKGROUND
                                          Warning indicator!
```

---

### 3. Warning Notification

**Appears automatically when threshold is reached:**

```
┌───────────────────────────────────────────────────────────────────────┐
│ VS Code Window                                       ┌───────────────┤
│                                                      │ ⚠️ You've sent │
│  [File] [Edit] [View] ...                          │ 20 messages in │
│                                                      │ this Copilot   │
│  ┌─────────────────────────────────────────┐        │ chat session.  │
│  │ // Your code                             │        │ Context may    │
│  │                                           │        │ degrade.       │
│  │                                           │        │ Consider       │
│  └─────────────────────────────────────────┘        │ starting a     │
│                                                      │ fresh chat     │
│                                                      │ session.       │
│                                                      │                │
│                                                      │ [Export Summary]│
│                                                      │ [Reset Count]  │
│                                                      │ [Dismiss]      │
│                                                      └────────────────┤
└───────────────────────────────────────────────────────────────────────┘
```

---

### 4. Command Palette

**Press Ctrl+Shift+P (Windows/Linux) or Cmd+Shift+P (Mac):**

```
┌───────────────────────────────────────────────────────────────────────┐
│ > copilot                                                     [Type]  │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│ > Copilot: Export Session Summary                                    │
│   Export current session statistics and recommendations              │
│                                                                       │
│ > Copilot: Reset Session Count                                       │
│   Reset the message counter and start a fresh session                │
│                                                                       │
│   [Other Copilot commands...]                                        │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

---

### 5. Settings Page

**File > Preferences > Settings, search "Copilot Session Health":**

```
┌───────────────────────────────────────────────────────────────────────┐
│ Settings                                                    [Search]  │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│ Copilot Session Health                                               │
│                                                                       │
│ ┌─────────────────────────────────────────────────────────────────┐  │
│ │                                                                 │  │
│ │ ☑ Copilot-handoff: Enable Tracking                            │  │
│ │   Enable or disable chat session message tracking             │  │
│ │                                                                 │  │
│ │ Copilot-handoff: Message Threshold                            │  │
│ │   Number of messages before warning about context degradation │  │
│ │   [  20  ] ← Configurable                                     │  │
│ │                                                                 │  │
│ │ ☑ Copilot-handoff: Show Status Bar                            │  │
│ │   Show or hide the message count in the status bar            │  │
│ │                                                                 │  │
│ └─────────────────────────────────────────────────────────────────┘  │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

---

### 6. Exported Session Summary

**Opens as new untitled document when you export:**

```
┌───────────────────────────────────────────────────────────────────────┐
│ Untitled-1                                            [Save] [Close]  │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│ # Copilot Chat Session Summary                                       │
│                                                                       │
│ **Session Start**: 1/12/2026, 8:00:00 AM                            │
│ **Current Time**: 1/12/2026, 8:45:00 AM                             │
│ **Duration**: 45m                                                     │
│ **Message Count**: 20                                                 │
│ **Threshold**: 20                                                     │
│ **Status**: ⚠️ Warning - Consider fresh session                      │
│                                                                       │
│ ## Context Handoff Notes                                             │
│                                                                       │
│ Use this information when starting a new Copilot chat session:       │
│                                                                       │
│ - Total exchanges in this session: 20                                │
│ - Session has been active for: 45m                                   │
│ - ⚠️ Context window may be degraded                                  │
│                                                                       │
│ ## Recommendations                                                    │
│                                                                       │
│ - Start a new chat session to maintain context quality               │
│ - Summarize key decisions and current state in the new session       │
│ - Reference important code snippets from this session                │
│                                                                       │
│ ---                                                                   │
│ *Generated by Copilot Session Health extension*                      │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

---

## Color Scheme

### Light Theme
- **Normal Status Bar**: Dark text on light gray background
- **Warning Status Bar**: Dark text on orange/yellow background
- **Warning Icon**: Orange ⚠️

### Dark Theme
- **Normal Status Bar**: Light text on dark gray background
- **Warning Status Bar**: Light text on orange/yellow background
- **Warning Icon**: Orange ⚠️

---

## Icon Reference

| State | Icon | Unicode | Meaning |
|-------|------|---------|---------|
| Normal | 💬 | U+1F4AC | Comment/Discussion - Chat is healthy |
| Warning | ⚠️ | U+26A0 | Warning - Context may degrade |
| Success | ✅ | U+2705 | Used in summary for healthy status |

---

## Interaction Examples

### Scenario 1: First Time User
```
1. Install extension
2. VS Code restarts
3. See status bar: 💬 Chat: 0
4. Hover to see tooltip
5. Continue working
```

### Scenario 2: Approaching Threshold
```
1. Working for a while
2. Status bar shows: 💬 Chat: 18
3. Keep editing
4. Count reaches 20
5. Status changes: ⚠️ Chat: 20 (orange)
6. Notification appears
7. User clicks "Export Summary"
8. Markdown document opens
9. User reviews recommendations
```

### Scenario 3: Starting Fresh
```
1. After exporting summary
2. User opens Command Palette
3. Selects "Copilot: Reset Session Count"
4. Status bar resets: 💬 Chat: 0
5. Continue with fresh session
```

---

## Accessibility Features

- **Keyboard Navigation**: All commands accessible via Command Palette
- **Screen Reader Support**: Status bar text is readable by screen readers
- **High Contrast**: Icons work in high contrast themes
- **Tooltips**: Descriptive tooltips on hover
- **Notifications**: Dismissible with keyboard (Escape)

