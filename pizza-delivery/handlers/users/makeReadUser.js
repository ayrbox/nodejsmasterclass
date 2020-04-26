const { inspect } = require("util");

const makeReadUser = function ({ db, logger }) {
  return function ({ query, user }, responseCallback) {
    const { email } = query;

    if (user && user.email !== email) {
      responseCallback(403, { message: `Not authorised.` });
      return;
    }

    db.read(email, function (err, data) {
      if (err) {
        logger.warning(err.message);
        responseCallback(404, {
          message: `User with email ${inspect(email)} not found.`
        });
        return;
      }
      responseCallback(200, data);
    });
  };
};

module.exports = makeReadUser;
