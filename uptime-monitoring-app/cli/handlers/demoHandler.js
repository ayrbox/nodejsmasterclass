const childProcess = require('child_process');

const { printTitle } = require('../utils');

const checksHandler = function (_, options) {
  printTitle('Demo: `find` command using child process');
  const find = childProcess.spawn('find', ['./.data']);
  find.stdout.on('data', function (data) {
    console.log('data', data.toString());
  });
};

module.exports = checksHandler;
