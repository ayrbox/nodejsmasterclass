const readline = require('readline');
const processCommand = require('./processCommand');

const makeCli = function ({ logger }) {
  return {
    init: function () {
      logger.info('CLI is running');

      const _interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '$ ->',
      });

      // Create initital prompt
      _interface.prompt();
      _interface.on('line', function (str) {
        processCommand(str);
      });

      _interface.on('close', function () {
        logger.fatal('\nExiting application.');
        process.exit(0);
      });
    },
  };
};

module.exports = makeCli;
