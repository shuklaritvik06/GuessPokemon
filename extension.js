const vscode = require("vscode");
const axios = require("axios");
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "pokemon-game.guessnow",
    async function () {
      const id = Math.floor(Math.random() * 859) + 1;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}/`
      );
      const pokemon = response.data;
      const name = pokemon.name;
      const choice = await vscode.window.showQuickPick(["Abilities", "Moves"], {
        prompt: "On what basis you want to guess?",
        ignoreFocusOut: true,
        placeHolder: "Select an option",
      });
      const option = {
        prompt: "Guess the pokemon name",
        ignoreFocusOut: true,
        placeHolder: "Enter the pokemon name",
      };
      if (choice === "Abilities") {
        const abilities = pokemon.abilities.map(
          (ability) => ability.ability.name
        );
        const res = await vscode.window.showQuickPick(
          ["Ready to Guess", ...abilities],
          {
            prompt: "Guess the pokemon name",
            ignoreFocusOut: true,
            placeHolder: "Pokemon Time 🎉🎉 ",
          }
        );
        if (res === "Ready to Guess") {
          const answer = await vscode.window.showInputBox(option);
          if (answer === name) {
            vscode.window.showInformationMessage("You guessed right");
          } else {
            vscode.window.showInformationMessage("Try again :(");
          }
        }
      }
      if (choice === "Moves") {
        const moves = pokemon.moves.map((move) => move.move.name);
        const res = await vscode.window.showQuickPick(
          ["Ready to Guess", ...moves],
          {
            prompt: "Guess the pokemon name",
            ignoreFocusOut: true,
            placeHolder: "Pokemon Time 🎉🎉 ",
          }
        );
        if (res === "Ready to Guess") {
          const answer = await vscode.window.showInputBox(option);
          if (answer === name) {
            vscode.window.showInformationMessage("You guessed right");
          } else {
            vscode.window.showInformationMessage("Try again :(");
          }
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}
function deactivate() {}
module.exports = {
  activate,
  deactivate,
};
