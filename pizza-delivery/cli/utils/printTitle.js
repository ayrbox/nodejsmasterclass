const makePrintHorizonatalLine = require('./printHorizontalLine');

module.exports = function (screenWidth) {
  const printHorizontalLine = makePrintHorizonatalLine(screenWidth);

  return function (title) {
    printHorizontalLine();
    console.log(title);
    printHorizontalLine();
  };
};
