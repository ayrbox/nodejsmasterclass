/**
 * Command Handlers
 * */

const exitHandler = require('./exitHandler');
const makeHelpHandler = require('./helpHandler');
const statsHandler = require('./statsHandler');

// TODO: remove handler
const handler = function (command, args) {
  console.log(`TODO: Command (${command}) not implemented yet.`);
};

const commands = [
  {
    command: 'help',
    description: 'Help for cli.',
  },
  {
    command: 'man',
    description: 'Alias for help.',
  },
  {
    command: 'exit',
    description: 'Exit application',
    handler: exitHandler,
  },
  {
    command: 'stats',
    description:
      'Get statistics on the underlying operating system and resource utilization.',
    handler: statsHandler,
  },
  {
    command: 'users',
    description:
      'List user information of registered users. Option --userId <EMAIL> provide information for specified user.',
    handler,
  },
  {
    command: 'checks',
    description:
      'Show list of all active checks in the system, including their state. Options: --up --down --id <CHECKID> Shows details for specified check id.',
    handler,
  },
  {
    command: 'logs',
    description: 'List logs files.',
    handler,
  },
];

// Special kind handle which need to read command and descripton
// Handle function is attached to command when exporting modules
const helpHandler = makeHelpHandler(commands);
const HELP_COMMANDS = ['man', 'help'];

module.exports = commands.map(_ => {
  if (HELP_COMMANDS.includes(_.command)) {
    return {
      ..._,
      handler: helpHandler,
    };
  } else {
    return _;
  }
});
