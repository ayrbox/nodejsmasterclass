module.exports = function (screenWidth) {
  return function () {
    console.log('-'.repeat(screenWidth));
  };
};
