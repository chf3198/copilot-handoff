# ⚙️ GitHub Repository Settings Checklist

**Repository:** https://github.com/chf3198/copilot-handoff/settings

Follow this checklist to configure your repository to industry standards for VS Code extensions.

---

## 🌍 Step 1: Make Repository Public

### Current Status
- ❌ Repository is currently **Private**

### Action Required
1. Go to https://github.com/chf3198/copilot-handoff/settings
2. Scroll to **"Danger Zone"** at the bottom
3. Click **"Change repository visibility"**
4. Select **"Make public"**
5. Type the repository name to confirm: `copilot-handoff`
6. Click **"I understand, change repository visibility"**

**Why:** VS Code extensions must be in public repositories to publish to the Marketplace.

---

## 📝 General Settings

**URL:** https://github.com/chf3198/copilot-handoff/settings

### Repository Name
- ✅ `copilot-handoff` (good, clear, hyphenated)

### Description
Update to match package.json:
```
🤝 Track GitHub Copilot chat session duration and get timely reminders for context-preserving handoffs. Prevent context degradation!
```

### Website
Add the VS Code Marketplace URL:
```
https://marketplace.visualstudio.com/items?itemName=curtisfranks.copilot-handoff
```
(Add this after publishing to marketplace)

### Topics
Add these 14 topics:
```
vscode-extension, github-copilot, productivity, ai-assistant, context-management, 
developer-tools, typescript, session-tracking, handoff, collaboration, 
vscode, copilot, ai-chat, context-preservation
```

### Features
Enable these features:

- ✅ **Wikis** - For additional documentation
- ✅ **Issues** - Already enabled for bug tracking
- ✅ **Sponsorships** - If you want to accept donations
- ✅ **Preserve this repository** - Archive in GitHub Archive Program
- ✅ **Discussions** - For community Q&A and support
- ❌ **Projects** - Optional, enable if you want public roadmap

### Pull Requests
- ✅ **Allow merge commits** - Enabled
- ✅ **Allow squash merging** - Enabled (recommended)
- ✅ **Allow rebase merging** - Enabled
- ✅ **Always suggest updating pull request branches** - Enabled
- ✅ **Allow auto-merge** - Enabled
- ✅ **Automatically delete head branches** - Enabled (keeps repo clean)

### Archives
- ✅ **Include this repository in the GitHub Archive Program** - Enabled

---

## 🔒 Access Settings

**URL:** https://github.com/chf3198/copilot-handoff/settings/access

### Collaborators and Teams
- Current: Only you (chf3198)
- No additional collaborators needed initially

### Moderation Options
- ✅ **Interaction limits** - Set to "Limit to existing contributors" if spam becomes an issue
- ✅ **Code review limits** - Leave default

---

## 🌿 Branches Settings

**URL:** https://github.com/chf3198/copilot-handoff/settings/branches

### Default Branch
- ✅ `main` (correct)

### Branch Protection Rules

Create a rule for `main` branch:

**Pattern:** `main`

**Protect matching branches:**
- ✅ **Require a pull request before merging**
  - ❌ Require approvals: 0 (since solo project, but enable if you add collaborators)
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  - ❌ Require review from Code Owners (not needed yet)

- ✅ **Require status checks to pass before merging**
  - ✅ Require branches to be up to date before merging
  - **Status checks to require:**
    - ✅ `build-and-test` (from CI workflow)
    - ✅ `test-ubuntu-latest`
    - ✅ `test-windows-latest`
    - ✅ `test-macos-latest`

- ✅ **Require conversation resolution before merging**
- ❌ Require signed commits (optional, recommended for security)
- ❌ Require linear history (optional)
- ❌ Require deployments to succeed before merging (not applicable)

- ✅ **Do not allow bypassing the above settings**
  - ⚠️ **Important:** Uncheck "Allow force pushes" 
  - ⚠️ **Important:** Uncheck "Allow deletions"

- ✅ **Rules applied to administrators** - Enable if you want to follow same rules

**Recommendation for Solo Project:**
- Keep it simple initially
- Add protection rules when you have collaborators
- At minimum: Require status checks to pass

---

## 🏷️ Tags Settings

**URL:** https://github.com/chf3198/copilot-handoff/settings/tag_protection

### Tag Protection Rules
Create protection for version tags:

**Pattern:** `v*`

