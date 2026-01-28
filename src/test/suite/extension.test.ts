import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Extension should be present', () => {
        assert.ok(vscode.extensions.getExtension('curtisfranks.copilot-handoff'));
    });

    test('Extension should activate', async () => {
        const ext = vscode.extensions.getExtension('curtisfranks.copilot-handoff');
        assert.ok(ext);
        await ext?.activate();
        assert.strictEqual(ext?.isActive, true);
    });

    test('Commands should be registered', async () => {
        const commands = await vscode.commands.getCommands();
        const extensionCommands = [
            'copilot-handoff.checkChatHealth',
            'copilot-handoff.showSessionInfo',
            'copilot-handoff.exportContext',
            'copilot-handoff.resetSession',
            'copilot-handoff.toggleTracking'
        ];

        extensionCommands.forEach(cmd => {
            assert.ok(commands.includes(cmd), `Command ${cmd} should be registered`);
        });
    });

    test('Configuration should have default values', () => {
        const config = vscode.workspace.getConfiguration('copilot-handoff');
        
        assert.strictEqual(config.get('sessionThresholdMinutes'), 30);
        assert.strictEqual(config.get('notificationFrequency'), 'periodic');
        assert.strictEqual(config.get('periodicReminderMinutes'), 10);
        assert.strictEqual(config.get('autoExportContext'), false);
        assert.strictEqual(config.get('showStatusBar'), true);
        assert.strictEqual(config.get('trackingEnabled'), true);
    });
});
