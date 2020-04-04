const { inspect } = require('util');
const { hash } = require('../../lib/cryptoHash');

const makeUpdateUser = function({
  db,
  logger,
}) {
  return function({ payload }, responseCallback) {
    const {
      name,
      email,
      phone,
      address,
      password,
    } = payload; // TODO: validate users data

    db.read(email, function(err, data) {
      if(err) {
        logger.warning(err);
        responseCallback(404, { message: `User with email ${inspect(email)} not found.` });
        return;
      }

      const dataToSave =  {
        name: name || data.name,
        phone: phone || data.phone,
        address: address || data.address,
        password: (password && hash(password)) || data.password,
      };

      db.update(email, dataToSave, function(err) {
        if(err) {
          logger.warning(err);
          responseCallback(500, { message: `Unable to update data for ${inspect(email)}`});
          return;
        }

        responseCallback(200, dataToSave);
      });

    });
  }
}

module.exports = makeUpdateUser;
