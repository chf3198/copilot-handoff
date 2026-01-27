import * as vscode from 'vscode';

export class SessionTracker {
    private sessionStartTime: number;
    private lastActivityTime: number;
    private activityTimer: NodeJS.Timeout | undefined;
    private readonly ACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes of inactivity resets session
    private readonly context: vscode.ExtensionContext;
    private listeners: vscode.Disposable[] = [];

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        
        // Restore previous session or start new one
        const savedStartTime = context.globalState.get<number>('sessionStartTime');
        const savedLastActivity = context.globalState.get<number>('lastActivityTime');
        
        const now = Date.now();
        if (savedLastActivity && (now - savedLastActivity) < this.ACTIVITY_TIMEOUT) {
            // Continue previous session
            this.sessionStartTime = savedStartTime || now;
            this.lastActivityTime = now;
        } else {
            // Start new session
            this.sessionStartTime = now;
            this.lastActivityTime = now;
        }
        
        this.saveState();
    }

    public startTracking() {
        const config = vscode.workspace.getConfiguration('copilot-handoff');
        if (!config.get<boolean>('trackingEnabled', true)) {
            return;
        }

        // Track various editor activities
        this.listeners.push(
            vscode.workspace.onDidChangeTextDocument(() => this.recordActivity())
        );
        
        this.listeners.push(
            vscode.window.onDidChangeActiveTextEditor(() => this.recordActivity())
        );
        
        this.listeners.push(
            vscode.commands.registerCommand('workbench.panel.chat.view.copilot.focus', () => {
                this.recordActivity();
            })
        );

        // Monitor for Copilot chat interactions
        // Note: This monitors general editor activity as a proxy for Copilot usage
        // since direct Copilot Chat API events may not be fully accessible
        this.listeners.push(
            vscode.window.onDidChangeWindowState(state => {
                if (state.focused) {
                    this.recordActivity();
                }
            })
        );

        this.startActivityTimer();
    }

    private recordActivity() {
        const config = vscode.workspace.getConfiguration('copilot-handoff');
        if (!config.get<boolean>('trackingEnabled', true)) {
            return;
        }

        const now = Date.now();
        const timeSinceLastActivity = now - this.lastActivityTime;

        // If inactive for too long, reset session
        if (timeSinceLastActivity > this.ACTIVITY_TIMEOUT) {
            this.resetSession();
        } else {
            this.lastActivityTime = now;
            this.saveState();
        }

        this.resetActivityTimer();
    }

    private startActivityTimer() {
        this.activityTimer = setInterval(() => {
            const now = Date.now();
            const timeSinceLastActivity = now - this.lastActivityTime;
            
            if (timeSinceLastActivity > this.ACTIVITY_TIMEOUT) {
                this.resetSession();
            }
        }, 60000); // Check every minute
    }

    private resetActivityTimer() {
        if (this.activityTimer) {
            clearInterval(this.activityTimer);
        }
        this.startActivityTimer();
    }

    public resetSession() {
        const now = Date.now();
        this.sessionStartTime = now;
        this.lastActivityTime = now;
        this.saveState();
    }

    public getSessionDuration(): number {
        const now = Date.now();
        const durationMs = now - this.sessionStartTime;
        return Math.floor(durationMs / (1000 * 60)); // Return minutes
    }

    public getSessionStartTime(): Date {
        return new Date(this.sessionStartTime);
    }

    private saveState() {
        this.context.globalState.update('sessionStartTime', this.sessionStartTime);
        this.context.globalState.update('lastActivityTime', this.lastActivityTime);
    }

    public dispose() {
        if (this.activityTimer) {
            clearInterval(this.activityTimer);
        }
        this.listeners.forEach(listener => listener.dispose());
    }
}
