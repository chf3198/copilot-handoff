# Change Log

All notable changes to the "Copilot Handoff" extension will be documented in this file.

## [0.1.0] - 2026-01-26

### Initial Release

#### Features
- **Session Tracking**: Automatically tracks Copilot chat session duration
- **Smart Notifications**: Configurable reminders when sessions exceed recommended thresholds
- **Status Bar Integration**: Real-time display of current session duration
- **Context Export**: Multiple options for preserving session context:
  - Copy to clipboard
  - Save to markdown file
  - Create handoff template document
- **Flexible Configuration**: Customizable settings for:
  - Session threshold (5-180 minutes)
  - Notification frequency (once, periodic, never)
  - Periodic reminder intervals
  - Auto-export on handoff
  - Status bar visibility
  - Tracking enable/disable

#### Commands
- `Copilot Handoff: Show Session Info` - Display detailed session information
- `Copilot Handoff: Export Chat Context` - Export current context with multiple format options
- `Copilot Handoff: Reset Session Timer` - Manually reset the session timer
- `Copilot Handoff: Toggle Tracking` - Enable/disable session tracking

#### Technical Details
- Automatic session persistence across VS Code restarts
- 5-minute inactivity timeout for automatic session resets
- Non-intrusive notification system
- Lightweight background processing
