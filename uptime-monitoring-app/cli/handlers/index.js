/**
 * Command Handlers
 * */

const exitHandler = require('./exitHandler');

// TODO: remove handler
const handler = function (command, args) {
  console.log(`TODO: Command (${command}) not implemented yet.`);
};

module.exports = [
  {
    command: 'help',
    description: 'Help for cli',
    handler,
  },
  {
    command: 'man',
    description: 'Man page for cli',
    handler,
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
