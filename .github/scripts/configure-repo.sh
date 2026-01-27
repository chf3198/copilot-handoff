#!/bin/bash

# 🚀 Automated Repository Configuration Script
# This script uses GitHub CLI (gh) to configure repository settings
#
# Prerequisites:
# 1. Install GitHub CLI: https://cli.github.com/
# 2. Authenticate: gh auth login
# 3. Run this script: bash .github/scripts/configure-repo.sh

set -e  # Exit on error

REPO="chf3198/copilot-handoff"

echo "🔧 Configuring GitHub Repository: $REPO"
echo "================================================"

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed"
    echo "📥 Install from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI"
    echo "🔐 Run: gh auth login"
    exit 1
fi

echo ""
echo "📝 Step 1: Make Repository Public"
echo "------------------------------------------------"
read -p "Make repository public? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    gh repo edit "$REPO" --visibility public
    echo "✅ Repository is now public"
else
    echo "⏭️  Skipped making repository public"
fi

echo ""
echo "🏷️  Step 2: Add Topics"
echo "------------------------------------------------"
TOPICS=(
    "vscode-extension"
    "github-copilot"
    "productivity"
    "ai-assistant"
    "context-management"
    "developer-tools"
    "typescript"
    "session-tracking"
    "handoff"
    "collaboration"
    "vscode"
    "copilot"
    "ai-chat"
    "context-preservation"
)

read -p "Add repository topics? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    for topic in "${TOPICS[@]}"; do
        gh repo edit "$REPO" --add-topic "$topic"
        echo "  ✅ Added topic: $topic"
    done
    echo "✅ All topics added"
else
    echo "⏭️  Skipped adding topics"
fi

echo ""
echo "📝 Step 3: Update Description"
echo "------------------------------------------------"
DESCRIPTION="🤝 Track GitHub Copilot chat session duration and get timely reminders for context-preserving handoffs. Prevent context degradation!"

read -p "Update repository description? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    gh repo edit "$REPO" --description "$DESCRIPTION"
    echo "✅ Description updated"
else
    echo "⏭️  Skipped updating description"
fi

echo ""
echo "⚙️  Step 4: Enable Features"
echo "------------------------------------------------"

read -p "Enable Discussions? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    gh repo edit "$REPO" --enable-discussions
    echo "✅ Discussions enabled"
else
    echo "⏭️  Skipped enabling discussions"
fi

read -p "Enable Issues? (should already be enabled) (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    gh repo edit "$REPO" --enable-issues
    echo "✅ Issues enabled"
fi

read -p "Enable Wiki? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    gh repo edit "$REPO" --enable-wiki
    echo "✅ Wiki enabled"
else
    echo "⏭️  Skipped enabling wiki"
fi

read -p "Enable Projects? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    gh repo edit "$REPO" --enable-projects
    echo "✅ Projects enabled"
else
    echo "⏭️  Skipped enabling projects"
fi

echo ""
echo "🔒 Step 5: Security Settings"
echo "------------------------------------------------"
echo "⚠️  Note: Security features (Dependabot, CodeQL) must be enabled via web interface"
echo "    Go to: https://github.com/$REPO/settings/security_analysis"

echo ""
echo "🌿 Step 6: Branch Protection (Advanced)"
echo "------------------------------------------------"
echo "⚠️  Note: Branch protection requires GitHub API (not available in gh CLI)"
echo "    Manual setup required at: https://github.com/$REPO/settings/branches"

echo ""
echo "✅ Configuration Complete!"
echo "================================================"
echo ""
echo "📋 Next Steps:"
echo "  1. Verify at: https://github.com/$REPO"
echo "  2. Enable security features: https://github.com/$REPO/settings/security_analysis"
echo "  3. Configure branch protection: https://github.com/$REPO/settings/branches"
echo "  4. Add repository image (social preview)"
echo ""
echo "🚀 Ready to publish to VS Code Marketplace!"
