const { hash } = require("../../lib/cryptoHash");

const makeCreateUser = function ({ db, logger }) {
  return function ({ payload }, responseCallback) {
    const { name, email, phone, address, password } = payload; // TODO: validate users data

    const hashedPassword = hash(password);

    db.create(
      email,
      {
        name,
        email,
        phone,
        address,
        password: hashedPassword
      },
      function (err) {
        if (err) {
          logger.warning(err.message);
          responseCallback(500, { message: err.message });
          return;
        }
        responseCallback(201, { message: "User created" });
      }
    );
  };
};

module.exports = makeCreateUser;
