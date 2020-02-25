const { inspect } = require('util');

class InvalidUserData extends Error {
  constructor(data) {
    super(`Invalid/Missin user data; received ${inspect(data)}`);
  }
}

module.exports = InvalidUserData;
