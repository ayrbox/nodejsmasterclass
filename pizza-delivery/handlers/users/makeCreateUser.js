const { hash } = require("../../lib/cryptoHash");

const makeCreateUser = function({ db, logger, fileLogger }) {
  return function({ payload }, responseCallback) {
    const { name, email, phone, address, password } = payload; // TODO: validate users data

    const hashedPassword = hash(password);

    const userToCreate = {
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      signupDate: Date.now()
    };

    db.create(email, userToCreate, function(err) {
      if (err) {
        logger.warning(err.message);
        responseCallback(500, { message: err.message });
        return;
      }
      responseCallback(201, { message: "User created" });
      fileLogger.log(JSON.stringify(userToCreate), error => {
        console.log("Error logging", error);
      });
    });
  };
};

module.exports = makeCreateUser;
