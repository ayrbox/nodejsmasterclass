const makeCli = function (options) {
  return {
    init: function () {
      console.log('Initializing CLI app');
    },
  };
};

module.exports = makeCli;
