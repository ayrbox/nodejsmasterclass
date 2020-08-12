const { printHorizonatalLine, printTitle } = require('../utils');

const makeHelpHandler = function (commands) {
  return function () {
    printTitle('UPTIME MONITORING - MANUAL');
    commands.forEach(({ command, description }) => {
      console.log(`${command.padEnd(15, ' ')}    ${description}`);
    });
    printHorizonatalLine();
  };
};

module.exports = makeHelpHandler;
