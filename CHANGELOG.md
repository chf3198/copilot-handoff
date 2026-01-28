# Change Log

All notable changes to the "Copilot Handoff" extension will be documented in this file.

## [0.2.0] - 2026-01-27

### Added
- **@handoff Chat Participant**: New chat participant for analyzing chat health directly in Copilot Chat
  - `@handoff analyze` - Analyzes current chat context quality with health scoring
  - `@handoff export` - Triggers context export workflow
- **Health Scoring Algorithm**: Intelligent analysis of chat quality based on:
  - Message count (optimal: <20 messages)
  - Token usage estimation (if model supports `countTokens()`)
  - Context degradation detection
- **Persistent Status Bar Reminder**: Status bar now shows "Check Chat Health" button instead of timer
  - Click to open chat with `@handoff analyze` pre-filled
  - Always visible reminder to check chat quality
- **New Command**: `Copilot Handoff: Check Chat Health` for quick access

### Changed
- **Status Bar Behavior**: Changed from displaying session duration to showing persistent "Check Chat Health" reminder
- **Architecture**: Redesigned from time-based tracking to chat health analysis
- **User Experience**: Shifted from passive timer to active health monitoring when @handoff is invoked

### Technical
- Added chat participant registration in extension.ts
- Implemented `analyzeChatHealth()` function with scoring algorithm
- Added `handleChatRequest()` to process @handoff commands
- Modified status bar to show static reminder instead of dynamic timer
- Updated package.json with chatParticipants contribution

### Rationale
Time-based tracking proved ineffective for detecting actual chat degradation. The new approach:
- Uses evidence-based metrics (message count, token usage) backed by research on "Lost in the Middle" phenomenon
- Provides on-demand analysis rather than arbitrary time thresholds
- Gives users actionable health scores and recommendations
- Only monitors chats where @handoff is explicitly invoked (respects user privacy)

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

