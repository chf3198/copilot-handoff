# Copilot Instructions for copilot-handoff

## Project Overview
This is a VS Code extension that tracks GitHub Copilot chat session duration and reminds developers to perform context-preserving handoffs when switching between Copilot agents or sessions.

## Architecture (To Be Implemented)

### Core Components
- **Session Tracker**: Monitors active Copilot chat sessions and tracks duration
- **Notification System**: Alerts users when session approaches recommended handoff thresholds
- **Context Preservation**: Helps users export/save conversation context before switching agents
- **Settings Manager**: User-configurable thresholds and notification preferences

### VS Code Extension Structure
Follow standard VS Code extension patterns:
- `package.json`: Extension manifest with contribution points (commands, settings, activation events)
- `src/extension.ts`: Entry point with `activate()` and `deactivate()` functions
- Use VS Code Extension API for Copilot integration and UI notifications

## Development Setup

### Prerequisites
- Node.js (LTS version recommended)
- VS Code with Extension Development Host capabilities
- TypeScript for type safety

### Key Commands (To Be Defined)
- `npm install`: Install dependencies
- `npm run compile`: Build TypeScript
- `npm run watch`: Rebuild on changes
- `F5` in VS Code: Launch Extension Development Host for testing

## VS Code Extension Best Practices

### Activation Events
- Use `onStartupFinished` or Copilot-specific activation events to minimize startup impact
- Consider `onLanguage`, `onCommand`, or custom activation events based on when tracking should begin

### Copilot Integration
- Monitor VS Code's Chat API for active sessions
- Use `vscode.chat` namespace APIs when available
- Track chat panel focus/blur events to determine active session duration

### User Experience
- Show status bar item with session duration
- Use non-intrusive notifications (information messages, not warnings)
- Allow users to dismiss or snooze handoff reminders
- Persist session state across VS Code window reloads

## Configuration

### Expected Settings (in `package.json` contributions)
```typescript
"copilot-handoff.sessionThresholdMinutes": number    // When to remind (default: 30)
"copilot-handoff.notificationFrequency": string      // "once" | "periodic" | "never"
"copilot-handoff.autoExportContext": boolean         // Auto-save context on handoff
```

## Testing Strategy
- Unit tests for session tracking logic
- Integration tests using VS Code Extension Test Runner
- Manual testing in Extension Development Host
- Test with real Copilot chat sessions for accurate duration tracking

## Project Conventions
- Use TypeScript strict mode for type safety
- Follow VS Code extension naming conventions for commands (`copilot-handoff.commandName`)
- Store minimal state; prefer VS Code's built-in storage APIs (globalState/workspaceState)
- MIT License - keep copyright notice in new files

## Known Constraints
- Extension depends on GitHub Copilot being installed and active
- Chat API availability may vary by VS Code version
- Session tracking should not impact performance or interrupt workflows
