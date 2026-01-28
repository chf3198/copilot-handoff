# GitHub Repository Professional Setup - AI Agent Prompt

**Copy and paste this prompt into a new Copilot chat session to configure any repository to professional industry standards.**

---

## 🎯 YOUR MISSION

Transform this repository to match the professional quality of **[chf3198/copilot-handoff](https://github.com/chf3198/copilot-handoff)**.

**Use that repository as your reference example** - study its structure, documentation style, automation setup, and GitHub configuration. Apply the same level of quality and completeness to this project.

## � AUTHORITATIVE SOURCES

Study these resources to understand industry best practices:

1. **[copilot-handoff repository](https://github.com/chf3198/copilot-handoff)** - Your primary reference
2. **[GitHub Docs: Community Health](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions)** - Official guidelines
3. **[opensource.guide](https://opensource.guide/)** - Best practices for open source
4. **[Awesome README](https://github.com/matiassingers/awesome-readme)** - Excellent examples
5. **[makeareadme.com](https://www.makeareadme.com/)** - README standards

## 🎨 CORE PRINCIPLES

### 1. Documentation Excellence
- **README**: 400-600+ lines, comprehensive, visual, professional
  - Use copilot-handoff's README as template
  - Include: badges, TOC, demo, features, installation, usage, configuration, FAQ
  - Heavy use of emoji for visual hierarchy
  - Tables for structured data
  - Code examples with explanations
  
- **CONTRIBUTING**: 400-500+ lines with clear guidelines
  - Study copilot-handoff's CONTRIBUTING.md
  - Include: setup instructions, coding standards, PR process, testing requirements

- **Community Health Files**: CODE_OF_CONDUCT, SECURITY, SUPPORT, ROADMAP, CHANGELOG
  - Follow GitHub's recommended structure
  - copilot-handoff has excellent examples of each

### 2. Professional GitHub Configuration
- **Repository Settings**: Public visibility, compelling description with emoji, 10-15 relevant topics
- **Features Enabled**: Issues, Projects, Discussions
- **Security**: Dependabot (weekly updates), CodeQL scanning, secret scanning
- **Branch Protection**: Require PR reviews, status checks, Code Owners approval
- **Templates**: Issue templates (bug, feature), PR template, CODEOWNERS, FUNDING.yml

### 3. Automation First
- **Dependabot**: Weekly dependency updates (npm, GitHub Actions)
- **CodeQL**: Security scanning on push/PR and weekly schedule
- **GitHub Actions**: CI/CD workflows appropriate for the project type
- **Auto-cleanup**: Auto-delete merged branches

### 4. Visual Appeal & Discoverability
- **Badges**: Version, license, CI status, downloads, coverage, etc.
- **Emoji**: Strategic use for section headers and visual hierarchy
- **Topics/Tags**: 10-15 relevant keywords for GitHub search
- **Social Preview**: 1280x640px banner image (optional but professional)

## ⚙️ IMPLEMENTATION APPROACH

### Step 1: Study the Reference
Examine [copilot-handoff](https://github.com/chf3198/copilot-handoff) thoroughly:
- Browse all files in `.github/` directory
- Read the README, CONTRIBUTING, and other docs
- Note the writing style, structure, and completeness
- Check the repository settings (topics, description, features)

### Step 2: Create Documentation
Based on this project's purpose and technology:
- Write comprehensive README (adapt copilot-handoff's structure)
- Create detailed CONTRIBUTING guide
- Add all community health files (CODE_OF_CONDUCT, SECURITY, SUPPORT, ROADMAP, CHANGELOG)
- Create issue/PR templates
- Add CODEOWNERS if appropriate
- Add FUNDING.yml if accepting sponsorships
- Add ARCHITECTURE.md if project is complex

### Step 3: Configure Automation
Create `.github/` files:
- `dependabot.yml` - Dependency updates configuration
- `workflows/codeql.yml` - Security scanning workflow
- `scripts/configure-repo.sh` - Automation script for GitHub CLI
- Other workflows as needed for CI/CD

### Step 4: Automate Repository Setup
Use GitHub CLI (`gh`) to configure:
```bash
# Verify authentication
gh auth status

# Run configuration (update the script with your details)
bash .github/scripts/configure-repo.sh

# Add topics individually
gh repo edit OWNER/REPO --add-topic topic1
gh repo edit OWNER/REPO --add-topic topic2
# ... repeat for all topics

# Enable discussions
gh repo edit OWNER/REPO --enable-discussions
```

### Step 5: Complete Manual Tasks
Via GitHub web UI:
- Enable security features (Dependabot alerts, CodeQL, secret scanning)
- Configure branch protection for main branch
- Upload social preview image (optional)
- Set up Discussion categories
- Verify all settings match copilot-handoff quality level

## 📋 ESSENTIAL FILES CHECKLIST

Study copilot-handoff for examples of each:

**Core Documentation:**
- [ ] README.md (400-600+ lines, comprehensive)

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

#### 8. .github/CODEOWNERS (Optional but Recommended)
Define code ownership for automatic review requests:
```
# Global owners
* @owner-username

# Specific paths
/docs/ @documentation-team
*.js @frontend-team
/src/api/ @backend-team
```

#### 9. .github/FUNDING.yml (Optional)
If accepting sponsorships, create funding file:
```yaml
github: [your-username]
patreon: your-username
ko_fi: your-username
custom: ["https://www.paypal.me/yourname"]
```

#### 10. Issue Templates
Create `.github/ISSUE_TEMPLATE/`:
- `bug_report.yml` - Structured bug reporting
- `feature_request.yml` - Feature request form
- `config.yml` - Template chooser configuration

#### 11. Pull Request Template
Create `.github/pull_request_template.md`

### Phase 2: Enhanced Documentation Files (Optional but Professional)

#### 1. .github/SUPPORT.md
Create support resources file:
```markdown
# Support

## How to get help

- 📖 Check the [Documentation](link-to-docs)
- 💬 Join our [Discussions](link-to-discussions)  
- 🐛 Report bugs via [Issues](link-to-issues)
- 💡 Request features via [Issues](link-to-issues)
- 📧 Email: support@example.com (if applicable)

## Community

- [Discord](link) or [Slack](link)
- [Stack Overflow](link) - Tag your questions with `project-name`

## Enterprise Support

For commercial support inquiries, contact enterprise@example.com
```

#### 2. .github/ARCHITECTURE.md (For Complex Projects)
Document your system architecture:
- High-level diagrams
- Component descriptions
- Data flow
- Technology stack details
- Design decisions and invariants

Example structure:
```markdown
# Architecture

## Overview
[High-level description]

## System Diagram
[Include Mermaid diagram or image]

## Components
### Component Name
- Purpose
- Technologies
- Dependencies

## Design Decisions
- Why we chose X over Y
- Trade-offs made
```

### Phase 3: GitHub Repository Configuration

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
4
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

### Phase 5: Commit & Push All Changes

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

### Phase 6: Execute Automated Configuration

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

### Phase 7: Manual Web UI Tasks

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
- ✅ Require review from Code Owners (if using CODEOWNERS)

#### 3. Upload Social Preview Image (optional, 5 minutes)
URL: `https://github.com/OWNER/REPO/settings`
- Create 1280x640px image with project branding
- Upload in "Social preview" section

#### 4. Set Up Discussion Categories (optional, 3 minutes)
URL: `https://github.com/OWNER/REPO/discussions`
- 📢 Announcements (announcement type)
- 💡 Ideas (open discussion)
- ❓ Q&A (question/answer)
- 🎉 Show and tell (open discu

#### 5. Enable Additional Features (2 minutes)
URL: `https://github.com/OWNER/REPO/settings`
- ✅ Automatically delete head branches (clean up after merge)
- ✅ Allow auto-merge (for trusted contributors)
- ✅ Enable preserve this repository (for archival)ssion)
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

## 📊 CODE_OF_CONDUCT follows Contributor Covenant
- [ ] SECURITY.md includes reporting process
- [ ] SUPPORT.md provides help resources
- [ ] All emoji icons are consistent and meaningful
- [ ] Tables are used for structured data
- [ ] Code examples are included where relevant
- [ ] Links are all working (internal and external)
- [ ] Badge URLs are correct and displaying
- [ ] Placeholder images are included for future screenshots
- [ ] Auto-generated TOC works correctly (GitHub renders it)
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
- [ ] Wiki is enabled/disabled a (.github/ISSUE_TEMPLATE/)
- [ ] Feature request template exists (.github/ISSUE_TEMPLATE/)
- [ ] Template config exists (.github/ISSUE_TEMPLATE/config.yml)
- [ ] PR template exists (.github/pull_request_template.md)
- [ ] CODE_OF_CONDUCT.md exists (Contributor Covenant 2.1)
- [ ] SECURITY.md exists with reporting process
- [ ] SUPPORT.md exists with help resources
- [ ] ROADMAP.md exists with phases
- [ ] CHANGELOG.md exists and follows Keep a Changelog format
- [ ] CODEOWNERS exists (if using code ownership)
- [ ] FUNDING.yml exists (if accepting sponsorships)
- [ ] ARCHITECTURE.md exists (for complex projects)
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
7. ✅ Communitycore documentation (README, CONTRIBUTING)
2. Add community health files (CODE_OF_CONDUCT, SECURITY, SUPPORT)
3. Add project docs (ROADMAP, CHANGELOG, ARCHITECTURE if needed)
4. Create templates (issue templates, PR template, CODEOWNERS, FUNDING)
5. Set up automation (Dependabot, CodeQL workflows)
6. Commit and push all changes
7. Run automated repository configuration (visibility, topics, features)
8. Complete manual web UI tasks (security, branch protection)
9. Verify final result on GitHub

**Time estimate:** 35-50 minutes for AI agent to complete phases 1-6

## 📚 ADDITIONAL BEST PRACTICES

### Community Health Files Priority
GitHub recognizes these files and promotes them in your repository UI:
1. **README.md** - First impression (REQUIRED)
2. **LICENSE** - Legal clarity (REQUIRED for open source)
3. **CODE_OF_CONDUCT.md** - Community standards
4. **CONTRIBUTING.md** - Contribution guidelines
5. **SECURITY.md** - Security policy
6. **SUPPORT.md** - Help resources
7. **FUNDING.yml** - Sponsorship options

### Professional README Must-Haves (Based on Research)
1. **Visual Hierarchy** - Use headers, emoji, tables, badges strategically
2. **Quick Start Section** - Get users running in < 2 minutes
3. **Demo/Screenshots** - Show, don't just tell
4. **Installation Instructions** - Multiple methods (npm, pip, brew, etc.)
5. **Usage Examples** - Code samples with expected output
6. **API Documentation** - Link to detailed docs
7. **FAQ Section** - Answer common questions proactively
8. **Badge Collection** - Version, downloads, build status, coverage, license
9. **Table of Contents** - For READMEs > 200 lines
10. **Relative Links** - Use relative paths for all internal links

### Security Best Practices (GitHub Docs)
1. **Enable Dependency Graph** - Foundation for Dependabot
2. **Dependabot Alerts** - Vulnerability notifications
3. **Dependabot Security Updates** - Auto-create PRs for security fixes
4. **Dependabot Version Updates** - Keep dependencies current
5. **CodeQL Analysis** - Automated code scanning
6. **Secret Scanning** - Prevent credential leaks
7. **Push Protection** - Block secret commits
8. **Security Policy (SECURITY.md)** - Responsible disclosure process

### Automation Excellence
1. **GitHub Actions** - CI/CD workflows
2. **Dependabot** - Automated dependency updates
3. **CodeQL** - Security scanning
4. **Auto-merge** - For trusted automated PRs
5. **Branch Protection** - Prevent direct pushes to main
6. **Required Reviews** - Ensure code quality
7. **Status Checks** - Must pass before merge
8. **Auto-delete Branches** - Clean up after mergeps of related files
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
