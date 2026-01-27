# Publishing Guide

## Prerequisites

### 1. System Requirements
- Node.js 20+ (for packaging with vsce)
- Git installed and configured
- VS Code Extension Manager (vsce) installed globally or locally

### 2. Publisher Account
1. Create a Microsoft account if you don't have one
2. Go to https://marketplace.visualstudio.com/manage
3. Create a publisher account (use ID: `curtisfranks` or your preferred publisher ID)
4. Get a Personal Access Token (PAT) from Azure DevOps:
   - Go to https://dev.azure.com
   - User Settings > Personal Access Tokens
   - Create new token with "Marketplace > Manage" scope
   - Save the token securely!

## Pre-Publishing Checklist

- [ ] All code is committed to git
- [ ] Version number is correct in package.json
- [ ] CHANGELOG.md is updated with release notes
- [ ] README.md is complete and accurate
- [ ] Icon file exists at images/icon.png
- [ ] All tests pass
- [ ] No linting errors: `npm run lint`
- [ ] Extension builds successfully: `npm run compile`
- [ ] Manual testing completed (see TESTING.md)
- [ ] Repository URL in package.json is correct
- [ ] Publisher name in package.json matches your publisher ID

## Building the Extension

### On a system with Node 20+:

```bash
# Clean build
rm -rf out node_modules
npm install --no-bin-links

# Compile
npm run compile

# Package (creates .vsix file)
node node_modules/@vscode/vsce/vsce package --no-dependencies
```

This creates `copilot-handoff-0.1.0.vsix`

## Testing the Package

Before publishing, test the .vsix file:

1. Install it locally:
   ```bash
   code --install-extension copilot-handoff-0.1.0.vsix
   ```

2. Open VS Code and verify:
   - Extension appears in Extensions list
   - All features work correctly
   - No errors in console
   - Icon displays properly

3. Uninstall after testing:
   ```bash
   code --uninstall-extension curtisfranks.copilot-handoff
   ```

## Publishing to Marketplace

### First Time Setup

```bash
# Login to your publisher account
node node_modules/@vscode/vsce/vsce login curtisfranks
# Enter your Personal Access Token when prompted
```

### Publish the Extension

```bash
# Publish the current version
node node_modules/@vscode/vsce/vsce publish

# Or publish with specific version bump
node node_modules/@vscode/vsce/vsce publish minor  # 0.1.0 -> 0.2.0
node node_modules/@vscode/vsce/vsce publish patch  # 0.1.0 -> 0.1.1
node node_modules/@vscode/vsce/vsce publish major  # 0.1.0 -> 1.0.0
```

### Alternatively, publish the .vsix file directly:

1. Go to https://marketplace.visualstudio.com/manage
2. Click on your publisher
3. Click "+ New extension" > "Visual Studio Code"
4. Drag and drop the .vsix file

## After Publishing

### Verification

1. Wait 5-10 minutes for marketplace to update
2. Visit: https://marketplace.visualstudio.com/items?itemName=curtisfranks.copilot-handoff
3. Verify all information is correct:
   - Description
   - Icon
   - Screenshots (if added)
   - README content
   - Version number

### Installation Test

Test installation from marketplace:

```bash
# Search for the extension
code --list-extensions | grep copilot-handoff

# Install from marketplace
code --install-extension curtisfranks.copilot-handoff

# Verify it works
```

### Announce the Release

1. Update GitHub repository:
   - Create a release tag: `git tag v0.1.0 && git push --tags`
   - Create GitHub release with CHANGELOG notes
   - Add .vsix file as release asset

2. Share on social media/relevant communities (optional):
   - Twitter/X
   - Reddit r/vscode
   - Dev.to
   - Your blog

## Updating the Extension

### For subsequent releases:

1. Make your changes
2. Update version in package.json
3. Update CHANGELOG.md
4. Commit changes:
   ```bash
   git add .
   git commit -m "Release v0.2.0: Add new features"
   git push
   ```
5. Rebuild and publish:
   ```bash
   npm run compile
   node node_modules/@vscode/vsce/vsce publish
   ```

## Troubleshooting

### Common Issues

**"Publisher not found"**
- Create publisher at https://marketplace.visualstudio.com/manage
- Update package.json with correct publisher name

**"Cannot find module"**
- Run `npm install` again
- Verify Node.js version is 20+

**"Invalid icon"**
- Icon must be PNG format
- Recommended size: 128x128 pixels
- Check images/icon.png exists

**"README contains invalid links"**
- Use relative paths for images
- Verify all links are valid
- Test locally with `vsce package`

## Version Management

Follow semantic versioning (semver):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.2.0): New features, backwards compatible
- **PATCH** (0.1.1): Bug fixes, backwards compatible

## Marketplace Metrics

Monitor your extension's performance:

1. Go to https://marketplace.visualstudio.com/manage
2. Click on your extension
3. View:
   - Install count
   - Rating/reviews
   - Daily statistics
   - Acquisition trends

## Support and Maintenance

- Monitor GitHub issues
- Respond to user reviews
- Keep dependencies updated: `npm audit`
- Test with new VS Code versions
- Update documentation as needed

## Unpublishing (Emergency Only)

If you need to unpublish:

```bash
# Unpublish a specific version
node node_modules/@vscode/vsce/vsce unpublish curtisfranks.copilot-handoff@0.1.0

# Unpublish entire extension (careful!)
node node_modules/@vscode/vsce/vsce unpublish curtisfranks.copilot-handoff
```

Note: Unpublishing is discouraged and may be disabled for popular extensions.

## Resources

- [VS Code Extension Publishing](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Extension Marketplace](https://marketplace.visualstudio.com)
- [vsce CLI Documentation](https://github.com/microsoft/vscode-vsce)
- [Semantic Versioning](https://semver.org/)
