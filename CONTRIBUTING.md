<div align="center">

# 🤝 Contributing to Copilot Handoff

**Thank you for your interest in making Copilot Handoff better!**

We welcome contributions of all kinds from everyone.

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)
[![Code of Conduct](https://img.shields.io/badge/Code%20of-Conduct-blue.svg?style=for-the-badge)](.github/CODE_OF_CONDUCT.md)

[Quick Start](#-quick-start) • [Development](#-development-workflow) • [Guidelines](#-contribution-guidelines) • [Community](#-community)

</div>

---

## 📖 Table of Contents

- [Ways to Contribute](#-ways-to-contribute)
- [Quick Start](#-quick-start)
- [Development Workflow](#-development-workflow)
- [Code Guidelines](#-code-guidelines)
- [Testing](#-testing)
- [Pull Request Process](#-pull-request-process)
- [Issue Reporting](#-issue-reporting)
- [Community](#-community)

---

## 🌟 Ways to Contribute

We appreciate all kinds of contributions:

<table>
<tr>
<td width="33%" align="center">

### 🐛 Report Bugs
Found a problem?
[Report it!](https://github.com/chf3198/copilot-handoff/issues/new?template=bug_report.md)

</td>
<td width="33%" align="center">

### 💡 Suggest Features
Have an idea?
[Share it!](https://github.com/chf3198/copilot-handoff/issues/new?template=feature_request.md)

</td>
<td width="33%" align="center">

### 📖 Improve Docs
See a typo or unclear docs?
[Fix it!](https://github.com/chf3198/copilot-handoff/edit/main/README.md)

</td>
</tr>
<tr>
<td width="33%" align="center">

### 🔧 Write Code
Want to code?
[Pick an issue!](https://github.com/chf3198/copilot-handoff/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

</td>
<td width="33%" align="center">

### 🧪 Test
Help us test?
[Try the latest!](https://github.com/chf3198/copilot-handoff/releases)

</td>
<td width="33%" align="center">

### 💬 Discuss
Join the conversation!
[Discussions](https://github.com/chf3198/copilot-handoff/discussions)

</td>
</tr>
</table>

---

## 🚀 Quick Start

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:

- ✅ **Git** installed
- ✅ **Node.js** 18+ (we use v18.20.8)
- ✅ **VS Code** 1.85.0+
- ✅ **Basic TypeScript** knowledge

### Setup in 5 Steps

1. **Fork the repository** on GitHub
   - Click the "Fork" button at the top right

2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/copilot-handoff.git
   cd copilot-handoff
   ```

3. **Install dependencies**:
   ```bash
   npm install --no-bin-links
   ```
   > Note: `--no-bin-links` is required for USB/network drives

4. **Build the extension**:
   ```bash
   npm run compile
   ```

5. **Test it works**:
   - Press `F5` in VS Code
   - A new window opens with your extension loaded
   - Look for the clock icon ⏰ in the status bar

🎉 **You're ready to contribute!**

---

## 🔧 Development Workflow

### Project Structure

```
copilot-handoff/
├── .github/              # GitHub configuration
│   ├── workflows/        # CI/CD pipelines
│   └── ISSUE_TEMPLATE/   # Issue templates
├── src/                  # TypeScript source code
│   ├── extension.ts      # Main entry point
│   ├── sessionTracker.ts     # Session tracking logic
│   ├── notificationManager.ts # Notifications
│   ├── contextExporter.ts    # Context export
│   └── test/             # Test files
├── out/                  # Compiled JavaScript (gitignored)
├── images/               # Icons and assets
└── package.json          # Extension manifest
```

### Making Changes

#### 1. Create a Feature Branch

```bash
# Update your main branch
git checkout main
git pull upstream main  # If you've added upstream

# Create a new branch
git checkout -b feature/amazing-feature
# or
git checkout -b fix/bug-description
```

**Branch Naming Convention:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation only
- `refactor/` - Code refactoring
- `test/` - Adding tests

#### 2. Make Your Changes

Edit files in the `src/` directory:
- **TypeScript** strict mode is enabled
- **ESLint** will catch common issues
- **Comments** are appreciated for complex logic

#### 3. Test Your Changes

```bash
# Compile TypeScript
npm run compile

# Run linter
npm run lint

# Test in VS Code
# Press F5 to launch Extension Development Host
```

**Manual Testing Checklist:**
- [ ] Extension activates without errors
- [ ] Status bar appears and updates
- [ ] Commands work from Command Palette
- [ ] Settings changes take effect
- [ ] No errors in Developer Console

#### 4. Commit Your Changes

We follow **Conventional Commits**:

```bash
# Good commit messages
git commit -m "feat: add custom template support"
git commit -m "fix: resolve timer reset bug"
git commit -m "docs: update README installation steps"
git commit -m "test: add session tracker tests"

# Bad commit messages
git commit -m "stuff"
git commit -m "fixed it"
git commit -m "updates"
```

**Commit Message Format:**
```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code restructure
- `test` - Adding tests
- `chore` - Maintenance

---

## 📏 Code Guidelines

### TypeScript Style

```typescript
// ✅ Good
export class SessionTracker {
    private readonly context: vscode.ExtensionContext;
    private sessionStartTime: number;
    
    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.sessionStartTime = Date.now();
    }
    
    public getSessionDuration(): number {
        const now = Date.now();
        return Math.floor((now - this.sessionStartTime) / (1000 * 60));
    }
}

// ❌ Bad
export class SessionTracker {
    context: any;
    time: number;
    
    constructor(c) {
        this.context = c;
        this.time = Date.now();
    }
    
    getDuration() {
        return (Date.now() - this.time) / 60000;
    }
}
```

### Best Practices

| ✅ Do | ❌ Don't |
|------|----------|
| Use descriptive variable names | Use single letters except in loops |
| Add JSDoc comments for public methods | Leave complex code uncommented |
| Handle errors gracefully | Let errors crash silently |
| Use TypeScript strict types | Use `any` everywhere |
| Keep functions focused and small | Create monolithic functions |
| Follow existing patterns | Introduce new patterns without discussion |

### Code Review Checklist

Before submitting, ensure:

- [ ] Code compiles without errors (`npm run compile`)
- [ ] Linter passes (`npm run lint`)
- [ ] No new warnings introduced
- [ ] Follows existing code style
- [ ] Complex logic has comments
- [ ] Public APIs have JSDoc
- [ ] No `console.log` left in code
- [ ] No commented-out code blocks

---

## 🧪 Testing

### Manual Testing

1. **Launch Extension Development Host**
   - Press `F5` in VS Code
   - New window opens with extension loaded

2. **Test Core Features**
   - Check status bar appears
   - Verify timer increments
   - Test notification triggers
   - Try context export
   - Test configuration changes

3. **Check Developer Console**
   - `Help > Toggle Developer Tools`
   - Look for errors in Console tab
   - Verify no warnings

### Automated Testing

```bash
# Run tests (when implemented)
npm test
```

**Writing Tests:**
```typescript
// src/test/suite/sessionTracker.test.ts
import * as assert from 'assert';
import { SessionTracker } from '../../sessionTracker';

suite('Session Tracker Tests', () => {
    test('Should start with zero duration', () => {
        const tracker = new SessionTracker(mockContext);
        assert.strictEqual(tracker.getSessionDuration(), 0);
    });
});
```

---

## 📬 Pull Request Process

### Before Submitting

1. **Update documentation** if needed
   - Update README.md for user-facing changes
   - Update CHANGELOG.md
   - Add JSDoc comments

2. **Test thoroughly**
   - Manual testing in Extension Host
   - Check all related features still work

3. **Clean up your commits**
   - Squash WIP commits if needed
   - Ensure commit messages follow convention

### Submitting Your PR

1. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```

2. **Create Pull Request** on GitHub:
   - Use the PR template
   - Fill in all sections
   - Link related issues
   - Add screenshots/GIFs if relevant

3. **PR Title Format**:
   ```
   feat: add custom template support
   fix: resolve session timer reset bug
   docs: update installation instructions
   ```

### PR Template Checklist

```markdown
## Description
Clear description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested in Extension Development Host
- [ ] All existing features still work
- [ ] Added new tests (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex sections
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Tests pass
```

### Review Process

1. **Automated Checks** run (CI/CD)
   - Code must compile
   - Linter must pass
   - Tests must pass (when implemented)

2. **Code Review** by maintainers
   - Typically within 48-72 hours
   - May request changes
   - Discussion is encouraged

3. **Approval & Merge**
   - Once approved, maintainers merge
   - Your contribution goes live!
   - You're added to contributors list 🎉

---

## 🐛 Issue Reporting

### Before Opening an Issue

- [ ] Search [existing issues](https://github.com/chf3198/copilot-handoff/issues)
- [ ] Check [discussions](https://github.com/chf3198/copilot-handoff/discussions)
- [ ] Read the [documentation](README.md)
- [ ] Try latest version

### Bug Reports

Use the [Bug Report template](https://github.com/chf3198/copilot-handoff/issues/new?template=bug_report.md):

**Required Information:**
- VS Code version
- Extension version
- Operating System
- Steps to reproduce
- Expected vs actual behavior
- Error messages from Developer Console

**Good Bug Report Example:**
```markdown
**Bug:** Timer doesn't reset after clicking "Reset Session"

**Environment:**
- VS Code: 1.85.0
- Extension: 0.1.0
- OS: Windows 11

**Steps:**
1. Let timer run for 10 minutes
2. Click "Reset Session" in notification
3. Check status bar

**Expected:** Timer shows "0m"
**Actual:** Timer shows "10m"

**Console Errors:**
```
TypeError: undefined is not a function
  at SessionTracker.reset (extension.js:45)
```
```

### Feature Requests

Use the [Feature Request template](https://github.com/chf3198/copilot-handoff/issues/new?template=feature_request.md):

**Include:**
- Clear description
- Use case / problem it solves
- Proposed solution
- Alternatives considered
- Willingness to contribute

---

## 💬 Community

### Getting Help

- 📖 **Documentation** - [README](README.md), [Quick Start](QUICKSTART.md)
- 💬 **Discussions** - [GitHub Discussions](https://github.com/chf3198/copilot-handoff/discussions)
- 🐛 **Issues** - [GitHub Issues](https://github.com/chf3198/copilot-handoff/issues)

### Code of Conduct

We follow the [Contributor Covenant Code of Conduct](.github/CODE_OF_CONDUCT.md).

**TL;DR:**
- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community

### Recognition

Contributors are:
- Added to [CONTRIBUTORS.md](.github/CONTRIBUTORS.md)
- Mentioned in release notes
- Appreciated in every way! ❤️

---

## 📚 Additional Resources

### Development

- [VS Code Extension API](https://code.visualstudio.com/api)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Testing Extensions](https://code.visualstudio.com/api/working-with-extensions/testing-extension)

### Project-Specific

- [Architecture Overview](PROJECT_STATUS.md)
- [Roadmap](.github/ROADMAP.md)
- [Testing Guide](TESTING.md)
- [Publishing Guide](PUBLISHING.md)

---

## ❓ FAQ

<details>
<summary><strong>I'm new to open source. Where do I start?</strong></summary>

Start with issues labeled [`good first issue`](https://github.com/chf3198/copilot-handoff/labels/good%20first%20issue). These are beginner-friendly and well-documented.

</details>

<details>
<summary><strong>How long does PR review take?</strong></summary>

We aim to respond within 48-72 hours. Larger changes may take longer. Be patient - we're a small team!

</details>

<details>
<summary><strong>Can I work on an issue that's assigned?</strong></summary>

Please ask first! Comment on the issue to avoid duplicate work.

</details>

<details>
<summary><strong>My build is failing. Help?</strong></summary>

Common fixes:
- Delete `node_modules` and `out` folders
- Run `npm install --no-bin-links` again
- Restart VS Code
- Check Node.js version (need 18+)

</details>

---

<div align="center">

## 🎉 Thank You!

Every contribution, no matter how small, makes a difference.

**Ready to contribute?** Pick an issue and dive in!

[![Good First Issues](https://img.shields.io/github/issues/chf3198/copilot-handoff/good%20first%20issue?style=for-the-badge&label=Good%20First%20Issues)](https://github.com/chf3198/copilot-handoff/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

**Questions?** Don't hesitate to ask in [Discussions](https://github.com/chf3198/copilot-handoff/discussions)!

---

**Made with ❤️ by contributors like you**

</div>

By contributing, you agree that your contributions will be licensed under the MIT License.
