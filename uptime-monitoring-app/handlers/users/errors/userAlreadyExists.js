class UserAlreadyExists extends Error {
  constructor() {
    super('User already exists.');
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = UserAlreadyExists;