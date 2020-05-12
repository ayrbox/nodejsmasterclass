const { inspect } = require('util');

class UserNotFound extends Error {
  constructor(userId) {
    super(`User already exists. ${inspect(userId)}`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = UserNotFound;
