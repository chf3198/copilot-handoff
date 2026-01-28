import * as vscode from 'vscode';
import { SessionTracker } from './sessionTracker';
import { NotificationManager } from './notificationManager';
import { ContextExporter } from './contextExporter';

let sessionTracker: SessionTracker;
let notificationManager: NotificationManager;
let contextExporter: ContextExporter;
let statusBarItem: vscode.StatusBarItem;
let handoffParticipant: vscode.ChatParticipant;

export function activate(context: vscode.ExtensionContext) {
    console.log('Copilot Handoff extension is now active');

    // Initialize components
    sessionTracker = new SessionTracker(context);
    notificationManager = new NotificationManager(context, sessionTracker);
    contextExporter = new ContextExporter();

    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'copilot-handoff.checkChatHealth';
    context.subscriptions.push(statusBarItem);

    // Register @handoff chat participant
    handoffParticipant = vscode.chat.createChatParticipant('handoff', handleChatRequest);
    handoffParticipant.iconPath = vscode.Uri.file(context.asAbsolutePath('images/icon.png'));
    context.subscriptions.push(handoffParticipant);

    // Register commands
    context.subscriptions.push(
        vscode.commands.registerCommand('copilot-handoff.checkChatHealth', () => {
            checkChatHealth();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('copilot-handoff.showSessionInfo', () => {
            showSessionInfo();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('copilot-handoff.exportContext', async () => {
            await contextExporter.exportContext();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('copilot-handoff.resetSession', () => {
            sessionTracker.resetSession();
            vscode.window.showInformationMessage('Session timer reset');
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('copilot-handoff.toggleTracking', () => {
            const config = vscode.workspace.getConfiguration('copilot-handoff');
            const currentState = config.get<boolean>('trackingEnabled', true);
            config.update('trackingEnabled', !currentState, vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage(
                `Session tracking ${!currentState ? 'enabled' : 'disabled'}`
            );
        })
    );

    // Start tracking
    sessionTracker.startTracking();
    notificationManager.startMonitoring();
    updateStatusBar();

    // Update status bar periodically
    const statusBarTimer = setInterval(() => {
        updateStatusBar();
    }, 60000); // Update every minute

    context.subscriptions.push({
        dispose: () => clearInterval(statusBarTimer)
    });

    // Listen for configuration changes
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('copilot-handoff')) {
                updateStatusBar();
            }
        })
    );
}

function updateStatusBar() {
    const config = vscode.workspace.getConfiguration('copilot-handoff');
    const showStatusBar = config.get<boolean>('showStatusBar', true);

    if (!showStatusBar) {
        statusBarItem.hide();
        return;
    }

    statusBarItem.text = '$(pulse) Check Chat Health';
    statusBarItem.tooltip = 'Click to analyze your Copilot chat context quality';
    statusBarItem.show();
}

function showSessionInfo() {
    const duration = sessionTracker.getSessionDuration();
    const config = vscode.workspace.getConfiguration('copilot-handoff');
    const threshold = config.get<number>('sessionThresholdMinutes', 30);
    
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    
    let message = `Session Duration: ${hours > 0 ? `${hours}h ` : ''}${minutes}m\n`;
    message += `Threshold: ${threshold}m\n`;
    
    if (duration >= threshold) {
        message += '\n⚠️ Consider performing a context handoff';
    }

    vscode.window.showInformationMessage(message, 'Export Context', 'Reset Session').then(selection => {
        if (selection === 'Export Context') {
            vscode.commands.executeCommand('copilot-handoff.exportContext');
        } else if (selection === 'Reset Session') {
            vscode.commands.executeCommand('copilot-handoff.resetSession');
        }
    });
}

function checkChatHealth() {
    // Open chat panel with @handoff pre-filled
    vscode.commands.executeCommand('workbench.action.chat.open', {
        query: '@handoff analyze'
    });
}

async function handleChatRequest(
    request: vscode.ChatRequest,
    context: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken
): Promise<void> {
    const command = request.command || 'analyze';

    try {
        if (command === 'analyze') {
            await analyzeChatHealth(request, context, stream);
        } else if (command === 'export') {
            await exportChatContext(request, context, stream);
        } else {
            stream.markdown(`Unknown command: ${command}\n\nAvailable commands:\n- \`@handoff analyze\` - Analyze chat health\n- \`@handoff export\` - Export context for handoff`);
        }
    } catch (error) {
        stream.markdown(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

async function analyzeChatHealth(
    request: vscode.ChatRequest,
    context: vscode.ChatContext,
    stream: vscode.ChatResponseStream
): Promise<void> {
    stream.progress('Analyzing chat health...');

    const messageCount = context.history.length;
    const recentMessages = context.history.slice(-10);

    // Count tokens if model supports it
    let estimatedTokens = 0;
    try {
        if (request.model && 'countTokens' in request.model) {
            const fullHistory = context.history.map(turn => {
                if (turn instanceof vscode.ChatRequestTurn) {
                    return turn.prompt;
                } else if (turn instanceof vscode.ChatResponseTurn) {
                    return turn.response.map(r => r.value).join('');
                }
                return '';
            }).join('\n');
            estimatedTokens = await request.model.countTokens(fullHistory);
        }
    } catch (e) {
        // Token counting not available
    }

    // Calculate health score
    let healthScore = 100;
    const issues: string[] = [];

    // Message count factor (degrade after 20 messages)
    if (messageCount > 20) {
        const penalty = Math.min(30, (messageCount - 20) * 2);
        healthScore -= penalty;
        issues.push(`📊 **High message count**: ${messageCount} messages (optimal: <20)`);
    }

    // Token estimate factor (if available)
    if (estimatedTokens > 0) {
        if (estimatedTokens > 8000) {
            healthScore -= 25;
            issues.push(`🔤 **Token limit concern**: ~${estimatedTokens.toLocaleString()} tokens (approaching context window limit)`);
        } else if (estimatedTokens > 4000) {
            healthScore -= 10;
            issues.push(`🔤 **Moderate token usage**: ~${estimatedTokens.toLocaleString()} tokens`);
        }
    }

    // Calculate health status
    let healthEmoji = '✅';
    let healthLabel = 'Excellent';
    let recommendation = 'Your chat is in good health. Continue working!';

    if (healthScore < 50) {
        healthEmoji = '🔴';
        healthLabel = 'Poor';
        recommendation = '**⚠️ Immediate handoff recommended!** Context degradation is likely affecting response quality.';
    } else if (healthScore < 70) {
        healthEmoji = '🟡';
        healthLabel = 'Fair';
        recommendation = '**Consider a handoff soon.** Chat quality may start to degrade.';
    } else if (healthScore < 90) {
        healthEmoji = '🟢';
        healthLabel = 'Good';
        recommendation = 'Chat is healthy, but monitor for quality degradation.';
    }

    // Build response
    stream.markdown(`# ${healthEmoji} Chat Health Report\n\n`);
    stream.markdown(`**Overall Score**: ${Math.round(healthScore)}/100 (${healthLabel})\n\n`);
    
    stream.markdown(`## Metrics\n`);
    stream.markdown(`- **Messages in this chat**: ${messageCount}\n`);
    if (estimatedTokens > 0) {
        stream.markdown(`- **Estimated tokens**: ~${estimatedTokens.toLocaleString()}\n`);
    }
    stream.markdown(`\n`);

    if (issues.length > 0) {
        stream.markdown(`## Issues Detected\n`);
        issues.forEach(issue => stream.markdown(`${issue}\n\n`));
    }

    stream.markdown(`## Recommendation\n${recommendation}\n\n`);

    if (healthScore < 70) {
        stream.button({
            command: 'copilot-handoff.exportContext',
            title: 'Export Context for Handoff'
        });
    }
}

async function exportChatContext(
    request: vscode.ChatRequest,
    context: vscode.ChatContext,
    stream: vscode.ChatResponseStream
): Promise<void> {
    stream.progress('Generating handoff context...');
    
    await contextExporter.exportContext();
    
    stream.markdown('✅ Context export initiated. Choose your preferred export method from the options shown.');
}

export function deactivate() {
    if (sessionTracker) {
        sessionTracker.dispose();
    }
    if (notificationManager) {
        notificationManager.dispose();
    }
}
