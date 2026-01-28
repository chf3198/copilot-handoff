# Copilot Instructions for copilot-handoff

## Project Overview
VS Code extension that tracks editor session duration and reminds developers to perform context-preserving handoffs. Helps prevent context degradation in long coding sessions by monitoring activity and providing structured context export.

**Core Purpose**: Proxy-track general editor activity as a signal for Copilot usage, then notify users when session duration exceeds thresholds to encourage fresh context starts.

## Architecture

### Component Structure (4 main files in src/)
- **extension.ts**: Coordinator - registers 4 commands, creates status bar, starts tracking/monitoring, handles 1-minute UI refresh
- **sessionTracker.ts**: Activity monitor - listens to editor events (`onDidChangeTextDocument`, `onDidChangeActiveTextEditor`, `onDidChangeWindowState`), auto-resets after 5-min inactivity
- **notificationManager.ts**: Notification scheduler - polls every 60 seconds, implements "once" vs "periodic" logic, persists notification state
- **contextExporter.ts**: Markdown generator - builds structured handoff documents with workspace metadata, offers 3 export modes (clipboard/file/new doc)

### Data Flow
```
Editor Event → SessionTracker.recordActivity() → updates lastActivityTime
                                                ↓
                                           globalState.set()
                                                
NotificationManager (60s poll) → reads duration → checks threshold → shows notification
                                                                            ↓
User clicks "Export Context" → ContextExporter.exportContext() → QuickPick → generates markdown
```

### State Persistence (globalState keys)
All state lives in `ExtensionContext.globalState` (survives restarts, global across workspaces):
- `sessionStartTime` - Session start timestamp
- `lastActivityTime` - Last recorded activity (used for 5-min auto-reset)
- `lastNotificationTime` - Last notification timestamp (for periodic intervals)
- `hasShownInitialNotification` - Boolean flag for "once" mode

**Critical Pattern**: Each component reads state in constructor, writes via private `saveState()` methods. No in-memory-only state.

### Key Design Decisions
- **Activity proxy tracking**: No direct Copilot Chat API exists, so tracks ANY editor activity (text changes, window focus, editor switches) as proxy for Copilot usage
- **Polling architecture**: Uses `setInterval()` for status bar (60s) and notifications (60s) instead of reactive events - simpler but 1-minute granularity
- **5-minute inactivity timeout**: If `Date.now() - lastActivityTime > 5min`, auto-resets session to prevent stale tracking after breaks
- **Global state scope**: Extension state is per VS Code instance, NOT per workspace (sessionStartTime shared across all folders)

## Development Workflow

### Build & Debug
```bash
npm install              # Install deps (requires Node 20+)
npm run compile         # TypeScript → out/ (one-time build)
npm run watch           # Watch mode (rebuilds on save)
F5                      # Launch Extension Development Host in new VS Code window
```

**F5 Debugging Setup**: VS Code auto-creates `Extension Host` debug config. Set breakpoints in TypeScript source (sourcemaps enabled). Check Debug Console for `console.log()` output from extension.

### Testing
```bash
npm test                # Runs: compile + lint + launches test instance
```

**Test Structure**: Integration tests in `src/test/suite/extension.test.ts` using Mocha + `@vscode/test-electron`. Tests verify:
- Extension activation (`vscode.extensions.getExtension()`)
- Command registration (`vscode.commands.getCommands()`)
- Config defaults (`vscode.workspace.getConfiguration()`)

**Manual Testing Required**: Chat participant features (@handoff) need manual verification. See [TESTING.md](../TESTING.md) for checklist.

### Linting & Packaging
```bash
npm run lint            # ESLint with TypeScript parser (@typescript-eslint)
npm run package         # Creates .vsix (requires Node 20+)
```

**Note**: `package` and `publish` scripts require Node 20+ and use `node node_modules/@vscode/vsce/vsce` to avoid global install.

## Configuration (package.json contributes.configuration)

All settings under `copilot-handoff.*` namespace with validation:
- `sessionThresholdMinutes` (5-180, default 30) - When to show first reminder
- `notificationFrequency` ("once" | "periodic" | "never", default "periodic") - Reminder behavior
- `periodicReminderMinutes` (1-60, default 10) - Interval for periodic mode
- `autoExportContext` (boolean, default false) - **Not implemented** - reserved for future auto-export
- `showStatusBar` (boolean, default true) - Show/hide clock icon in status bar
- `trackingEnabled` (boolean, default true) - Master toggle for all tracking

**Reading Config**: Always use `vscode.workspace.getConfiguration('copilot-handoff').get<Type>('key', defaultValue)` with explicit defaults for type safety.

