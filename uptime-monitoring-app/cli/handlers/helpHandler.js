const makeHelpHandler = function (commands) {
  return function () {
    commands.forEach(({ command, description }) => {
      console.log(`${command.padEnd(15, ' ')}    ${description}`);
    });
  };
};

module.exports = makeHelpHandler;
