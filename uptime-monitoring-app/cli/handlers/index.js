/**
 * Command Handlers
 * */

const exitHandler = require('./exitHandler');
const makeHelpHandler = require('./helpHandler');

// TODO: remove handler
const handler = function (command, args) {
  console.log(`TODO: Command (${command}) not implemented yet.`);
};

const commands = [
  {
    command: 'help',
    description: 'Help for cli',
  },
  {
    command: 'man',
    description: 'Man page for cli',
  },
  {
    command: 'exit',
    description: 'Exit application',
    handler: exitHandler,
  },
  {
    command: 'stats',
    description: 'Provides stats for application running.',
    handler,
  },
  {
    command: 'users',
    description:
      'List user information of registered users. Option --id <EMAIL> provide information for specified user.',
    handler,
  },
  {
    command: 'checks',
    description:
      'List all info for all the checks. Option --id <ID> provides information for specified check.',
    handler,
  },
  {
    command: 'logs',
    description: 'List logs.',
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
