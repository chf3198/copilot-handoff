# Copilot Chat Session Health

VS Code extension that helps developers manage GitHub Copilot chat session health by tracking message count, warning about context degradation, and enabling session handoff.

## Features

- **Message Count Tracking**: Automatically tracks the number of user interactions in your active Copilot chat session
- **Status Bar Display**: Shows current message count in the VS Code status bar
- **Threshold Warnings**: Alerts you when approaching context window limits (default: 20 messages)
- **Session Summary Export**: Generate a markdown summary of your session for handoff to a new chat
- **Configurable Settings**: Customize threshold, enable/disable tracking, and status bar visibility

## Usage

### Status Bar

The extension displays a status bar item showing your current chat message count:
- `💬 Chat: 5` - Normal status (below threshold)
- `⚠️ Chat: 20` - Warning status (at or above threshold, with orange background)

Click the status bar item to export a session summary.

### Commands

Access these commands via the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`):

- **Copilot: Export Session Summary** - Generates a markdown document with session statistics and handoff recommendations
- **Copilot: Reset Session Count** - Resets the message counter and starts a fresh session

### Warnings

When you reach the configured threshold (default: 20 messages), the extension will:
1. Change the status bar item to warning color (orange background)
2. Show a warning notification with options to:
   - Export session summary for handoff
   - Reset the count for a fresh session
   - Dismiss the warning

## Configuration

Access settings via `File > Preferences > Settings` and search for "Copilot Session Health":

- **Message Threshold** (`copilot-handoff.messageThreshold`)
  - Default: `20`
  - Minimum: `1`
  - Description: Number of messages before warning about context degradation

- **Enable Tracking** (`copilot-handoff.enableTracking`)
  - Default: `true`
  - Description: Enable or disable chat session message tracking

- **Show Status Bar** (`copilot-handoff.showStatusBar`)
  - Default: `true`
  - Description: Show or hide the message count in the status bar

## How It Works

The extension monitors your workspace activity and increments the message counter based on substantial text document changes (as a proxy for chat interactions). When the count reaches your configured threshold, it warns you that the context window may be degrading and suggests starting a new chat session.

## Session Handoff Workflow

1. Work with Copilot until you receive a warning (or notice degraded responses)
2. Click "Export Summary" in the warning dialog or status bar
3. Review the generated markdown summary with session statistics
4. Start a new Copilot chat session
5. Paste relevant context from the summary into the new session
6. Click "Reset Session Count" or use the command palette to reset the counter

## Why This Matters

GitHub Copilot's chat sessions have a context window that can become degraded after many exchanges. This extension helps you:
- **Prevent lost work** by reminding you to save important context before it's forgotten
- **Maintain chat quality** by prompting timely session refreshes
- **Track session health** with visual indicators in the status bar
- **Smooth handoffs** with exportable session summaries

## Development

### Building from Source

```bash
npm install
npm run compile
```

### Running in Development

1. Open this folder in VS Code
2. Press `F5` to open a new Extension Development Host window
3. Test the extension features

## License

ISC

