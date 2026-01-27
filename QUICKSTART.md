# Quick Start Guide

Welcome to **Copilot Handoff**! This guide will get you up and running in 2 minutes.

## What is Copilot Handoff?

Copilot Handoff tracks how long you've been in a GitHub Copilot chat session and reminds you when it's time to perform a "context handoff" - preserving your current work context before starting fresh. This helps maintain optimal AI response quality.

## Installation

### From VS Code Marketplace (Once Published)

1. Open VS Code
2. Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
3. Search for "Copilot Handoff"
4. Click "Install"

### From VSIX File (For Testing)

1. Download the `.vsix` file
2. Open VS Code
3. Press `Ctrl+Shift+P` / `Cmd+Shift+P`
4. Type "Install from VSIX"
5. Select the downloaded file

## First Use

After installation:

1. **Look for the clock icon** ⏰ in the status bar (bottom-right corner)
   - Shows current session duration
   - Click it for detailed info

2. **Watch for notifications** when your session gets long
   - Default threshold: 30 minutes
   - You'll see a friendly reminder to consider a handoff

3. **Try exporting context** when notified:
   - Click "Export Context" in the notification
   - Or use Command Palette: `Copilot Handoff: Export Chat Context`
   - Choose your preferred export method

## Basic Usage

### Viewing Session Info

Click the clock icon in the status bar or run:
```
Copilot Handoff: Show Session Info
```

### Exporting Context

When it's time for a handoff:

1. Run `Copilot Handoff: Export Chat Context`
2. Choose an option:
   - **Copy to Clipboard**: Quick context summary
   - **Save to File**: Markdown file with full details
   - **Create Handoff Document**: Template with structured sections

3. Fill in the template sections:
   - What you were working on
   - Key decisions made
   - Next steps
   - Important context

### Resetting the Timer

After a handoff or break:
```
Copilot Handoff: Reset Session Timer
```

## Customization

### Adjust the Threshold

Go to Settings (`Ctrl+,` / `Cmd+,`) and search for "copilot handoff":

- **Session Threshold**: Default 30 minutes (range: 5-180)
- **Notification Frequency**: 
  - `periodic`: Regular reminders (default)
  - `once`: Single reminder per session
  - `never`: Silent tracking only

### Hide Status Bar

Don't want to see the clock?
```json
"copilot-handoff.showStatusBar": false
```

### Disable Tracking

To pause tracking temporarily:
```
Copilot Handoff: Toggle Tracking
```

## Tips for Best Results

1. **Don't ignore the reminders** - They're there to help maintain AI quality
2. **Document your decisions** - Use the handoff template to capture important choices
3. **Reset after breaks** - Coming back from lunch? Reset the timer
4. **Adjust thresholds to your workflow** - Find what works for you
5. **Export before major context switches** - Changing projects? Export first

## Common Questions

**Q: Will this interrupt my work?**  
A: No! Notifications are non-intrusive and can be dismissed or snoozed.

**Q: Do I need GitHub Copilot installed?**  
A: Not required, but the extension is designed to complement Copilot workflows.

**Q: What if I forget to export context?**  
A: No problem! The extension tracks your session and will remind you next time.

**Q: Can I customize the handoff template?**  
A: Currently the template is standard, but you can edit exported files however you like.

**Q: Does this track my code or conversations?**  
A: No! It only tracks session duration, not content.

## Keyboard-Free Usage

All features work via:
- Status bar clicks
- Notification buttons
- Command Palette

No keyboard shortcuts to remember!

## What's Next?

- Explore the full settings in VS Code preferences
- Read the full [README](README.md) for detailed features
- Check out the [CONTRIBUTING](CONTRIBUTING.md) guide to help improve the extension

## Need Help?

- [Report an issue](https://github.com/curtisfranks/copilot-handoff/issues)
- [View documentation](https://github.com/curtisfranks/copilot-handoff)
- Check the VS Code Extension logs (Help > Toggle Developer Tools > Console)

---

**Happy coding with better context management!** 🚀
