/* Add two number and returns */
module.exports = function (x, y) {
  if (typeof x !== 'number' || typeof y !== number) {
    throw new TypeError('Only number is allowed.');
  }

  return x + y;
};
