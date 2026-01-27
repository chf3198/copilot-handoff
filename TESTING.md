# Testing Guide for Copilot Handoff Extension

## Local Testing

### Method 1: Extension Development Host (Recommended)

1. Open this project in VS Code
2. Press `F5` or go to Run > Start Debugging
3. A new VS Code window will open with the extension loaded
4. Test the features:

#### Test Session Tracking
- Look for the clock icon (⏰) in the status bar
- Click it to see session details
- Edit files and observe the session timer

#### Test Commands
Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and try:
- `Copilot Handoff: Show Session Info`
- `Copilot Handoff: Export Chat Context`
- `Copilot Handoff: Reset Session Timer`
- `Copilot Handoff: Toggle Tracking`

#### Test Notifications
1. Go to Settings and set `copilot-handoff.sessionThresholdMinutes` to 1
2. Wait 1-2 minutes
3. You should see a notification reminder
4. Test different notification frequencies:
   - `once` - Shows once per session
   - `periodic` - Shows repeatedly
   - `never` - No notifications

#### Test Context Export
1. Run `Copilot Handoff: Export Chat Context`
2. Try all three export options:
   - Copy to Clipboard
   - Save to File
   - Create Handoff Document

### Method 2: Install VSIX Locally

Once packaged (requires Node 20+):

1. Package the extension:
   ```bash
   npm run package
   ```

2. Install the .vsix file:
   - Open VS Code
   - Go to Extensions view (`Ctrl+Shift+X`)
   - Click `...` menu > Install from VSIX
   - Select `copilot-handoff-0.1.0.vsix`

## Configuration Testing

Test all configuration options in VS Code Settings:

```json
{
  "copilot-handoff.sessionThresholdMinutes": 30,
  "copilot-handoff.notificationFrequency": "periodic",
  "copilot-handoff.periodicReminderMinutes": 10,
  "copilot-handoff.autoExportContext": false,
  "copilot-handoff.showStatusBar": true,
  "copilot-handoff.trackingEnabled": true
}
```

Try changing each setting and verify the extension responds correctly.

## Manual Test Checklist

- [ ] Extension activates on VS Code startup
- [ ] Status bar item appears and shows session duration
- [ ] Status bar updates every minute
- [ ] Clicking status bar shows session info
- [ ] Session timer resets after 5 minutes of inactivity
- [ ] Session persists across VS Code restarts
- [ ] Notifications appear at threshold
- [ ] All commands work from Command Palette
- [ ] Context export creates proper markdown
- [ ] Configuration changes take effect immediately
- [ ] Extension can be enabled/disabled
- [ ] No errors in Developer Tools Console (Help > Toggle Developer Tools)

## Performance Testing

- [ ] Extension doesn't slow down VS Code startup
- [ ] No noticeable lag when editing files
- [ ] Memory usage stays reasonable (check Task Manager)
- [ ] CPU usage is minimal during idle

## Edge Cases to Test

1. **Long sessions**: Run for 2+ hours
2. **VS Code restart**: Close and reopen to verify state persistence
3. **Multiple windows**: Open multiple VS Code windows
4. **Disable/enable**: Toggle tracking on and off
5. **Threshold changes**: Change threshold while session is active
6. **Network disconnect**: Test offline (extension should work fine)

## Debugging

If something doesn't work:

1. Open Developer Tools: `Help > Toggle Developer Tools`
2. Check the Console for errors
3. Look for messages starting with "Copilot Handoff"
4. Check the Output panel > Extension Host Log

## Reporting Issues

When reporting issues during testing, include:

- VS Code version
- Extension version
- OS (Windows/Mac/Linux)
- Steps to reproduce
- Expected vs actual behavior
- Any error messages from Developer Tools
- Screenshots if applicable

## Publishing Preparation

Before publishing to marketplace, verify:

- [ ] All tests pass
- [ ] No linting errors
- [ ] README is complete and accurate
- [ ] CHANGELOG is updated
- [ ] Icon displays properly
- [ ] All commands work as documented
- [ ] Settings descriptions are clear
- [ ] No security vulnerabilities (`npm audit`)