This protects all version tags (v0.1.0, v1.0.0, etc.) from deletion.

---

## ⚡ Actions Settings

**URL:** https://github.com/chf3198/copilot-handoff/settings/actions

### General Actions Permissions
- ✅ **Allow all actions and reusable workflows** - Enabled
- OR ✅ **Allow actions created by GitHub and select verified creators** - More secure

### Workflow Permissions
- ✅ **Read and write permissions** - Required for release workflow
- ✅ **Allow GitHub Actions to create and approve pull requests** - Optional

### Artifact and Log Retention
- ✅ **90 days** (default is fine)

---

## 🔐 Secrets and Variables

**URL:** https://github.com/chf3198/copilot-handoff/settings/secrets/actions

### Repository Secrets (Add when ready to publish)

You'll need to add:

1. **`VSCE_PAT`** - Personal Access Token for VS Code Marketplace
   - Create at: https://marketplace.visualstudio.com/manage
   - Permissions: Marketplace (Publish)
   - Never commit this to code!

**How to add:**
1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `VSCE_PAT`
4. Value: (your token)
5. Click "Add secret"

---

## 🛡️ Code Security and Analysis

**URL:** https://github.com/chf3198/copilot-handoff/settings/security_analysis

### Dependency Graph
- ✅ **Enabled** (automatic for public repos)

### Dependabot Alerts
- ✅ **Enabled** - Alerts for vulnerable dependencies
- ✅ **Automatically dismiss low impact alerts** - Optional

### Dependabot Security Updates
- ✅ **Enabled** - Auto-create PRs to fix vulnerabilities

### Dependabot Version Updates
Create `.github/dependabot.yml`:
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

### Code Scanning
- ✅ **CodeQL Analysis** - Enable for TypeScript scanning
  - Click "Set up" → "Default" 
  - This will create `.github/workflows/codeql.yml`

### Secret Scanning
- ✅ **Enabled** (automatic for public repos)
- ✅ **Push protection** - Prevents committing secrets

---

## 📊 Insights Settings

**URL:** https://github.com/chf3198/copilot-handoff/pulse

### Community Standards

Ensure 100% completion:
- ✅ Description
- ✅ README
- ✅ Code of conduct
- ✅ Contributing
- ✅ License
- ✅ Security policy
- ✅ Issue templates
- ✅ Pull request template

**Check at:** https://github.com/chf3198/copilot-handoff/community

---

## 💬 Discussions Settings

**URL:** https://github.com/chf3198/copilot-handoff/settings/discussions

### Enable Discussions
1. Go to Settings → General → Features
2. Check ✅ **Discussions**
3. Click "Set up discussions"

### Categories to Create
1. **📢 Announcements** - Official updates (Maintainers only)
2. **💡 Ideas** - Feature requests and suggestions
3. **🙏 Q&A** - Questions and answers (enable answered marking)
4. **🎉 Show and tell** - Share your workflows
5. **💬 General** - General discussion
6. **🐛 Bugs** - Bug reports (redirect to Issues)

---

## 📦 Packages Settings

**URL:** https://github.com/chf3198/copilot-handoff/settings/packages

Not applicable for VS Code extensions (published to VS Code Marketplace, not GitHub Packages).

---

## 📄 Pages Settings

**URL:** https://github.com/chf3198/copilot-handoff/settings/pages

### GitHub Pages (Optional)

You could create a landing page for the extension:

**Option 1: Simple approach**
- ✅ Source: Deploy from a branch
- ✅ Branch: `main`
- ✅ Folder: `/docs`

Create `/docs/index.html` with:
- Extension overview
- Installation instructions
- Screenshots
- Link to marketplace

**Option 2: Use README**
- GitHub will automatically render README.md
- URL: https://chf3198.github.io/copilot-handoff/

**Recommendation:** Not critical for extensions, marketplace is the primary landing page.

---

## 📧 Notifications Settings

**URL:** https://github.com/chf3198/copilot-handoff/settings/notifications

### Email Notifications
Configure at: https://github.com/settings/notifications

Recommended settings:
- ✅ Issues, Pull Requests, Discussions you're participating in
- ✅ Pull request reviews
- ✅ @mentions
- ❌ Watching (can be noisy)

---

## 🔗 Webhooks and Services

**URL:** https://github.com/chf3198/copilot-handoff/settings/hooks

### Webhooks (Optional)

