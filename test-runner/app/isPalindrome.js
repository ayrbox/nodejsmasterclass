/* Returns true if given string is palindome */

module.exports = function (value) {
  if (typeof value !== 'string') {
    throw new TypeError('Value should be string.');
  }

  const reverse = value.split('').reverse().join('');

  return value.toLowerCase() === reverse.toLowerCase();
};
