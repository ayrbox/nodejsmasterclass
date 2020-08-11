const SCREEN_WIDTH = process.stdout.columns;

const printHorizonatalLine = function () {
  console.log('-'.repeat(SCREEN_WIDTH));
};

const printTitle = function () {
  printHorizonatalLine();
  console.log('UPTIME MONITORING - MANUAL');
  printHorizonatalLine();
};

const makeHelpHandler = function (commands) {
  return function () {
    printTitle();
    commands.forEach(({ command, description }) => {
      console.log(`${command.padEnd(15, ' ')}    ${description}`);
    });
    printHorizonatalLine();
  };
};

module.exports = makeHelpHandler;