Add webhooks for:
- Slack notifications
- Discord updates
- Twitter auto-posting
- Analytics tracking

**Not required initially.**

---

## 📱 Social Preview

**URL:** https://github.com/chf3198/copilot-handoff/settings

### Upload Social Preview Image

Create a 1280x640px image with:
- Extension icon/logo
- Title: "Copilot Handoff"
- Tagline: "Track sessions, preserve context"
- VS Code and GitHub Copilot branding
- Clean, professional design

**Tools to create:**
- Canva (easiest)
- Figma
- Photoshop
- GIMP

**Upload:**
1. Scroll to "Social preview"
2. Click "Upload an image..."
3. Select your 1280x640px PNG/JPG
4. Save

This image shows when sharing on Twitter, LinkedIn, Slack, etc.

---

## ✅ Complete Checklist

### Must Do (Critical)
- [ ] Make repository public
- [ ] Add repository description with emoji
- [ ] Add 14 topic tags
- [ ] Enable Discussions
- [ ] Verify all community standards (100%)
- [ ] Configure Dependabot
- [ ] Enable CodeQL code scanning
- [ ] Add VSCE_PAT secret (when ready to publish)

### Should Do (Recommended)
- [ ] Create branch protection rules
- [ ] Create tag protection rules
- [ ] Upload social preview image
- [ ] Set up Discussions categories
- [ ] Configure notification preferences
- [ ] Enable auto-delete head branches

### Nice to Have (Optional)
- [ ] Add website URL (after marketplace publish)
- [ ] Enable GitHub Pages
- [ ] Set up webhooks for notifications
- [ ] Add collaborators/reviewers
- [ ] Create GitHub Project board

---

## 🎯 Quick Setup Commands

After making repository public, run these:

```bash
# Verify settings
cd "/mnt/chromeos/removable/USB Drive/repos/copilot-handoff"

# Check if workflows are enabled
git ls-files .github/workflows/

# Verify package.json is ready
cat package.json | grep "description\|displayName\|repository"

# Check community files
ls -la .github/

# Verify all tests pass locally
npm test

# Ensure linting passes
npm run lint

# Build extension
npm run compile
```

---

## 📋 Settings Verification Script

Create this issue checklist after making changes:

```markdown
### Repository Settings Verified

General:
- [ ] Repository is public
- [ ] Description updated with emoji
- [ ] Topics added (14 tags)
- [ ] Website URL added (after publish)
- [ ] Discussions enabled

Security:
- [ ] Dependabot alerts enabled
- [ ] Dependabot security updates enabled
- [ ] CodeQL scanning enabled
- [ ] Secret scanning enabled
- [ ] VSCE_PAT secret added

Branches:
- [ ] Default branch is `main`
- [ ] Branch protection configured
- [ ] Status checks required

Community:
- [ ] 100% community standards
- [ ] All templates in place
- [ ] License verified
- [ ] Code of Conduct present

Actions:
- [ ] CI workflow active
- [ ] Release workflow configured
- [ ] Workflow permissions set

Quality:
- [ ] All tests passing
- [ ] Linting clean
- [ ] Build successful
- [ ] Documentation complete
```

---

## 🚀 Post-Setup Actions

After configuring settings:

1. **Test CI/CD:**
   ```bash
   git commit --allow-empty -m "test: Trigger CI/CD"
   git push
   ```
   - Check Actions tab: All workflows pass ✅

2. **Verify Community Standards:**
   - Visit: https://github.com/chf3198/copilot-handoff/community
   - Should show 100% complete ✅

3. **Test Issue Creation:**
   - Create a test issue using bug template
   - Verify labels are applied
   - Close and delete test issue

4. **Create First Discussion:**
   - Post welcome message
   - Explain purpose and roadmap
   - Invite feedback

5. **Tag First Release:**
   ```bash
   git tag -a v0.1.0 -m "Initial release"
   git push origin v0.1.0
   ```
   - Verify release workflow triggers
   - Check that release is created

---

## 📞 Support Resources

- **GitHub Docs:** https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features
- **VS Code Publishing:** https://code.visualstudio.com/api/working-with-extensions/publishing-extension
- **Dependabot:** https://docs.github.com/en/code-security/dependabot
- **CodeQL:** https://codeql.github.com/docs/

---

**Last Updated:** January 26, 2026
**Next Review:** Before v1.0.0 release
