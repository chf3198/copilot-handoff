# GitHub Repository Professional Setup - AI Agent Prompt

Copy and paste this entire prompt into a new Copilot chat session to configure another repository to professional industry standards.

---

## 🎯 OBJECTIVE

Configure this GitHub repository to professional industry standards matching the quality of [chf3198/copilot-handoff](https://github.com/chf3198/copilot-handoff). This includes:

1. ✨ **Professional README** with emoji, badges, comprehensive documentation
2. 🤝 **Professional CONTRIBUTING guide** with clear guidelines
3. 🏷️ **Repository topics/tags** for discoverability
4. 📝 **Repository description** with emoji
5. 🔒 **Security configurations** (Dependabot, CodeQL)
6. ⚙️ **GitHub features** (Issues, Projects, Discussions)
7. 📚 **Complete documentation suite**

## 📋 REQUIRED ACTIONS

### Phase 1: Documentation Enhancement

Create or enhance the following files based on the project context:

#### 1. README.md (612+ lines recommended)
**Reference**: [copilot-handoff README](https://github.com/chf3198/copilot-handoff/blob/main/README.md)

Must include:
- 🎯 Project logo/banner with emoji-rich title
- 📊 Badge collection (CI, version, downloads, license, stars, etc.)
- 📖 Comprehensive Table of Contents
- 🌟 "Why This Project?" section with problem/solution/benefits
- ✨ Key Features with descriptions and visual placeholders
- 🎬 Demo section (with placeholder for future content)
- 📦 Multiple installation methods
- 🚀 Quick Start guide
- 📚 Detailed Usage with examples
- ⚙️ Configuration tables with all settings
- 🎯 Use Cases for different user types
- 💡 Technical background or "Why it Matters" section
- 📋 Requirements table
- ❓ FAQ section (5+ common questions)
- 🐛 Known Issues table
- 📝 Release Notes
- 🤝 Contributing section with links
- 📜 License information
- 💬 Support & Community with links and badges

**Formatting Requirements**:
- Use emoji icons for all major sections
- Include Mermaid diagrams for workflows
- Use tables for structured data
- Add placeholder images with via.placeholder.com
- Use proper markdown formatting (bold, code blocks, links)

#### 2. CONTRIBUTING.md (500+ lines recommended)
**Reference**: [copilot-handoff CONTRIBUTING](https://github.com/chf3198/copilot-handoff/blob/main/CONTRIBUTING.md)

Must include:
- 👋 Welcome message
- 📖 Table of Contents
- 🤝 Ways to Contribute (code, docs, bugs, features, community)
- 🚀 Getting Started (prerequisites, setup steps)
- 💻 Development Workflow (branch strategy, commit messages)
- 🧪 Testing Requirements
- 📝 Pull Request Process with checklist
- 🎨 Code Style Guidelines
- 📚 Documentation Standards
- 🐛 Bug Report Template reference
- ✨ Feature Request Template reference
- ⚖️ Code Review Process
- 🎯 Coding Standards
- 🏗️ Project Structure explanation
- 📦 Release Process
- 🌟 Recognition for contributors
- ❓ FAQ for contributors
- 📞 Community & Support links

#### 3. .github/CODE_OF_CONDUCT.md
**Reference**: Use Contributor Covenant 2.1

#### 4. .github/SECURITY.md
Include:
- Supported versions table
- Security reporting process
- Response timeline expectations

#### 5. .github/ROADMAP.md
Create phased roadmap:
- Phase 1: Current/Completed
- Phase 2: Near-term (Q1-Q2 2026)
- Phase 3: Medium-term (Q3-Q4 2026)
- Phase 4: Long-term (2027+)
- Future Considerations

#### 6. .github/CHANGELOG.md
Follow [Keep a Changelog](https://keepachangelog.com/) format

#### 7. Issue Templates
Create `.github/ISSUE_TEMPLATE/`:
- `bug_report.yml` - Structured bug reporting
- `feature_request.yml` - Feature request form
- `config.yml` - Template chooser configuration

#### 8. Pull Request Template
Create `.github/pull_request_template.md`

### Phase 2: GitHub Repository Configuration

Use GitHub CLI (`gh`) to automate repository setup:

#### Step 1: Verify GitHub CLI
```bash
which gh
gh auth status
```

If not authenticated, the user will need to run:
```bash
gh auth login
```

#### Step 2: Create Automation Script

Create `.github/scripts/configure-repo.sh`:

```bash
#!/bin/bash
set -e

REPO_OWNER="chf3198"  # Update with actual owner
REPO_NAME="REPOSITORY_NAME"  # Update with actual repo name

echo "🔧 Configuring GitHub repository: $REPO_OWNER/$REPO_NAME"

# Make repository public (if needed)
echo "📢 Making repository public..."
gh repo edit "$REPO_OWNER/$REPO_NAME" \
  --visibility public \
  --accept-visibility-change-consequences

# Update description with emoji
echo "📝 Updating repository description..."
gh repo edit "$REPO_OWNER/$REPO_NAME" \
  --description "✨ YOUR_DESCRIPTION_WITH_EMOJI"

# Enable features
echo "🔧 Enabling repository features..."
gh repo edit "$REPO_OWNER/$REPO_NAME" \
  --enable-issues \
  --enable-projects \
  --enable-discussions

echo "✅ Repository configuration complete!"
echo ""
echo "📋 Next steps:"
echo "1. Add topics manually or with individual gh commands"
echo "2. Enable security features at https://github.com/$REPO_OWNER/$REPO_NAME/settings/security_analysis"
echo "3. Configure branch protection at https://github.com/$REPO_OWNER/$REPO_NAME/settings/branches"
echo "4. Upload social preview image (1280x640px)"
```

#### Step 3: Add Repository Topics

Add relevant topics (10-15 recommended):
```bash
gh repo edit OWNER/REPO --add-topic topic1
gh repo edit OWNER/REPO --add-topic topic2
# ... repeat for all topics
```

Common topic categories:
- **Technology**: `typescript`, `javascript`, `python`, `react`, `node`, etc.
- **Purpose**: `library`, `framework`, `tool`, `cli`, `api`, etc.
- **Domain**: `developer-tools`, `productivity`, `automation`, `ai`, etc.
- **Platform**: `vscode`, `github`, `web`, `cloud`, etc.

### Phase 3: Security & Automation

#### 1. Dependabot Configuration

Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  # Package manager (npm, pip, cargo, etc.)
  - package-ecosystem: "npm"  # Change based on project
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 10
    reviewers:
      - "OWNER"
    labels:
      - "dependencies"
      - "automated"
    commit-message:
      prefix: "chore"
      include: "scope"
    groups:
      dev-dependencies:
        dependency-type: "development"
        update-types:
          - "minor"
          - "patch"

  # GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    labels:
      - "github-actions"
      - "dependencies"
```

#### 2. CodeQL Security Scanning

Create `.github/workflows/codeql.yml`:

```yaml
name: "CodeQL Security Scan"

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 9 * * 1'  # Monday 9 AM

jobs:
  analyze:
    name: Analyze Code
    runs-on: ubuntu-latest
    permissions:
      actions: read
      contents: read
      security-events: write

    strategy:
      fail-fast: false
      matrix:
        language: [ 'javascript' ]  # Adjust: javascript, python, java, etc.

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Initialize CodeQL
      uses: github/codeql-action/init@v3
      with:
        languages: ${{ matrix.language }}

    - name: Autobuild
      uses: github/codeql-action/autobuild@v3

    - name: Perform CodeQL Analysis
      uses: github/codeql-action/analyze@v3
```

### Phase 4: Commit & Push All Changes

```bash
# Review all changes
git status

# Stage all new files
git add .

# Commit with descriptive message
git commit -m "docs: Add comprehensive documentation and repository configuration

- Add professional README with badges, sections, and formatting
- Add detailed CONTRIBUTING guide with workflows and standards
- Add CODE_OF_CONDUCT, SECURITY, ROADMAP, CHANGELOG
- Add issue/PR templates for better contribution management
- Configure Dependabot for automated dependency updates
- Add CodeQL workflow for security scanning
- Create repository configuration automation script
- Set up complete .github directory structure"

# Push to main branch
git push origin main
```

### Phase 5: Execute Automated Configuration

```bash
# Make script executable
chmod +x .github/scripts/configure-repo.sh

# Run configuration script
bash .github/scripts/configure-repo.sh
```

Then add topics individually:
```bash
gh repo edit OWNER/REPO --add-topic topic1
gh repo edit OWNER/REPO --add-topic topic2
# ... etc
```

Enable Discussions:
```bash
gh repo edit OWNER/REPO --enable-discussions
```

Commit the script:
```bash
git add .github/scripts/configure-repo.sh
git commit -m "chore: Add repository configuration automation script"
git push origin main
```

### Phase 6: Manual Web UI Tasks

Complete these tasks via GitHub web interface:

#### 1. Enable Security Features (2 minutes)
URL: `https://github.com/OWNER/REPO/settings/security_analysis`
- ✅ Enable Dependabot alerts
- ✅ Enable Dependabot security updates
- ✅ Enable CodeQL scanning
- ✅ Enable Secret scanning

#### 2. Configure Branch Protection (5 minutes)
URL: `https://github.com/OWNER/REPO/settings/branches`

Add rule for `main` branch:
- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging
- ✅ Require conversation resolution before merging
- ✅ Require linear history
- ✅ Include administrators

#### 3. Upload Social Preview Image (optional, 5 minutes)
URL: `https://github.com/OWNER/REPO/settings`
- Create 1280x640px image with project branding
- Upload in "Social preview" section

#### 4. Set Up Discussion Categories (optional, 3 minutes)
URL: `https://github.com/OWNER/REPO/discussions`
- 📢 Announcements (announcement type)
- 💡 Ideas (open discussion)
- ❓ Q&A (question/answer)
- 🎉 Show and tell (open discussion)
- 💬 General (open discussion)

## 🎨 CUSTOMIZATION GUIDELINES

### README Badge Generation

Use shields.io for consistent badges:

```markdown
<!-- Version/Release -->
![Version](https://img.shields.io/github/v/release/OWNER/REPO?style=for-the-badge)

<!-- License -->
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

<!-- CI Status -->
![CI](https://img.shields.io/github/actions/workflow/status/OWNER/REPO/ci.yml?branch=main&style=for-the-badge&label=CI)

<!-- Issues -->
![Issues](https://img.shields.io/github/issues/OWNER/REPO?style=for-the-badge)

<!-- Stars -->
![Stars](https://img.shields.io/github/stars/OWNER/REPO?style=for-the-badge)

<!-- Language -->
![Language](https://img.shields.io/github/languages/top/OWNER/REPO?style=for-the-badge)

<!-- PRs Welcome -->
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)
```

### Emoji Usage Guidelines

Use emoji strategically for visual hierarchy:
- 🎯 Goals/Objectives
- ✨ Features
- 🚀 Getting Started/Quick Start
- 📦 Installation
- ⚙️ Configuration
- 📚 Documentation
- 🧪 Testing
- 🐛 Bugs/Issues
- 💡 Tips/Ideas
- 🔒 Security
- 📝 Notes/Writing
- 🤝 Contributing/Community
- ⚡ Performance
- 🎨 Design/UI
- 📊 Data/Analytics

### Description Templates

Choose based on project type:

**Library/Framework:**
```
✨ [Brief description of what it does]. [Key benefit]. [Unique value proposition]!
```

**Tool/CLI:**
```
🛠️ [What it does] for [target users]. [Main feature]. [Key benefit]!
```

**VS Code Extension:**
```
🔌 [Core functionality] and [additional benefit]. [Problem it solves]!
```

**Application:**
```
🚀 [Type of app] for [purpose]. [Key feature]. [User benefit]!
```

## 📊 QUALITY CHECKLIST

Before marking complete, verify:

### Documentation
- [ ] README is 400+ lines with all required sections
- [ ] CONTRIBUTING is 400+ lines with clear guidelines
- [ ] All emoji icons are consistent and meaningful
- [ ] Tables are used for structured data
- [ ] Code examples are included where relevant
- [ ] Links are all working (internal and external)
- [ ] Badge URLs are correct and displaying
- [ ] Placeholder images are included for future screenshots

### Repository Configuration
- [ ] Repository is public (if intended)
- [ ] Description includes emoji and is compelling
- [ ] 10-15 relevant topics are added
- [ ] Issues are enabled
- [ ] Projects are enabled
- [ ] Discussions are enabled (if appropriate)
- [ ] Wiki is enabled/disabled as appropriate

### Security & Automation
- [ ] Dependabot.yml is configured and committed
- [ ] CodeQL workflow is configured and committed
- [ ] Dependabot alerts enabled via web UI
- [ ] CodeQL scanning enabled via web UI
- [ ] Secret scanning enabled (if available)
- [ ] Branch protection configured

### Templates & Policies
- [ ] Bug report template exists
- [ ] Feature request template exists
- [ ] PR template exists
- [ ] CODE_OF_CONDUCT.md exists
- [ ] SECURITY.md exists with reporting process
- [ ] ROADMAP.md exists with phases
- [ ] CHANGELOG.md exists and formatted correctly

### Git History
- [ ] All changes committed with descriptive messages
- [ ] All changes pushed to remote
- [ ] Commit history is clean and logical
- [ ] No sensitive data in commits

## 🔗 REFERENCE EXAMPLES

Study these files from copilot-handoff for inspiration:

1. **README.md**: https://github.com/chf3198/copilot-handoff/blob/main/README.md
2. **CONTRIBUTING.md**: https://github.com/chf3198/copilot-handoff/blob/main/CONTRIBUTING.md
3. **ROADMAP.md**: https://github.com/chf3198/copilot-handoff/blob/main/.github/ROADMAP.md
4. **Issue Templates**: https://github.com/chf3198/copilot-handoff/tree/main/.github/ISSUE_TEMPLATE
5. **Dependabot Config**: https://github.com/chf3198/copilot-handoff/blob/main/.github/dependabot.yml
6. **CodeQL Workflow**: https://github.com/chf3198/copilot-handoff/blob/main/.github/workflows/codeql.yml

## 🎯 SUCCESS CRITERIA

Repository configuration is complete when:

1. ✅ README displays beautifully on GitHub with professional formatting
2. ✅ Repository has compelling description with emoji
3. ✅ Topics/tags are visible and relevant
4. ✅ All documentation files are comprehensive and linked
5. ✅ Security features are enabled and configured
6. ✅ Automation (Dependabot, CodeQL) is running
7. ✅ Community features (Issues, Discussions) are enabled
8. ✅ Repository matches or exceeds copilot-handoff quality

## 💬 IMPORTANT NOTES FOR AI AGENT

1. **Use GitHub CLI**: Leverage existing `gh` authentication to automate repository configuration
2. **Adapt to Context**: Customize all content based on the specific project's purpose, technology, and audience
3. **Maintain Quality**: Don't compromise on documentation quality - aim for 500+ lines in README
4. **Be Thorough**: Create ALL listed files, don't skip any
5. **Commit Incrementally**: Make logical commits as you create groups of related files
6. **Test Links**: Ensure all internal links work correctly
7. **Verify Success**: After completion, visit the repository on GitHub to verify appearance

## 🚀 EXECUTION STRATEGY

**Recommended order:**
1. Start with documentation (README, CONTRIBUTING)
2. Add supporting docs (CODE_OF_CONDUCT, SECURITY, ROADMAP, CHANGELOG)
3. Create templates (issue templates, PR template)
4. Set up automation (Dependabot, CodeQL)
5. Commit and push all changes
6. Run automated repository configuration
7. Complete manual web UI tasks
8. Verify final result

**Time estimate:** 30-45 minutes for AI agent to complete phases 1-5

---

## 📋 USER CUSTOMIZATION REQUIRED

Before running this prompt, update these values:

- `REPO_OWNER`: Your GitHub username/organization
- `REPO_NAME`: The repository name
- `YOUR_DESCRIPTION_WITH_EMOJI`: Repository description
- `package-ecosystem`: Change from "npm" if using different package manager
- `language`: Update CodeQL language based on project
- All topic tags to match your project

---

**Ready? Paste this entire prompt into a new Copilot chat session in VS Code with your target repository workspace open. The AI agent will handle the rest!** 🚀
