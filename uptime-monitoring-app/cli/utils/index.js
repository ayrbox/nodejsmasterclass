const SCREEN_WIDTH = process.stdout.columns;

const printHorizonatalLine = require('./printHorizontalLine')(SCREEN_WIDTH);

const printTitle = require('./printTitle')(SCREEN_WIDTH);

module.exports = {
  printHorizonatalLine,
  printTitle,
};
