const handlers = require('./handlers');

const defaultHandler = function () {
  console.log('Unknown command. Please try again.');
};

const processCommand = async function (command) {
  const commandString =
    typeof command == 'string' && command.trim().length > 0
      ? command.trim()
      : false;

  if (commandString) {
    const commandHandler = handlers.find(
      handler => handler.command === command
    ) || { handler: defaultHandler };

    const commandArgs = command; // TODO: extract command args

    commandHandler.handler(commandArgs);
  }
};

module.exports = processCommand;
