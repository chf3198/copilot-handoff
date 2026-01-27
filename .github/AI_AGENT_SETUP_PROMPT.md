# GitHub Repository Professional Setup - AI Agent Prompt

**Copy and paste this prompt to configure any repository to professional industry standards.**

---

## 🎯 YOUR MISSION

Transform this repository to match the professional quality of **[chf3198/copilot-handoff](https://github.com/chf3198/copilot-handoff)**.

**Use that repository as your primary reference** - study it thoroughly, then apply those same standards here.

---

## 📚 REFERENCE MATERIALS

**Primary Example:**
- **[copilot-handoff repository](https://github.com/chf3198/copilot-handoff)** - Study all files in `.github/`, README.md, CONTRIBUTING.md, and repository settings

**Best Practice Guides:**
1. [GitHub Community Health Docs](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions)
2. [opensource.guide](https://opensource.guide/) - Maintainer best practices  
3. [Awesome README](https://github.com/matiassingers/awesome-readme) - Excellent examples
4. [makeareadme.com](https://www.makeareadme.com/) - README standards

---

## 🎨 CORE PRINCIPLES

### 1. Documentation Excellence
Create comprehensive, welcoming documentation that matches copilot-handoff's quality:

- **README.md** (400-600+ lines)
  - Study [copilot-handoff's README](https://github.com/chf3198/copilot-handoff/blob/main/README.md) structure
  - Include: badges, TOC, demo, features, installation, usage, configuration, FAQ
  - Use emoji strategically for visual hierarchy
  - Add tables for structured data, code examples with explanations

- **CONTRIBUTING.md** (400-500+ lines)
  - Study [copilot-handoff's CONTRIBUTING](https://github.com/chf3198/copilot-handoff/blob/main/CONTRIBUTING.md)
  - Include: setup, coding standards, PR process, testing, code review guidelines

- **Community Health Files**
  - CODE_OF_CONDUCT.md (Contributor Covenant 2.1)
  - SECURITY.md (vulnerability reporting process)
  - SUPPORT.md (help resources and community links)
  - ROADMAP.md (phased development plan)
  - CHANGELOG.md (Keep a Changelog format)

### 2. Professional GitHub Configuration
Match copilot-handoff's repository setup:

- **Repository Settings**: Public, compelling description with emoji, 10-15 relevant topics
- **Features**: Issues, Projects, Discussions enabled
- **Security**: Dependabot alerts & updates, CodeQL scanning, secret scanning  
- **Branch Protection**: Required reviews, status checks, Code Owners approval
- **Automation**: Auto-delete merged branches, CI/CD workflows

### 3. Templates & Governance
Study copilot-handoff's [.github/ISSUE_TEMPLATE/](https://github.com/chf3198/copilot-handoff/tree/main/.github/ISSUE_TEMPLATE) and create:

- Bug report template (`.github/ISSUE_TEMPLATE/bug_report.yml`)
- Feature request template (`.github/ISSUE_TEMPLATE/feature_request.yml`)
- Template config (`.github/ISSUE_TEMPLATE/config.yml`)
- Pull request template (`.github/pull_request_template.md`)
- CODEOWNERS (if applicable)
- FUNDING.yml (if accepting sponsorships)

### 4. Automation Setup
Replicate copilot-handoff's automation:

- **Dependabot** ([example](https://github.com/chf3198/copilot-handoff/blob/main/.github/dependabot.yml))
  - Weekly dependency updates
  - Grouped dev dependencies
  - Supports your package ecosystem (npm, pip, cargo, etc.)

- **CodeQL Security Scanning** ([example](https://github.com/chf3198/copilot-handoff/blob/main/.github/workflows/codeql.yml))
  - Runs on push/PR and weekly schedule
  - Configured for your project language

---

## ⚙️ IMPLEMENTATION STEPS

### 1. Study the Reference
- Browse copilot-handoff thoroughly on GitHub
- Read README, CONTRIBUTING, all .github/ files
- Note the structure, writing style, and visual design
- Check repository settings (topics, description, features)

### 2. Create Documentation
Adapt copilot-handoff's structure to this project:
- Write comprehensive README and CONTRIBUTING
- Add all community health files
- Create issue/PR templates
- Add CODEOWNERS and/or FUNDING.yml if applicable

### 3. Configure Automation
Create `.github/` files (customize for your project):
- `dependabot.yml` - Dependency management
- `workflows/codeql.yml` - Security scanning
- `scripts/configure-repo.sh` - GitHub CLI automation script

### 4. Automate Repository Setup
Use GitHub CLI to configure repository:

```bash
# Verify authentication
gh auth status

# Make public, update description, enable features
gh repo edit OWNER/REPO --visibility public --accept-visibility-change-consequences
gh repo edit OWNER/REPO --description "✨ Your compelling description with emoji"
gh repo edit OWNER/REPO --enable-issues --enable-projects --enable-discussions

# Add topics (one at a time, 10-15 total)
gh repo edit OWNER/REPO --add-topic topic1
gh repo edit OWNER/REPO --add-topic topic2
# ... continue for all topics
```

### 5. Enable Security (Web UI)
Visit `https://github.com/OWNER/REPO/settings/security_analysis`:
- ✅ Dependabot alerts
- ✅ Dependabot security updates  
- ✅ CodeQL analysis
- ✅ Secret scanning

### 6. Configure Branch Protection (Web UI)
Visit `https://github.com/OWNER/REPO/settings/branches`:
- ✅ Require PR reviews before merging
- ✅ Require status checks to pass
- ✅ Require Code Owners approval (if using CODEOWNERS)
- ✅ Include administrators

---

## ✅ SUCCESS CRITERIA

Your repository should:
1. ✅ **Match copilot-handoff's visual appeal** - Professional, comprehensive, welcoming
2. ✅ **Have complete documentation** - README 400-600+ lines, CONTRIBUTING 400-500+ lines
3. ✅ **Include all community files** - CODE_OF_CONDUCT, SECURITY, SUPPORT, ROADMAP, CHANGELOG
4. ✅ **Have automation configured** - Dependabot, CodeQL running
5. ✅ **Be discoverable** - Public, compelling description, 10-15 topics
6. ✅ **Be contributor-friendly** - Clear templates, guidelines, welcoming tone

**Final check**: Visit your repository on GitHub - does it look as professional as [copilot-handoff](https://github.com/chf3198/copilot-handoff)?

---

## 💡 KEY CUSTOMIZATIONS

Update these for your project:
- Repository owner/name
- Project description (with emoji)
- Topics (10-15 relevant keywords)
- Package ecosystem in `dependabot.yml` (npm, pip, cargo, maven, etc.)
- Language in `codeql.yml` (javascript, python, java, go, etc.)
- Badge URLs (update OWNER/REPO in shields.io links)
- All placeholder text with project-specific content

---

## 🎯 QUICK REFERENCE

**Essential Files to Create:**
- README.md (400-600+ lines)
- CONTRIBUTING.md (400-500+ lines)
- .github/CODE_OF_CONDUCT.md
- .github/SECURITY.md
- .github/SUPPORT.md
- .github/ROADMAP.md
- .github/CHANGELOG.md
- .github/ISSUE_TEMPLATE/ (bug, feature, config)
- .github/pull_request_template.md
- .github/dependabot.yml
- .github/workflows/codeql.yml

**Example Links from copilot-handoff:**
- [README.md](https://github.com/chf3198/copilot-handoff/blob/main/README.md)
- [CONTRIBUTING.md](https://github.com/chf3198/copilot-handoff/blob/main/CONTRIBUTING.md)
- [ROADMAP.md](https://github.com/chf3198/copilot-handoff/blob/main/.github/ROADMAP.md)
- [Issue Templates](https://github.com/chf3198/copilot-handoff/tree/main/.github/ISSUE_TEMPLATE)
- [Dependabot Config](https://github.com/chf3198/copilot-handoff/blob/main/.github/dependabot.yml)
- [CodeQL Workflow](https://github.com/chf3198/copilot-handoff/blob/main/.github/workflows/codeql.yml)

---

**Ready? Study [copilot-handoff](https://github.com/chf3198/copilot-handoff), then replicate that excellence here!** 🚀
