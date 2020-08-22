/* Returns true if given string is palindome */

module.exports = function (value) {
  if (typeof value !== 'string') {
    throw new TypeError('Value should be string.');
  }

  const reverse = value.split('').join('');

  return value === reverse;
};
