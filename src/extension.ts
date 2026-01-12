import * as vscode from 'vscode';

let messageCount = 0;
let statusBarItem: vscode.StatusBarItem;
let sessionStartTime: Date;
let lastWarningCount = 0;

export function activate(context: vscode.ExtensionContext) {
    console.log('Copilot Session Health extension is now active');

    // Initialize session tracking
    sessionStartTime = new Date();
    
    // Restore message count from workspace state
    messageCount = context.workspaceState.get('copilot.messageCount', 0);
    
    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'copilot-handoff.exportSessionSummary';
    context.subscriptions.push(statusBarItem);
    
    // Update status bar
    updateStatusBar();
    
    // Register commands
    const exportCommand = vscode.commands.registerCommand(
        'copilot-handoff.exportSessionSummary',
        () => exportSessionSummary(context)
    );
    
    const resetCommand = vscode.commands.registerCommand(
        'copilot-handoff.resetSessionCount',
        () => resetSessionCount(context)
    );
    
    context.subscriptions.push(exportCommand, resetCommand);
    
    // Track chat panel changes
    setupChatTracking(context);
    
    // Listen to configuration changes
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('copilot-handoff')) {
                updateStatusBar();
            }
        })
    );
}

function setupChatTracking(context: vscode.ExtensionContext) {
    // Track when chat messages are sent
    // VS Code doesn't have a direct API for Copilot chat events yet,
    // so we'll use text document changes as a proxy
    // This tracks user interactions with the editor
    
    const disposable = vscode.workspace.onDidChangeTextDocument(event => {
        const config = vscode.workspace.getConfiguration('copilot-handoff');
        const enableTracking = config.get<boolean>('enableTracking', true);
        
        if (!enableTracking) {
            return;
        }
        
        // Check if this is a chat-related document or user-initiated change
        if (event.contentChanges.length > 0 && event.document.uri.scheme !== 'output') {
            // Increment on substantial changes (heuristic)
            const hasSubstantialChange = event.contentChanges.some(
                change => change.text.length > 10 || change.rangeLength > 10
            );
            
            if (hasSubstantialChange) {
                incrementMessageCount(context);
            }
        }
    });
    
    context.subscriptions.push(disposable);
}

function incrementMessageCount(context: vscode.ExtensionContext) {
    messageCount++;
    context.workspaceState.update('copilot.messageCount', messageCount);
    updateStatusBar();
    checkThreshold();
}

function updateStatusBar() {
    const config = vscode.workspace.getConfiguration('copilot-handoff');
    const showStatusBar = config.get<boolean>('showStatusBar', true);
    
    if (!showStatusBar) {
        statusBarItem.hide();
        return;
    }
    
    const threshold = config.get<number>('messageThreshold', 20);
    const icon = messageCount >= threshold ? '$(warning)' : '$(comment-discussion)';
    
    statusBarItem.text = `${icon} Chat: ${messageCount}`;
    statusBarItem.tooltip = `Copilot chat exchanges: ${messageCount}\nThreshold: ${threshold}\nClick to export session summary`;
    
    if (messageCount >= threshold) {
        statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
    } else {
        statusBarItem.backgroundColor = undefined;
    }
    
    statusBarItem.show();
}

function checkThreshold() {
    const config = vscode.workspace.getConfiguration('copilot-handoff');
    const threshold = config.get<number>('messageThreshold', 20);
    
    // Only warn once at each threshold crossing
    if (messageCount >= threshold && lastWarningCount < threshold) {
        lastWarningCount = messageCount;
        
        vscode.window.showWarningMessage(
            `You've sent ${messageCount} messages in this Copilot chat session. Context may degrade. Consider starting a fresh chat session.`,
            'Export Summary',
            'Reset Count',
            'Dismiss'
        ).then(selection => {
            if (selection === 'Export Summary') {
                vscode.commands.executeCommand('copilot-handoff.exportSessionSummary');
            } else if (selection === 'Reset Count') {
                vscode.commands.executeCommand('copilot-handoff.resetSessionCount');
            }
        });
    }
}

async function exportSessionSummary(_context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('copilot-handoff');
    const threshold = config.get<number>('messageThreshold', 20);
    
    const duration = getDurationString();
    
    const summary = `# Copilot Chat Session Summary

**Session Start**: ${sessionStartTime.toLocaleString()}
**Current Time**: ${new Date().toLocaleString()}
**Duration**: ${duration}
**Message Count**: ${messageCount}
**Threshold**: ${threshold}
**Status**: ${messageCount >= threshold ? '⚠️ Warning - Consider fresh session' : '✅ Healthy'}

## Context Handoff Notes

Use this information when starting a new Copilot chat session:

- Total exchanges in this session: ${messageCount}
- Session has been active for: ${duration}
${messageCount >= threshold ? '- ⚠️ Context window may be degraded\n' : ''}
## Recommendations

${messageCount >= threshold 
    ? '- Start a new chat session to maintain context quality\n- Summarize key decisions and current state in the new session\n- Reference important code snippets from this session'
    : '- Session is healthy, continue working\n- Monitor message count as you approach the threshold'
}

---
*Generated by Copilot Session Health extension*
`;

    // Create new untitled document with summary
    const doc = await vscode.workspace.openTextDocument({
        content: summary,
        language: 'markdown'
    });
    
    await vscode.window.showTextDocument(doc);
    
    vscode.window.showInformationMessage('Session summary exported successfully!');
}

function resetSessionCount(context: vscode.ExtensionContext) {
    messageCount = 0;
    sessionStartTime = new Date();
    lastWarningCount = 0;
    context.workspaceState.update('copilot.messageCount', messageCount);
    updateStatusBar();
    vscode.window.showInformationMessage('Chat session count reset successfully!');
}

function getDurationString(): string {
    const now = new Date();
    const diffMs = now.getTime() - sessionStartTime.getTime();
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else {
        return `${minutes}m`;
    }
}

export function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
}
