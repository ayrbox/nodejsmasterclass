const { inspect } = require('util');

const makeDeleteUser = function({
  db,
  logger,
}) {
  return function({ query }, responseCallback) {
    const { email } = query;

    db.read(email, function(err) {
      if(err) {
        logger.warning(err);
        responseCallback(404, { message: `User with email ${inspect(email)} not found.` });
        return;
      }

      db.delete(email, function(err) {
        if(err) {
          logger.warning(err)
          responseCallback(500, { message: `Unable to delete data for email ${inspect(email)}.`});
          return;
        }
        responseCallback(200, { message: 'User deleted.'});
      });
    });
  }
}

module.exports = makeDeleteUser;
