import * as vscode from 'vscode';
import { SessionTracker } from './sessionTracker';
import { NotificationManager } from './notificationManager';
import { ContextExporter } from './contextExporter';

let sessionTracker: SessionTracker;
let notificationManager: NotificationManager;
let contextExporter: ContextExporter;
let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
    console.log('Copilot Handoff extension is now active');

    // Initialize components
    sessionTracker = new SessionTracker(context);
    notificationManager = new NotificationManager(context, sessionTracker);
    contextExporter = new ContextExporter();

    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'copilot-handoff.showSessionInfo';
    context.subscriptions.push(statusBarItem);

    // Register commands
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
    const trackingEnabled = config.get<boolean>('trackingEnabled', true);

    if (!showStatusBar || !trackingEnabled) {
        statusBarItem.hide();
        return;
    }

    const duration = sessionTracker.getSessionDuration();
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    
    let text = '$(clock) ';
    if (hours > 0) {
        text += `${hours}h ${minutes}m`;
    } else {
        text += `${minutes}m`;
    }

    statusBarItem.text = text;
    statusBarItem.tooltip = `Copilot session duration: ${text.replace('$(clock) ', '')}\nClick for details`;
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

export function deactivate() {
    if (sessionTracker) {
        sessionTracker.dispose();
    }
    if (notificationManager) {
        notificationManager.dispose();
    }
}
