const SCREEN_WIDTH = process.stdout.columns;

const printHorizonatalLine = require('./printHorizontalLine')(SCREEN_WIDTH);
const printTitle = require('./printTitle')(SCREEN_WIDTH);
const toTitleCase = require('./toTitleCase');
const padSpace = require('./padSpace');

module.exports = {
  printHorizonatalLine,
  printTitle,
  toTitleCase,
  padSpace,
};
