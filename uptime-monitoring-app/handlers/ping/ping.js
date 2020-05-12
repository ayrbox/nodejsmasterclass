const makePing = () => {
  return function (data, callback) {
    callback(200, {
      message: 'PONG',
    });
  };
};

module.exports = makePing;
