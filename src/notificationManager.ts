import * as vscode from 'vscode';
import { SessionTracker } from './sessionTracker';

export class NotificationManager {
    private readonly context: vscode.ExtensionContext;
    private readonly sessionTracker: SessionTracker;
    private monitorTimer: NodeJS.Timeout | undefined;
    private lastNotificationTime: number = 0;
    private hasShownInitialNotification: boolean = false;

    constructor(context: vscode.ExtensionContext, sessionTracker: SessionTracker) {
        this.context = context;
        this.sessionTracker = sessionTracker;
        
        // Restore notification state
        this.lastNotificationTime = context.globalState.get<number>('lastNotificationTime', 0);
        this.hasShownInitialNotification = context.globalState.get<boolean>('hasShownInitialNotification', false);
    }

    public startMonitoring() {
        // Check every minute
        this.monitorTimer = setInterval(() => {
            this.checkAndNotify();
        }, 60000);

        // Initial check after a short delay
        setTimeout(() => this.checkAndNotify(), 5000);
    }

    private checkAndNotify() {
        const config = vscode.workspace.getConfiguration('copilot-handoff');
        const trackingEnabled = config.get<boolean>('trackingEnabled', true);
        
        if (!trackingEnabled) {
            return;
        }

        const threshold = config.get<number>('sessionThresholdMinutes', 30);
        const frequency = config.get<string>('notificationFrequency', 'periodic');
        const periodicInterval = config.get<number>('periodicReminderMinutes', 10);
        
        if (frequency === 'never') {
            return;
        }

        const duration = this.sessionTracker.getSessionDuration();
        
        if (duration < threshold) {
            // Reset notification state if session is below threshold
            if (this.hasShownInitialNotification) {
                this.hasShownInitialNotification = false;
                this.saveNotificationState();
            }
            return;
        }

        const now = Date.now();
        const timeSinceLastNotification = (now - this.lastNotificationTime) / (1000 * 60); // in minutes

        // Determine if we should show notification
        let shouldNotify = false;

        if (frequency === 'once' && !this.hasShownInitialNotification) {
            shouldNotify = true;
        } else if (frequency === 'periodic' && timeSinceLastNotification >= periodicInterval) {
            shouldNotify = true;
        }

        if (shouldNotify) {
            this.showHandoffReminder(duration, threshold);
        }
    }

    private async showHandoffReminder(duration: number, threshold: number) {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        const durationText = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

        const message = `⏰ Copilot session has been active for ${durationText} (threshold: ${threshold}m). Consider performing a context handoff for better results.`;
        
        const action = await vscode.window.showWarningMessage(
            message,
            'Export Context',
            'Reset Session',
            'Remind Later',
            'Disable Reminders'
        );

        // Update notification time and state
        this.lastNotificationTime = Date.now();
        this.hasShownInitialNotification = true;
        this.saveNotificationState();

        // Handle user action
        if (action === 'Export Context') {
            await vscode.commands.executeCommand('copilot-handoff.exportContext');
        } else if (action === 'Reset Session') {
            await vscode.commands.executeCommand('copilot-handoff.resetSession');
        } else if (action === 'Disable Reminders') {
            const config = vscode.workspace.getConfiguration('copilot-handoff');
            await config.update('notificationFrequency', 'never', vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage('Handoff reminders disabled. You can re-enable them in settings.');
        }
        // 'Remind Later' does nothing - will remind again based on periodic interval
    }

    private saveNotificationState() {
        this.context.globalState.update('lastNotificationTime', this.lastNotificationTime);
        this.context.globalState.update('hasShownInitialNotification', this.hasShownInitialNotification);
    }

    public dispose() {
        if (this.monitorTimer) {
            clearInterval(this.monitorTimer);
        }
    }
}
