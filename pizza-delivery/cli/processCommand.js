const handlers = require('./handlers');

const extractOptionValue = function ({ command, pattern }) {
  const regEx = new RegExp(pattern);
  const match = command.match(regEx, 'g');

  if (match) {
    const [, value] = match;
    return value.match(/--[^\s]+/, 'g') ? true : value;
  } else {
    return true;
  }
};

function extractCommandWithOptions(commandString) {
  const [command] = commandString.split(/\s/);
  const regEx = /--([^\s]+)\s?/g;

  let match;
  const options = {};
  while ((match = regEx.exec(commandString))) {
    const [, option] = match;

    const value = extractOptionValue({
      command: commandString,
      pattern: `--${option}\\s([^\\s]+)\\s?`,
    });
    options[option] = value;
  }
  return [command, options];
}

const defaultHandler = function (command) {
  console.log(`Unknown command "${command}". Please try again.`);
};

const processCommand = async function (rawCommand) {
  const commandString =
    typeof rawCommand == 'string' && rawCommand.trim().length > 0
      ? rawCommand.trim()
      : false;

  if (!commandString) {
    return;
  }

  const [command, options] = extractCommandWithOptions(commandString);

  const commandHandler = handlers.find(
    handler => handler.command === command
  ) || {
    handler: defaultHandler,
  };

  commandHandler.handler(command, options);
};

module.exports = processCommand;
