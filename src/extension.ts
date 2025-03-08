// TODO: We'll be using the Webview API to create our extension's regex playground.
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import * as vscode from "vscode";

// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "regexer" is now active!');
	console.log(context.extensionPath);
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand(
		"regexer.helloWorld",
		() => {
			// The code you place here will be executed every time your command is executed
			// Display a message box to the user
			vscode.window.showInformationMessage("Hello World from Bran!");
		},
	);

	context.subscriptions.push(disposable);

	context.subscriptions.push(
		vscode.commands.registerCommand("regexer.startRegexer", async () => {
			const panel = vscode.window.createWebviewPanel(
				"regexer",
				"Regexer",
				vscode.ViewColumn.One,
				{ enableScripts: true },
			);

			panel.webview.html = await getWebviewContent(context.extensionPath);
		}),
	);
}

// This method is called when your extension is deactivated
export function deactivate() {}
async function getWebviewContent(extensionPath: string) {
	const blob = await readFile(path.join(extensionPath, "ui/dist/index.html"));

	const html = blob.toLocaleString();
	console.log(html);

	return html;
}
