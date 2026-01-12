# Quick Reference Card

## Copilot Chat Session Health Extension

### At a Glance

**Purpose**: Prevent GitHub Copilot context window exhaustion by tracking chat session health

**Status Bar Icons**:
- `💬 Chat: N` - Normal (below threshold)
- `⚠️ Chat: N` - Warning (at/above threshold, orange background)

### Quick Actions

| Action | How To |
|--------|--------|
| View current count | Look at status bar (bottom-right) |
| Export session summary | Click status bar OR Cmd/Ctrl+Shift+P → "Copilot: Export Session Summary" |
| Reset count | Cmd/Ctrl+Shift+P → "Copilot: Reset Session Count" |
| Configure threshold | Settings → Search "Copilot Session Health" |

### Default Settings

- **Threshold**: 20 messages
- **Tracking**: Enabled
- **Status Bar**: Visible

### When Warning Appears

You'll see:
1. ⚠️ icon with orange background in status bar
2. Notification with three options:
   - **Export Summary** - Get handoff document
   - **Reset Count** - Start fresh
   - **Dismiss** - Continue working

### Workflow Recommendation

1. **Work normally** - Monitor count in status bar
2. **Warning appears** - Context may be degrading
3. **Click "Export Summary"** - Get session statistics
4. **Review summary** - Note important context
5. **Start new Copilot chat** - Fresh context window
6. **Paste key context** - From exported summary
7. **Click "Reset Count"** - Begin tracking new session

### Configuration Options

Access via: Settings → Search "Copilot Session Health"

- **Message Threshold** (number, default: 20, min: 1)
  - When to warn about context degradation
  
- **Enable Tracking** (boolean, default: true)
  - Turn message counting on/off
  
- **Show Status Bar** (boolean, default: true)
  - Show/hide the status bar item

### Exported Summary Contains

- Session start time and duration
- Current message count
- Status (healthy vs warning)
- Context handoff notes
- Recommendations for new session

### Keyboard Shortcuts

No default shortcuts, but commands available in Command Palette:
- `Copilot: Export Session Summary`
- `Copilot: Reset Session Count`

You can assign custom shortcuts in Keyboard Shortcuts settings.

### Tips

✅ **Do**:
- Monitor the count regularly
- Export summary before hitting high counts
- Use summary to handoff context to fresh chat
- Adjust threshold to match your workflow

❌ **Don't**:
- Ignore warnings (context quality degrades)
- Disable tracking without good reason
- Set threshold too high (defeats purpose)

### Troubleshooting

**Status bar not showing?**
→ Check Settings → Show Status Bar is enabled

**Count not incrementing?**
→ Check Settings → Enable Tracking is enabled
→ Make substantial edits (>10 characters)

**Warning not appearing?**
→ Verify threshold setting
→ Ensure count reached threshold

### State Persistence

✅ Message count saved across VS Code sessions
✅ Session start time preserved
✅ Settings remembered per workspace

### Privacy

- No data sent to external servers
- All data stored locally in VS Code workspace
- No user tracking or analytics
- No network calls

---

**Need Help?** See full documentation:
- README.md - Complete user guide
- FEATURES.md - Feature details
- TESTING.md - Testing procedures
- VISUAL_GUIDE.md - UI documentation