## Project-Specific Patterns

### Command Registration (4 commands)
All follow `copilot-handoff.<action>` naming in `extension.ts activate()`:
```typescript
vscode.commands.registerCommand('copilot-handoff.showSessionInfo', () => {...})
```
Always push to `context.subscriptions` for cleanup. Commands:
- `showSessionInfo` - Modal with duration, threshold, action buttons
- `exportContext` - Async QuickPick → 3 export options
- `resetSession` - Calls `sessionTracker.resetSession()`, shows info message
- `toggleTracking` - Flips `trackingEnabled` config value

### Event Listeners (sessionTracker.ts)
Activity tracking via 4 event types in `startTracking()`:
```typescript
vscode.workspace.onDidChangeTextDocument(() => this.recordActivity())
vscode.window.onDidChangeActiveTextEditor(() => this.recordActivity())
vscode.window.onDidChangeWindowState(state => {...})
vscode.commands.registerCommand('workbench.panel.chat.view.copilot.focus', ...)
```
All listeners pushed to `this.listeners[]` array, disposed in `dispose()`.

### Status Bar Pattern
**Non-reactive updates**: Uses `setInterval()` instead of listening to state changes:
```typescript
setInterval(() => updateStatusBar(), 60000)  // Every minute
```
Format: `$(clock) Xh Ym` or `$(clock) Ym`, tooltip shows "Click for details". Hide if `trackingEnabled=false` or `showStatusBar=false`.

### Context Export Template Structure
`ContextExporter.generateContextSummary()` builds markdown with:
1. Metadata block: timestamp, workspace name, current file
2. Auto-detected context: active selection, language, open editors
3. Manual fill-in sections: "What I Was Working On", "Key Decisions Made", "Next Steps"

**Export modes**:
- Clipboard: Direct `vscode.env.clipboard.writeText()`
- Save to File: `vscode.window.showSaveDialog()` → `fs.writeFileSync()`
- New Document: `vscode.workspace.openTextDocument({ content, language: 'markdown' })`

## TypeScript Configuration (tsconfig.json)

- **Target**: ES2020 (supports Node.js 20+ features like optional chaining)
- **Module**: CommonJS (VS Code extension requirement)
- **Strict mode**: Enabled (null checks, strict function types, no implicit any)
- **Output**: `out/` directory (gitignored, created on compile)
- **Exclude**: `node_modules`, `.vscode-test`, `src/test` (tests run via separate test runner)

**Source maps enabled**: Set breakpoints in `.ts` files, not compiled `.js`.

## Known Limitations & Future Work

- **No direct Copilot Chat API**: Tracks general editor activity as proxy (may trigger when not using Copilot)
- **Global state scope**: Session state shared across all workspace folders (not workspace-specific)
- **Notification granularity**: 1-minute polling intervals (not real-time)
- **Auto-export placeholder**: `autoExportContext` setting exists but feature not implemented
- **Manual handoff required**: No automated context export or Copilot Chat integration

## Extending the Extension

### Adding a New Command
1. Add to `package.json` → `contributes.commands` with `command` and `title`
2. Register in `extension.ts` `activate()`:
   ```typescript
   context.subscriptions.push(
       vscode.commands.registerCommand('copilot-handoff.myCommand', async () => {...})
   )
   ```
3. Update README.md command list and quickstart guide

### Adding a New Configuration
1. Add to `package.json` → `contributes.configuration.properties` with `type`, `default`, `description`, optional `enum`/`minimum`/`maximum`
2. Read in code:
   ```typescript
   const config = vscode.workspace.getConfiguration('copilot-handoff');
   const value = config.get<Type>('myKey', defaultValue);
   ```
3. For reactive behavior: Listen to `vscode.workspace.onDidChangeConfiguration(e => { if (e.affectsConfiguration('copilot-handoff.myKey')) {...} })`

### Modifying Session Tracking Logic
Edit `SessionTracker.startTracking()` to add/remove event listeners. Common patterns:
- Add listener: `this.listeners.push(vscode.workspace.onXxx(() => this.recordActivity()))`
- Change inactivity timeout: Modify `ACTIVITY_TIMEOUT` constant (currently 5 * 60 * 1000 ms)
- Custom activity logic: Override `recordActivity()` with conditional checks before `this.lastActivityTime = Date.now()`

### Testing Notification Timing
For manual testing, temporarily reduce thresholds:
```json
{
  "copilot-handoff.sessionThresholdMinutes": 1,
  "copilot-handoff.periodicReminderMinutes": 1
}
```
Wait 1-2 minutes to trigger notifications. See [TESTING.md](../TESTING.md) for full checklist.
