const createRandomString = function(length) {
  const size = typeof(length) === 'number' && length > 0 && length;
  if (!size) {
    return false;
  }

  const CHARACTERS = 'abcdefghijklmnopqrstuvwxyz1234567890';
  return new Array(size).fill(
    () => CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length))
  ).map(f => f()).join('');
}

module.exports = createRandomString;