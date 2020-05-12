const makePing = require('./ping');

const makePingHandlers = function () {
  return {
    ping: makePing(),
  };
};

module.exports = makePingHandlers;
