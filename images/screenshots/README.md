# Screenshots Guide

This directory should contain screenshots and demo GIFs for the README and marketplace.

## Recommended Screenshots

1. **status-bar.png** (600x100)
   - Shows the clock icon in VS Code status bar
   - Display actual session time

2. **notification.png** (600x150)
   - Screenshot of the handoff reminder notification
   - Show the action buttons

3. **export-options.png** (600x200)
   - Screenshot of the context export quick pick menu
   - Show all three export options

4. **session-info.png** (600x200)
   - Screenshot of the session info dialog
   - Show duration and threshold information

5. **demo.gif** (800x600)
   - Animated demo of full workflow
   - Show: activation → tracking → notification → export

## How to Create Screenshots

1. Install the extension in VS Code
2. Use the extension normally
3. Take screenshots using:
   - Windows: `Win + Shift + S`
   - macOS: `Cmd + Shift + 4`
   - Linux: `gnome-screenshot -a`

4. Save screenshots to this directory
5. Update image references in README.md

## Optimization

Before committing, optimize images:
```bash
# Install ImageMagick if needed
# Resize and optimize
magick convert input.png -resize 600x -quality 85 output.png
```

## Current Status

Replace placeholder images in README.md:
- `https://via.placeholder.com/600x100/...` → `images/screenshots/status-bar.png`
- `https://via.placeholder.com/600x150/...` → `images/screenshots/notification.png`
- `https://via.placeholder.com/600x200/...` → `images/screenshots/export-options.png`
