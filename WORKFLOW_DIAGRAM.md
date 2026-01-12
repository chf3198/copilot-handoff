# Extension Workflow Diagram

## User Journey Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     VS Code Starts                              │
│                           ↓                                      │
│              Extension Activates Automatically                  │
│                           ↓                                      │
│              Restore State from Previous Session                │
│                 (Count & Start Time)                            │
│                           ↓                                      │
│              Display Status Bar: 💬 Chat: N                     │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                   User Works in Editor                          │
│                           ↓                                      │
│              Makes Substantial Text Changes                     │
│                    (>10 characters)                             │
│                           ↓                                      │
│              Message Count Increments                           │
│                           ↓                                      │
│              Status Bar Updates: 💬 Chat: N+1                   │
│                           ↓                                      │
│              State Persisted to Workspace                       │
└─────────────────────────────────────────────────────────────────┘
                           ↓
                    ┌──────┴──────┐
                    │             │
          Count < Threshold    Count >= Threshold
                    │             │
                    ↓             ↓
        ┌────────────────┐  ┌─────────────────────────────┐
        │   Continue      │  │   WARNING STATE TRIGGERED   │
        │   Normally      │  │                             │
        │                 │  │  Status: ⚠️ Chat: 20        │
        │  💬 Chat: 15   │  │  Color: Orange Background   │
        │                 │  │                             │
        │  User keeps     │  │  Notification Appears:      │
        │  working        │  │  "Context may degrade..."   │
        └────────────────┘  │                             │
                            │  [Export] [Reset] [Dismiss] │
                            └─────────────────────────────┘
                                        ↓
                            ┌───────────┼───────────┐
                            │           │           │
                         Export      Reset      Dismiss
                            ↓           ↓           ↓
                    ┌──────────┐  ┌─────────┐  ┌────────┐
                    │ Generate │  │  Reset  │  │ Close  │
                    │ Markdown │  │  Count  │  │  Noti- │
                    │ Summary  │  │  to 0   │  │ fication│
                    │          │  │         │  │        │
                    │ Shows:   │  │ Status: │  │ Warning│
                    │ - Stats  │  │💬 0     │  │ stays  │
                    │ - Time   │  │         │  │ in bar │
                    │ - Recs   │  │ Fresh   │  └────────┘
                    │          │  │ Start   │
                    │ Opens in │  └─────────┘
                    │ new doc  │
                    └──────────┘
```

## State Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Extension States                         │
└─────────────────────────────────────────────────────────────────┘

    INACTIVE                 TRACKING              WARNING
       │                        │                     │
       │ Activation             │ Count >= Threshold  │
       ├──────────────────────→ │ ──────────────────→ │
       │                        │                     │
       │                        │ ← ← ← ← ← ← ← ← ← ← │
       │                        │     Reset Count     │
       │                        │                     │
       │ Deactivation           │                     │
       ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ←│
       │                        │                     │
       │                        │                     │
    Properties:             Properties:          Properties:
    - No tracking          - Count: 0-19         - Count: 20+
    - No status bar        - Icon: 💬           - Icon: ⚠️
                           - Normal color        - Orange background
                           - Tracking active     - Warning notification
```

## Configuration Impact Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Configuration Changes                        │
└─────────────────────────────────────────────────────────────────┘

SETTING: Message Threshold
   Change: 20 → 5
      ↓
   If current count >= 5
      ↓
   Trigger warning state immediately
      ↓
   Status bar: ⚠️ Chat: 15 (orange)

─────────────────────────────────────────────────────────────────

SETTING: Enable Tracking
   Change: ON → OFF
      ↓
   Stop incrementing count
      ↓
   Status bar shows last count
      ↓
   No new warnings triggered

─────────────────────────────────────────────────────────────────

SETTING: Show Status Bar
   Change: ON → OFF
      ↓
   Hide status bar item
      ↓
   Tracking continues in background
      ↓
   Can still use Command Palette commands
```

## Command Execution Flow

```
┌─────────────────────────────────────────────────────────────────┐
│              Command Palette or Click Action                    │
└─────────────────────────────────────────────────────────────────┘

EXPORT SESSION SUMMARY
   User triggers command
      ↓
   Get current state:
   - Session start time
   - Current time
   - Message count
   - Threshold setting
      ↓
   Calculate duration
      ↓
   Generate markdown content:
   - Header with stats
   - Context handoff notes
   - Recommendations
      ↓
   Create new untitled document
      ↓
   Populate with markdown
      ↓
   Show document in editor
      ↓
   Display success message

─────────────────────────────────────────────────────────────────

RESET SESSION COUNT
   User triggers command
      ↓
   Set count = 0
      ↓
   Set session start = now
      ↓
   Clear last warning count
      ↓
   Persist to workspace state:
   - count
   - start time
      ↓
   Update status bar:
   - Icon: 💬
   - Color: Normal
   - Text: "Chat: 0"
      ↓
   Display success message
```

## Data Persistence Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     State Persistence                           │
└─────────────────────────────────────────────────────────────────┘

TEXT CHANGE EVENT
      ↓
   Increment count
      ↓
   workspaceState.update('copilot.messageCount', count)
      ↓
   Saved to disk by VS Code

─────────────────────────────────────────────────────────────────

RESET COMMAND
      ↓
   Set count = 0
   Set start time = now
      ↓
   workspaceState.update('copilot.messageCount', 0)
   workspaceState.update('copilot.sessionStartTime', ISO string)
      ↓
   Saved to disk by VS Code

─────────────────────────────────────────────────────────────────

VS CODE RESTART
      ↓
   Extension reactivates
      ↓
   count = workspaceState.get('copilot.messageCount', 0)
   startTime = workspaceState.get('copilot.sessionStartTime')
      ↓
   Restore previous state
      ↓
   Display in status bar
```

## User Interaction Points

```
┌─────────────────────────────────────────────────────────────────┐
│                  Where Users Interact                           │
└─────────────────────────────────────────────────────────────────┘

1. STATUS BAR (Bottom Right)
   - Click to export summary
   - Visual indicator of count
   - Tooltip on hover

2. COMMAND PALETTE (Ctrl/Cmd+Shift+P)
   - "Copilot: Export Session Summary"
   - "Copilot: Reset Session Count"

3. NOTIFICATION (Top Right)
   - Appears at threshold
   - Three action buttons
   - Dismissible

4. SETTINGS (File > Preferences > Settings)
   - Search "Copilot Session Health"
   - Adjust threshold
   - Toggle tracking
   - Toggle status bar

5. EXPORTED DOCUMENT (Editor Pane)
   - Markdown summary
   - Can save or copy
   - Read-only suggestions
```
