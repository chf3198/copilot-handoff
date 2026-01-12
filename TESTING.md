# Testing Guide for Copilot Chat Session Health Extension

## Prerequisites
- VS Code version 1.85.0 or higher
- The extension compiled successfully

## Manual Testing Steps

### 1. Test Extension Activation
1. Open VS Code
2. Press F5 or use "Run > Start Debugging" to launch Extension Development Host
3. Verify in the Debug Console that you see: "Copilot Session Health extension is now active"
4. Check the status bar (bottom right) for the chat count indicator

**Expected Result**: 
- Status bar shows: `💬 Chat: 0` (or current count if restored from previous session)

### 2. Test Message Counting
1. In the Extension Development Host, open or create a text file
2. Make substantial edits (type at least 10 characters)
3. Check the status bar

**Expected Result**:
- Message count increments with each substantial edit
- Status bar updates to show new count (e.g., `💬 Chat: 1`, `💬 Chat: 2`, etc.)

### 3. Test Threshold Warning
1. Continue making edits until you reach the threshold (default: 20)
2. Observe the status bar when count reaches 20

**Expected Result**:
- Status bar item changes to: `⚠️ Chat: 20`
- Background color changes to orange (warning)
- Warning notification appears with message: "You've sent 20 messages in this Copilot chat session..."
- Three buttons appear: "Export Summary", "Reset Count", "Dismiss"

### 4. Test Export Session Summary
1. Click the "Export Summary" button (or click the status bar item, or use Command Palette)
2. A new untitled markdown document should open

**Expected Result**:
- New markdown file opens with session summary
- Summary includes:
  - Session start time
  - Current time
  - Duration
  - Message count
  - Threshold
  - Status indicator
  - Context handoff notes
  - Recommendations

### 5. Test Reset Session Count
1. Use Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
2. Type "Copilot: Reset Session Count"
3. Execute the command

**Expected Result**:
- Status bar resets to: `💬 Chat: 0`
- Warning background color disappears
- Notification: "Chat session count reset successfully!"

### 6. Test Configuration Settings

#### Test Message Threshold Setting
1. Open Settings (File > Preferences > Settings)
2. Search for "Copilot Session Health"
3. Change "Message Threshold" to 5
4. Make edits until count reaches 5

**Expected Result**:
- Warning appears at count 5 instead of 20
- Status bar shows warning at threshold of 5

#### Test Enable/Disable Tracking
1. In Settings, uncheck "Enable Tracking"
2. Make text edits

**Expected Result**:
- Message count does not increment
- Status bar shows last count before disabling

3. Re-enable tracking
4. Make text edits

**Expected Result**:
- Message count resumes incrementing

#### Test Show/Hide Status Bar
1. In Settings, uncheck "Show Status Bar"

**Expected Result**:
- Status bar item disappears

2. Re-enable "Show Status Bar"

**Expected Result**:
- Status bar item reappears with current count

### 7. Test State Persistence
1. Make several edits to increment count (e.g., to 10)
2. Close the Extension Development Host window
3. Press F5 to relaunch

**Expected Result**:
- Status bar shows the same count as before closing (e.g., `💬 Chat: 10`)
- Count persists across sessions

### 8. Test Command Palette Commands
1. Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
2. Type "Copilot"

**Expected Result**:
- Two commands appear:
  - "Copilot: Export Session Summary"
  - "Copilot: Reset Session Count"

3. Test both commands to ensure they work as expected

## Edge Cases to Test

### Large Message Counts
1. Edit configuration to set threshold to 100
2. Manually edit many times or modify the code to increment faster
3. Verify status bar handles large numbers correctly

### Duration Display
1. Let the extension run for extended periods
2. Check that duration string formats correctly (minutes, hours)

### Multiple Workspaces
1. Open multiple workspace folders
2. Verify each workspace tracks independently

## Verification Checklist

- [ ] Extension activates without errors
- [ ] Status bar item appears with correct icon
- [ ] Message count increments with text edits
- [ ] Warning appears at configured threshold
- [ ] Warning changes status bar color to orange
- [ ] Export command creates markdown summary
- [ ] Reset command clears count and resets session
- [ ] Configuration changes apply immediately
- [ ] Status bar can be hidden/shown via settings
- [ ] Tracking can be enabled/disabled via settings
- [ ] Threshold is configurable
- [ ] State persists across VS Code sessions
- [ ] Commands appear in Command Palette
- [ ] Clicking status bar exports summary

## Known Limitations

1. **Message Counting Proxy**: Since VS Code doesn't provide direct API access to Copilot chat events, the extension uses text document changes as a proxy for chat interactions. This means:
   - Count increments with substantial code edits (>10 characters)
   - May not perfectly match actual Copilot chat exchanges
   - This is a limitation of the VS Code Extension API

2. **Extension API**: The extension is designed to work within the constraints of the VS Code Extension API and provides the best approximation of chat session health tracking available.
