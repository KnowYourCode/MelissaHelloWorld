// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const superagent = require('superagent');

function getDadJoke(){
  const URL = "https://icanhazdadjoke.com/";
  superagent.get(URL)
  .set('Accept', 'application/json')
  .then(result => {
    console.log(`inside jokes: ${JSON.stringify(result.body.joke)}`);
  })
  .catch(error => console.error(error));
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', function () {
    // The code you place here will be executed every time your command is executed
    // const startTime = new Date();
    console.log("starting timer...");
    function calculateDifference(start){
      const currentTime = new Date();
      console.log(`inside timer, time spent: ${currentTime - start}`);
    }
    getDadJoke();
    // context.workspaceState.update("storageKey", startTime);
    console.log("inside context...");
    console.log(context.workspaceState.get("storageKey"));
    let startTime = context.workspaceState.get("storageKey");
    setTimeout(calculateDifference,2000, startTime);
    // Display a message box to the user
    
    // fetch("https://icanhazdadjoke.com/")
    // .then(result => {
    //   console.log(result.json());
    // })
    // .catch(error => console.error(error));

		vscode.window.showInformationMessage('Hello VS World!');
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
